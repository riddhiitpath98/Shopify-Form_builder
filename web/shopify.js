import {
  BillingInterval, LATEST_API_VERSION, BillingReplacementBehavior
} from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
// import { SQLiteSessionStorage } from "@shopify/shopify-app-session-storage-sqlite";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-07";
import { MongoDBSessionStorage } from '@shopify/shopify-app-session-storage-mongodb';
import dotenv from 'dotenv'
dotenv.config()
import { billingConfig } from "./billing.js";
// const DB_PATH = `${process.cwd()}/database.sqlite`;

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.


const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_API_SECRET,
    scopes: process.env.SCOPES,
    isEmbeddedApp: true,
    restResources,
    billing: billingConfig
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  // This should be replaced with your preferred storage strategy
  sessionStorage: new MongoDBSessionStorage('mongodb+srv://rajkumaritpath:ips12345@cluster0.bkscd84.mongodb.net',
    'shopify',),
});

export default shopify;
