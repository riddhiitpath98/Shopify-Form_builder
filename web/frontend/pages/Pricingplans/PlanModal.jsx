import React, { useEffect, useState } from "react";
import { Button, Modal, LegacyCard, Badge, Icon } from "@shopify/polaris";
import styles from "./PricingPlan.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Icons,
  PLAN_DETAILS,
  PLAN_TEXT,
  SUBSCRIPTION_TYPES,
  handleRecurringChargeVal,
} from "../../constant";
import { useNavigate } from "react-router-dom";
import { addShopData } from "../../redux/actions/allActions";
import { useAppBridge } from "@shopify/app-bridge-react";
import { addShopId } from "../../redux/reducers/appIdSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../StripeCardPayment";
import axios from "axios";
import { Redirect } from "@shopify/app-bridge/actions";
const stripePromise = loadStripe("pk_live_IGCZ91wblgKajj7dxA8xci0E");

// const stripePromise = loadStripe("pk_test_51Ns1GtSEo6lSgy9nBDPpMCyJkpcuDTYpDo3VV3HZ7kgxWS2URSwUqWL7ShhgXQwWZLCUXHYfPSr5grIM9SCaus5r00DHhniALW");

export default function PlanModal({
  active,
  toggleModal,
  shopData,
  showCardElement,
  setShowCardElement,
}) {
  const app = useAppBridge();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [priceId, setPriceId] = useState();
  const subscriptionData = useSelector(
    (state) => state.subscription?.subscriptionData?.data
  );
  const appName = useSelector((state) => state?.shopId?.appName);
  const user = useSelector((state) => state?.user?.userData?.user);
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

  const handleCreateSubscription = async (plan) => {
    if (plan === SUBSCRIPTION_TYPES.FREE) {
      const {
        id,
        name,
        email,
        domain,
        city,
        country,
        country_code,
        customer_email,
        shop_owner,
        myshopify_domain,
        phone,
      } = shopData;
      let user = {
        shopId: id,
        shopName: name,
        email,
        domain: myshopify_domain,
        city,
        country,
        countryCode: country_code,
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
      dispatch(addShopData(user)).then((data) => {
        if (data?.payload) {
          dispatch(addShopId(id));
          toggleModal();
          navigate("/dashboard", { replace: true });
        }
      });
    } else if (plan === SUBSCRIPTION_TYPES.PREMIUM) {
      const {
        id,
        name,
        email,
        domain,
        city,
        country,
        country_code,
        customer_email,
        shop_owner,
        myshopify_domain,
        phone,
      } = shopData;

      let user = {
        shopId: id,
        shopName: name,
        email,
        domain: myshopify_domain,
        city,
        country,
        countryCode: country_code,
        customer_email,
        shop_owner,
        myshopify_domain,
        phone,
        subscriptionId: subscriptionData[0].id,
        subscriptionName: subscriptionData[0].subscriptionName,
      };

      subscriptionData.filter(({ subscriptionName, _id }, index) => {
        if (subscriptionName === plan) {
          user = { ...user, subscriptionName, subscriptionId: _id };
        }
      });
      let recurring = handleRecurringChargeVal(appName, shopData);
      const sessionData = {
        priceId: PLAN_DETAILS?.PREMIUM_USD,
        plan,
        successUrl: recurring?.premium_subscription?.return_url,
        user,
      };
      await axios
        .post("/payment/create-session-checkout", sessionData)
        .then((res) => {
          const redirect = Redirect.create(app);
          redirect.dispatch(Redirect.Action.REMOTE, res?.data?.redirectUrl);
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
    <div className="modalContainer" style={{ height: "500px" }}>
      <Modal
        open={active}
        onClose={() => setShowCardElement(false)}
        title={!showCardElement ? "Pricing Plans" : "Make Payment"}
        large
      >
        {showCardElement ? (
          <Elements stripe={stripePromise}>
            <CheckoutForm
              priceId={priceId}
              toggleModal={toggleModal}
              setShowCardElement={setShowCardElement}
            />
          </Elements>
        ) : (
          <div className="pricing-component-wrapper">
            <LegacyCard>
              <LegacyCard.Section>
                <div className="grid">
                  <div className={styles.gridItem}>
                    <div className={styles.boxHeading}>
                      <h4
                        className={`${styles.boxHeadingText} ${
                          (!Object?.keys(user).length &&
                            user?.subscriptionName !==
                              SUBSCRIPTION_TYPES.PREMIUM) ||
                          user === undefined
                            ? styles.freeHeader
                            : styles.premiumHeader
                        }`}
                      >
                        {PLAN_TEXT.CURRENT_PLAN}
                      </h4>
                    </div>
                    <table className={styles.pricingTable} border={1}>
                      <thead>
                        <tr>
                          <th scope="col"></th>
                          {subscriptionData?.map((item) => (
                            <th scope="col">
                              <p>{item?.subscriptionName.toUpperCase()}</p>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <th scope="row" className={styles.rowTransparent}>
                          <div className={styles.rowTitle}>
                            <span>Price</span>
                          </div>
                        </th>
                        {subscriptionData?.map((item) => (
                          <td className={styles.pricingRow}>
                            {/* <div className={styles.trialDays}>3 days trial</div> */}
                            <div className={styles.monthlyPrice}>
                              <span className={styles.monthlyPriceCur}>
                                {item.curruncyType}
                              </span>
                              <span className={styles.priceValue}>
                                <span className={styles.price}>
                                  <span>
                                    {/* <sub className={styles.dollar}>$</sub> */}
                                    <span className={styles.rupees}>
                                      {item.price}
                                    </span>
                                  </span>
                                </span>
                              </span>
                              <span className={styles.month}>
                                /<span>mo</span>
                              </span>
                            </div>
                            <div
                              className="d-grid gap-2"
                              // style={{ height: "36px" }}
                            >
                              <BootstrapButton
                                variant="primary"
                                style={{ height: "36px" }}
                                // primary
                                // fullWidth
                                onClick={() =>
                                  handleCreateSubscription(
                                    item?.subscriptionName,
                                    item?.stripePriceId
                                  )
                                }
                              >
                                <span>
                                  <span>
                                    {item.subscriptionName ===
                                    SUBSCRIPTION_TYPES.FREE ? (
                                      <span> {PLAN_TEXT?.START_FREE_PLAN}</span>
                                    ) : (
                                      <span
                                        style={{
                                          fontFamily:
                                            "-apple-system, BlinkMacSystemFont, 'San Francisco', 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
                                          fontSize: "0.935rem",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {" "}
                                        {PLAN_TEXT?.UPGRADE_PLAN}
                                      </span>
                                    )}
                                  </span>
                                </span>
                              </BootstrapButton>
                            </div>
                          </td>
                        ))}

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
                                        subscriptionData[0].features[
                                          featureKey
                                        ][innerKey]
                                      )}
                                    </td>
                                    <td>
                                      {renderStatusIcon(
                                        subscriptionData[1].features[
                                          featureKey
                                        ][innerKey]
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
        )}
      </Modal>
    </div>
  );
}
