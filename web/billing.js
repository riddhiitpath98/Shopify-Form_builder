import {
    BillingInterval, LATEST_API_VERSION, BillingReplacementBehavior, GraphqlQueryError
} from "@shopify/shopify-api";
import shopify from "./shopify.js";
export const billingConfig = {
    "Premium Subscription": {
        amount: 0.5,
        isTest: true,
        currencyCode: 'USD',
        interval: BillingInterval.Every30Days,
        trialDays: 1,
        replacementBehavior: BillingReplacementBehavior.ApplyImmediately,
    },
};
const variables = {
    "name": "Premium Subscription",
    "returnUrl": "https://admin.shopify.com/store/anavya-store/apps/contact-form-with-api",
    "test" : "true",
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
mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $test: Boolean!) {
    appSubscriptionCreate(name: $name, returnUrl: $returnUrl, lineItems: $lineItems, test: $test) {
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
    const planName = Object.keys(billingConfig)[0];

    try {
        const response = await shopify.api.billing.check({ session: session, plans:planName, isTest: true, returnObject: true })
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

export async function createUsageRecord(session, data) {
    const client = new shopify.api.clients.Graphql({ session });
    const subscription = await getAppSubscription(session);
    console.log('111', subscription);


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
        if (!subscription) {
            const res = await client.query({
                data: {
                    query: CREATE_SUBSCRIPTION,
                    variables: {
                        "name": data.name,
                        "returnUrl": data.return_url,
                        "trialDays": data.trialDays,
                        "test": data.isTest,
                        "lineItems": [
                            {
                                "plan": {
                                    "appRecurringPricingDetails": {
                                        "price": {
                                            "amount": data.amount,
                                            "currencyCode": data.currencyCode
                                        },
                                        "interval": data.interval,

                                    }
                                }
                            }
                        ]
                    }
                    ,
                },
            });
            return res?.body;
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


export const createSubscription = async (session, plan) => {
    console.log('plan: ', plan);
    if (!session) {
        return null
    }
    else {
        const application_charge = new shopify.api.rest.RecurringApplicationCharge({ session });
        application_charge.name = plan.name;
        application_charge.price = plan.amount;
        application_charge.return_url = plan.return_url
        application_charge.test = plan.isTest;
        application_charge.trial_days = plan.trialDays
        application_charge.currency = plan.currencyCode
        await application_charge.save({
            update: true,
        });
        return application_charge;
    }
}