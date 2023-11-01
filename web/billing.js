import {
    BillingInterval, LATEST_API_VERSION, BillingReplacementBehavior, GraphqlQueryError
} from "@shopify/shopify-api";
import shopify from "./shopify.js";
export const billingConfig = {
    "Premium Subscription": {
        amount: 5.99,
        currencyCode: "USD",
        interval: BillingInterval.Every30Days,
        trialDays: 3,
        replacementBehavior: BillingReplacementBehavior.ApplyImmediately,
    },
};
const variables = {
    "name": "Premium Subscription",
    "returnUrl": "https://admin.shopify.com/store/it-path-dev-store/apps/contact-form-with-api-1",
    "lineItems": [
        {
            "plan": {
                "appRecurringPricingDetails": {
                    "price": {
                        "amount": "5.99",
                        "currencyCode": "USD"
                    },
                    "interval": "EVERY_30_DAYS",
                    "trialDays": 3
                }
            }
        }
    ]
}

const CREATE_SUBSCRIPTION = `
mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!) {
    appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems) {
      userErrors {
        field
        message
      }
      appSubscription {
        id
      }
      confirmationUrl
    }
  }`;

const HAS_PAYMENTS_QUERY = `query appSubscription {
    currentAppInstallation {
      activeSubscriptions {
            id 
            name
            lineItems {
                  id
                  plan {
                    pricingDetails {
                      __typename
                      ... on AppUsagePricing {
                        terms
                        balanceUsed {
                          amount
                        }
                        cappedAmount {
                          amount
                        }
                      }
                    }
                  }
                }
            }
          }
      }`;


async function getAppSubscription(session) {
    const client = new shopify.api.clients.Graphql({ session });
    const planName = Object.keys(billingConfig)[0];
    const planDescription = billingConfig[planName].usageTerms;

    try {
        const response = await shopify.api.billing.check({ session: session, plans: 'Premium Subscription', isTest: true, returnObject: true })
        if (response.hasActivePayment) {
            response.appSubscriptions.forEach(
                async (subscription) => {
                    if (subscription.name === planName) {
                        const response = await shopify.api.billing.subscriptions({
                            session
                        })

                        const subscriptionData = response.activeSubscriptions?.find(val => val?.id === subscription?.id)
                        return subscriptionData
                    }
                }
            );
        }
    } catch (error) {
        if (error instanceof GraphqlQueryError) {
            throw new Error(
                `${error.message} \n${JSON.stringify(error.response, null, 2)} `
            );
        } else {
            throw error;
        }
    }
}

export async function createUsageRecord(session) {
    const client = new shopify.api.clients.Graphql({ session });
    console.log('subscriptionLineItem', await getAppSubscription(session))
    const plan = Object.keys(billingConfig)[0];


    // If the capacity has already been reached, we will not attempt to create the usage record
    // On production shops, if you attempt to create a usage record and the capacity and been
    // reached Shopify will return an error. On development shops, the usage record will be created
    // if (
    //     subscriptionLineItem.balanceUsed + USAGE_CHARGE_INCREMENT_AMOUNT >
    //     subscriptionLineItem.cappedAmount
    // ) {
    //     res.capacityReached = true;
    //     return res;
    // }

    try {
        // This makes an API call to Shopify to create a usage record
        const res = await client.query({
            data: {
                query: CREATE_SUBSCRIPTION,
                variables: {
                    "name": "Premium subscription",
                    "returnUrl": "https://admin.shopify.com/store/it-path-dev-store/apps/contact-form-with-api-1/dashboard",
                    "lineItems": [
                        {
                            "plan": {
                                "appRecurringPricingDetails": {
                                    "price": {
                                        "amount": 5.99,
                                        "currencyCode": "USD"
                                    },
                                    "interval": "EVERY_30_DAYS",
                                }
                            }
                        }
                    ]
                },
            },
        });
        return res?.body;
    } catch (error) {
        if (error instanceof GraphqlQueryError) {
            throw new Error(
                `${error.message} \n${JSON.stringify(error.response, null, 2)} `
            );
        } else {
            throw error;
        }
    }

}