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
} from "./billing.js";
import Stripe from "stripe";

dotenv.config();

const PORT = 3007;
const STATIC_PATH = `${process.cwd()}/frontend/`;

const app = express();
app.use(cors());

// //for CORS
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    req.header("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

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
        returnObject: true,
        session: res.locals.shopify.session,
    });
    res.status(200).json(subscription);
});

app.get("/api/recurring-application-charge/:id", async (req, res) => {
    try {
        const data = await shopify.api.rest.RecurringApplicationCharge.find({
            session: res.locals.shopify.session,
            id: req.params.id,
        });
        res.status(200).json({ recurringCharge: data });
    } catch (error) {
        res.status(500).json({ err: error });
    }
});


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
