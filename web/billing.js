import {
    BillingInterval, LATEST_API_VERSION, BillingReplacementBehavior, GraphqlQueryError
} from "@shopify/shopify-api";
export const billingConfig = {
    "Premium Subscription": {
        amount: 0.50,
        isTest: true,
        currencyCode: 'USD',
        interval: BillingInterval.Every30Days,
        trialDays: 1,
        replacementBehavior: BillingReplacementBehavior.ApplyImmediately,
    },
};

