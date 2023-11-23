// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import fs from "fs";
import https from "https";
import cors from "cors";
import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import dotenv from "dotenv";
import {
    billingConfig,
    cancelSubscription,
    createSubscription,
    createUsageRecord,
} from "./billing.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SK);

dotenv.config();

const PORT = 3007;
// const PORT = parseInt(
//   process.env.BACKEND_PORT || process.env.PORT || "3007",
//   10
// );

const STATIC_PATH = `${process.cwd()}/frontend/`

// const STATIC_PATH =
//   process.env.NODE_ENV === "production"
//     ? `${process.cwd()}/frontend/dist`
//     : `${process.cwd()}/frontend/`;

// const STATIC_PATH = `${process.cwd()}/frontend/dist`
// process.env.NODE_ENV === "production"
//   ? `${process.cwd()}/frontend/dist`
//   : `${process.cwd()}/frontend/`;

// console.log(STATIC_PATH, "STATIC_PATH");

const app = express();
app.use(cors());

// //for CORS
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");
    req.header("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// let httpServer;
// const privateKey = fs.readFileSync('certy/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('certy/cert.pem', 'utf8');
// const caBundle = fs.readFileSync('certy/fullchain.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate, ca: caBundle };
// httpServer = https.createServer(credentials, app);
// console.log('API Server created in HTTPS mode');

// httpServer.listen(PORT);
// httpServer.on('error', onError);
// httpServer.on('listening', onListening);
// httpServer.keepAliveTimeout = 180 * 1000;

// function onError(error) {
//   console.log('error', error)
//   if (error.syscall !== "listen") throw error;

//   const bind = typeof PORT === "string" ? "Pipe " + PORT : "PORT " + PORT;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case "EACCES":
//       console.error(bind + " requires elevated privileges");
//       process.exit(1);
//       break;
//     case "EADDRINUSE":
//       console.error(bind + " is already in use");
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// function onListening() {
//   let addr = httpServer.address();
//   const bind = typeof addr === "string" ? `pipe ${addr}` : `PORT ${addr.port}`;
//   console.log(`Listening on ${bind}`);
// }

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
    shopify.config.auth.callbackPath,
    shopify.auth.callback(),
    shopify.redirectToShopifyOrAppRoot()
);
app.post(
    shopify.config.webhooks.path,
    shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/shop", async (_req, res) => {
    const client = new shopify.api.clients.Rest({
        session: res.locals.shopify.session,
    });
    const response = await client.get({ path: "shop" });
    res.status(200).send(response?.body?.shop);
});

app.get("/api/products/count", async (_req, res) => {
    const countData = await shopify.api.rest.Product.count({
        session: res.locals.shopify.session,
    });
    res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
    let status = 200;
    let error = null;

    try {
        await productCreator(res.locals.shopify.session);
    } catch (e) {
        console.log(`Failed to process products/create: ${e.message}`);
        status = 500;
        error = e.message;
    }
    res.status(status).send({ success: status === 200, error });
});

app.get("/api/subscriptions", async (_req, res) => {

    const subscription = await shopify.api.billing.check({
        plans: "Premium Subscription",
        isTest: true,
        returnObject: true,
        session: res.locals.shopify.session,
    });
    res.status(200).json(subscription)
})

app.get("/api/recurring-application-charge/:id", async (req, res) => {
    try {
        const data = await shopify.api.rest.RecurringApplicationCharge.find({
            session: res.locals.shopify.session,
            id: req.params.id,
        });
        res.status(200).json({ recurringCharge: data })
    } catch (error) {
        res.status(500).json({ err: error })
    }
})

app.post("/api/createSubscription", async (_req, res) => {
    let status = 200;
    let error = null;
    try {
        const response = await createUsageRecord(res.locals.shopify.session, _req.body.premium_subscription);
        if (response) {
            res.status(201).send({ success: true, msg: "Subscription created", data: response?.data })
        }
        else {
            res.status(200).send({ success: false, msg: "You are already in premium plan" })
        }
    } catch (e) {
        console.log(`Failed to process : ${e.message}`);
        status = 500;
        error = e.message;
        res.status(status).send({
            success: false,
            error: error,
        });
    }
});

app.delete('/api/cancelSubscription', async (_req, res) => {
    let status = 200
    let error = null;
    try {
        const response = await cancelSubscription(res.locals.shopify.session, _req.body)
        if (response) {
            res.status(200).send({ success: true, msg: "Subscription cancelled", data: response?.data })
        }
    } catch (e) {
        console.log(`Failed to process : ${e.message}`);
        status = 500;
        error = e.message;
        res.status(status).send({
            success: false,
            error: error,
        });
    }
})

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
    try {
        return res
            .status(200)
            .set("Content-Type", "text/html")
            .send(readFileSync(join(STATIC_PATH, "index.html")));
    } catch (error) {
        console.log("error", error);
    }
});

app.listen(PORT);
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   req.header("Content-Type", "application/json");
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });
