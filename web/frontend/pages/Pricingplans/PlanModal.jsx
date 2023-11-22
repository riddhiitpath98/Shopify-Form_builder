import React, { useEffect, useState } from "react";
import { Button, Modal, LegacyCard, Badge, Icon } from "@shopify/polaris";
import styles from "./PricingPlan.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Icons, PLAN_TEXT, SUBSCRIPTION_TYPES } from "../../constant";
import { useNavigate } from "react-router-dom";
import {
  addShopData,
  createApplicationCharge,
} from "../../redux/actions/allActions";
import axios from "axios";
import { useAppQuery } from "../../hooks";
import dotenv from "dotenv";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { Redirect } from "@shopify/app-bridge/actions";
import { addShopId } from "../../redux/reducers/appIdSlice";

// import { loadStripe } from "@stripe/stripe-js";

export default function PlanModal({
  active,
  toggleModal,
  isSuccess,
  shopData,
}) {
  const app = useAppBridge();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const storeName = shopData?.domain?.split(".")[0];

  const subscriptionData = useSelector(
    (state) => state.subscription?.subscriptionData?.data
  );

  const recurringCharge = useSelector(
    (state) => state.recurringCharge.recurringCharges.data
  );

  const appName = useSelector((state) => state?.shopId?.appName);

  const renderStatusIcon = (status) => {
    if (status === true) {
      return (
        <span className={styles.priceValue}>
          <Icon source={Icons.tick} color="primary" />
        </span>
      );
    } else if (status === false || status === null) {
      return (
        <span className={styles.priceValue}>
          <Icon source={Icons.divider} color="base" />
        </span>
      );
    } else {
      return status;
    }
  };
  
  const RECURRING_APPLICATION_CHARGE = {
    premium_subscription: {
      name: "Premium Subscription",
      amount: 6.99,
      isTest: true,
      currencyCode: "USD",
      interval: "EVERY_30_DAYS",
      trialDays: 1,
      replacementBehavior: "APPLY_IMMEDIATELY",
      return_url: `https://admin.shopify.com/store/${storeName}/apps/${appName
        ?.split(" ")
        .join("-")
        .toLowerCase()}/dashboard`,
    },
  };
  const fetchSubscriptions = async (token) => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}` || "",
        },
      };
      const response = await fetch(
        `/api/recurring-application-charge/32137937188`,
        options
      );
      const data = await response.json();
    } catch (error) {
      console.log("error", error);
    }
  };


  const handleUserNavigation = async (plan) => {
    if (plan === SUBSCRIPTION_TYPES.FREE) {
      const {
        id,
        name,
        email,
        domain,
        city,
        country,
        customer_email,
        shop_owner,
        myshopify_domain,
        phone,
      } = shopData.data;
      let user = {
        id,
        name,
        email,
        domain,
        city,
        country,
        customer_email,
        shop_owner,
        myshopify_domain,
        phone,
      };
      subscriptionData.filter(({ subscriptionName, _id }, index) => {
        if (subscriptionName === plan) {
          user = { ...user, subscriptionName, subscriptionId: _id };
        }
      });
      dispatch(addShopData(user));
      dispatch(addShopId(id));
      toggleModal();
      navigate("/dashboard", { replace: true });
    } else if (plan === SUBSCRIPTION_TYPES.PREMIUM) {
      getSessionToken(app).then((token) => {
        if (token) {
          try {
            const options = {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}` || "",
                "Content-Type": "application/json", // Set the content type to JSON
              },
              body: JSON.stringify(RECURRING_APPLICATION_CHARGE),
            };
            fetch(`/api/createSubscription`, options)
              .then((res) => res.json())
              .then((res) => {
                if (res.success) {
                  const pathSegments =
                    res?.data?.appSubscriptionCreate?.appSubscription?.id.split(
                      "/"
                    );
                  // The last segment contains the ID
                  const chargeId = pathSegments[pathSegments.length - 1];
                  dispatch(
                    createApplicationCharge({
                      chargeId,
                      shopId: shopData?.id,
                    })
                  );
                  const redirect = Redirect.create(app);
                  redirect.dispatch(
                    Redirect.Action.REMOTE,
                    res.data?.appSubscriptionCreate?.confirmationUrl
                  );
                }
              })
              .catch((err) => console.log("err", err));
          } catch (error) {
            console.log("error", error);
          }
        }
      });
    }
  };
  const removeUnderScoreNdSetFirstLetterCapital = (key) => {
    let string = "";
    string = key.replace(/_/g, " ");
    string = string[0].toUpperCase() + string.substring(1);
    return string;
  };


  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={active}
        // onClose={toggleModal}
        title="Pricing plans"
        large
      >
        <div className="pricing-component-wrapper">
          <LegacyCard>
            <LegacyCard.Section>
              <div className="grid">
                <div className={styles.gridItem}>
                  <table className={styles.pricingTable} border={1}>
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">
                          <p>FREE</p>
                        </th>
                        <th scope="col">
                          <p>PREMIUM</p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <th scope="row" className={styles.rowTransparent}>
                        <div className={styles.rowTitle}>
                          <span>Price</span>
                        </div>
                      </th>
                      <td className={styles.pricingRow}>
                        <div className={styles.badge}>
                          <Badge status="success">
                            <span>
                              <span>-33% lifetime off</span>
                            </span>
                          </Badge>
                        </div>
                        <div className={styles.monthlyPrice}>
                          <span className={styles.monthlyPriceCur}>USD</span>
                          <span className={styles.priceValue}>
                            <span className={styles.price}>
                              <span>
                                <sub className={styles.dollar}>$</sub>
                                <span className={styles.rupees}>0</span>
                              </span>
                            </span>
                          </span>
                          <span className={styles.month}>
                            /<span>mo</span>
                          </span>
                        </div>

                        <Button
                          primary
                          fullWidth
                          onClick={() =>
                            handleUserNavigation(SUBSCRIPTION_TYPES.FREE)
                          }
                        >
                          <span>
                            <span>
                              <span>{PLAN_TEXT.CHOOSE_PLAN}</span>
                            </span>
                          </span>
                        </Button>
                        <div className={styles.badge}>
                          <span>0 days trial</span>
                        </div>
                      </td>
                      <td>
                        {/* <div className={styles.pmuBadge}>
                        <Badge status="success">
                          <span>
                            <span>-33% lifetime off</span>
                          </span>
                        </Badge>
                      </div> */}
                        <div className={styles.monthlyPrice}>
                          <span className={styles.monthlyPriceCur}>USD</span>
                          <span className={styles.priceValue}>
                            <span className={styles.price}>
                              <span>
                                <sub className={styles.dollar}>$</sub>
                                <span className={styles.rupees}>6.99</span>
                              </span>
                            </span>
                          </span>
                          <span className={styles.month}>
                            /<span>mo</span>
                          </span>
                        </div>
                        <Button
                          primary
                          fullWidth
                          onClick={() =>
                            handleUserNavigation(SUBSCRIPTION_TYPES.PREMIUM)
                          }
                        >
                          <span>
                            <span>
                              <span>{PLAN_TEXT.CHOOSE_PLAN}</span>
                            </span>
                          </span>
                        </Button>
                        {/* 
                      <Button onClick={handleClick} primary fullWidth>
                        <span>
                          <span>
                            <span>Start free trial</span>
                          </span>
                        </span>
                      </Button>
                      <div className={styles.pmuBadge}>
                        <span>7 days trial</span>
                      </div> */}
                      </td>

                      {subscriptionData.length > 0 &&
                        Object.keys(subscriptionData[0]?.features).map(
                          (featureKey) => (
                            <React.Fragment key={featureKey}>
                              <tr>
                                <th colSpan={3}>
                                  <span className={styles.tableHeader}>
                                    <span>
                                      {removeUnderScoreNdSetFirstLetterCapital(
                                        featureKey
                                      )}
                                    </span>
                                  </span>
                                </th>
                              </tr>

                              {Object.entries(
                                subscriptionData[0].features[featureKey]
                              ).map(([innerKey, innerValue]) => (
                                <tr key={innerKey}>
                                  <th scope="row" className={styles.rowData}>
                                    <div className={styles.rowTitle}>
                                      <dl className={styles.labelName}>
                                        <dt className={styles.labelText}>
                                          <span>
                                            {removeUnderScoreNdSetFirstLetterCapital(
                                              innerKey
                                            )}
                                          </span>
                                        </dt>
                                        <dd
                                          className={styles.labelDescription}
                                        ></dd>
                                      </dl>
                                    </div>
                                  </th>
                                  <td>
                                    {renderStatusIcon(
                                      subscriptionData[0].features[featureKey][
                                      innerKey
                                      ]
                                    )}
                                  </td>
                                  <td>
                                    {renderStatusIcon(
                                      subscriptionData[1].features[featureKey][
                                      innerKey
                                      ]
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </React.Fragment>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </LegacyCard.Section>
          </LegacyCard>
        </div>
      </Modal>
    </div>
  );
}
