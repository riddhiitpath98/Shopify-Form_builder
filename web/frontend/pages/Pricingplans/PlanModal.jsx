import React, { useEffect, useState } from "react";
import { Modal, LegacyCard, Badge, Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import {
  Icons,
  PLAN_DETAILS,
  PLAN_TEXT,
  SUBSCRIPTION_TYPES,
  handleRecurringChargeVal,
} from "../../constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addShopData } from "../../redux/actions/allActions";
import { useAppBridge } from "@shopify/app-bridge-react";
import { addShopId } from "../../redux/reducers/appIdSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../StripeCardPayment";
import { Redirect } from "@shopify/app-bridge/actions";
import { Button } from "react-bootstrap";
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterAndAPI
} from "../../utils/function";
import styles from "./PricingPlan.module.css";
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

  const renderStatusIcon = (status) => {
    if (status === true) {
      return (
        <span className={styles.planPriceValue}>
          <Icon source={Icons.tick} color="primary" />
        </span>
      );
    } else if (status === false || status === null) {
      return (
        <span className={styles.planPriceValue}>
          <Icon source={Icons.cancel} color="critical" />
        </span>
      );
    } else {
      return status;
    }
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
                  <div className={styles.planGridItem}>
                    <div className={styles.planBoxHeading}>
                      {/* <h4
                        className={`${styles.planBoxHeadingText} ${
                          user === undefined ||
                          (!Object?.keys(user).length > 0 &&
                            user?.subscriptionName !==
                              SUBSCRIPTION_TYPES.PREMIUM)
                            ? styles.freePlanHeader
                            : styles.premiumPlanHeader
                        }`}
                      >
                        {PLAN_TEXT.CURRENT_PLAN}
                      </h4> */}
                    </div>
                    <table className={styles.planPicingTable} border={1}>
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
                          <div className={styles.planRowTitle}>
                            <span className={styles.planPriceTitle}>Price</span>
                          </div>
                        </th>
                        {subscriptionData?.map((item) => (
                          <td className={styles.planPricingRow}>
                            {/* <div className={styles.planTrialDays}>3 days trial</div> */}
                            <div className={styles.planMonthlyPrice}>
                              <span className={styles.planMonthlyPriceCur}>
                                {item.curruncyType}
                              </span>
                              <span className={styles.planPriceValue}>
                                <span className={styles.planPrice}>
                                  <span>
                                    {/* <sub className={styles.dollar}>$</sub> */}
                                    <span className={styles.planRupees}>
                                      {item.price}
                                    </span>
                                  </span>
                                </span>
                              </span>
                              <span className={styles.planMonth}>
                                /<span>mo</span>
                              </span>
                            </div>
                            <div className="d-grid gap-2">
                              <Button
                                variant="primary"
                                className={`${
                                  item.subscriptionName ===
                                  SUBSCRIPTION_TYPES.FREE
                                    ? styles.planButtonSuccess
                                    : ""
                                }`}
                                onClick={() =>
                                  handleCreateSubscription(
                                    item?.subscriptionName,
                                    item?.stripePriceId
                                  )
                                }
                              >
                                {item.subscriptionName ===
                                SUBSCRIPTION_TYPES.FREE ? (
                                  <span className={styles.planButtonFontStyle}>
                                    {" "}
                                    {PLAN_TEXT?.START_FREE_PLAN}
                                  </span>
                                ) : (
                                  <span className={styles.planButtonFontStyle}>
                                    {" "}
                                    {PLAN_TEXT?.UPGRADE_PLAN}
                                  </span>
                                )}
                              </Button>
                            </div>
                          </td>
                        ))}
                        <tr>
                          <th colSpan={3} className={styles.planFeatureTitle}>
                            <span className={styles.planTableHeader}>
                              <span className={styles.planFeatureHeader}>
                                Features
                              </span>
                            </span>
                          </th>
                        </tr>
                        {subscriptionData.length > 0 &&
                          Object?.keys(subscriptionData[0]?.features).map(
                            (featureKey) => (
                              <React.Fragment key={featureKey}>
                                <tr>
                                  <th colSpan={3}>
                                    <span className={styles.planTableHeader}>
                                      <span>
                                        {capitalizeFirstLetter(featureKey)}
                                      </span>
                                    </span>
                                  </th>
                                </tr>

                                {Object.entries(
                                  subscriptionData[0]?.features[featureKey]
                                ).map(([index, feature]) => (
                                  <tr key={index}>
                                    <th
                                      scope="row"
                                      className={styles.planRowData}
                                    >
                                      <div className={styles.planRowTitle}>
                                        <dl className={styles.planLabelName}>
                                          <dt className={styles.planLabelText}>
                                            <span>
                                              {capitalizeFirstLetter(
                                                feature?.label
                                              )}
                                            </span>
                                          </dt>
                                          <dd
                                            className={
                                              styles.planLabelDescription
                                            }
                                          >
                                            {capitalizeFirstLetterAndAPI(
                                              feature?.description
                                            )}
                                          </dd>
                                        </dl>
                                      </div>
                                    </th>
                                    <td>
                                      {renderStatusIcon(
                                        subscriptionData[0].features[
                                          featureKey
                                        ][index].value
                                      )}
                                    </td>
                                    <td>
                                      {renderStatusIcon(
                                        subscriptionData[1].features[
                                          featureKey
                                        ][index].value
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
