import { Badge, Icon, LegacyCard, Page } from "@shopify/polaris";
// import { pricingPlanData } from "../../constant";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Fullscreen, Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import { useDispatch, useSelector } from "react-redux";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { Button } from "react-bootstrap";
import {
  addShopData,
  cancelSubscription,
  getUserByShopId,
} from "../../redux/actions/allActions";
import {
  Icons,
  PLAN_DETAILS,
  PLAN_TEXT,
  SUBSCRIPTION_TYPES,
  handleRecurringChargeVal,
} from "../../constant";
import axios from "axios";
import { addShopId, getAppName } from "../../redux/reducers/appIdSlice";
import { useAppQuery } from "../../hooks";
import CommonModal from "../../components/CommonModal";
import { ToastContainer } from "react-toastify";
import PaymentModal from "./paymentModal";
import {
  capitalizeFirstLetter,
  capitalizeFirstLetterAndAPI,
} from "../../utils/function";
import ipsBanner from "../../assets/ips_banner_2.jpg";
import ratingBanner from "../../assets/ips_banner_1.png";
import helpBanner from "../../assets/ips_banner_3.jpg";
import "./PricingPlan.module.css";
import "../Forms/PolarisFormListStyles.css";
import styles from "./PricingPlan.module.css";

function Pricingplans() {
  const app = useAppBridge();
  const dispatch = useDispatch();
  const fullscreen = Fullscreen.create(app);
  const shopData = useAppQuery({ url: "/api/shop" });

  const [active, setActive] = useState(false);
  const [recurringCharge, setRecurringCharge] = useState({});
  const [isCancelPlan, setIsCancelPlan] = useState(false);
  const appearance = {
    theme: "stripe",
  };

  const subscriptionData = useSelector(
    (state) => state.subscription?.subscriptionData?.data
  );

  const shopId = useSelector((state) => state?.shopId?.shopId);
  const user = useSelector((state) => state?.user?.userData?.user);
  const navigate = useNavigate();
  const [priceId, setPriceId] = useState();
  const [showCardElement, setShowCardElement] = useState(false);
  const handleOpen = (data) => {
    setActive(true);
    setIsCancelPlan(true);
  };
  const appName = useSelector((state) => state?.shopId?.appName);

  const handleClose = useCallback(() => {
    setActive(false);
  }, []);

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
      } = shopData.data;

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
      let recurring = handleRecurringChargeVal(appName, shopData.data);
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

  useEffect(() => {
    fullscreen.dispatch(Fullscreen.Action.EXIT);
  }, [dispatch]);

  const handleCancelSubscription = async () => {
    dispatch(
      cancelSubscription({
        id: user?.subscription?.stripeSubscriptionId,
        shopId,
      })
    ).then((data) => dispatch(getUserByShopId(shopId)));
    setActive(false);
    setIsCancelPlan(false);
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

  const toggleModal = () => {
    setShowCardElement(false);
  };

  return (
    <Page fullWidth title="Pricing Plans">
      {showCardElement ? (
        <PaymentModal
          active={showCardElement}
          priceId={priceId}
          toggleModal={toggleModal}
          setShowCardElement={setShowCardElement}
        />
      ) : null}
      <div style={{ display: "flex" }}>
        <div className={styles.planPageLeft}>
          <LegacyCard>
            <LegacyCard.Section>
              <div className="grid">
                <div className={styles.planGridItem}>
                  <div className={styles.planBoxHeading}>
                    <h4
                      className={`${styles.planBoxHeadingText} ${
                        user?.subscriptionName === SUBSCRIPTION_TYPES.FREE
                          ? styles.freePlanHeader
                          : styles.premiumPlanHeader
                      }`}
                    >
                      Your current plan
                    </h4>
                  </div>
                  <table className={styles.planPicingTable} border={1}>
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        {subscriptionData?.map((item) => (
                          <th scope="col">
                            <p style={{ marginTop: "10px" }}>
                              {item?.subscriptionName.toUpperCase()}
                            </p>
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
                          {item?.subscriptionName ===
                            SUBSCRIPTION_TYPES.FREE && (
                            <div
                              className="d-grid "
                              style={{ visibility: "hidden" }}
                            >
                              <Button
                                variant="secondary"
                                className={`${
                                  user?.subscriptionName !==
                                  SUBSCRIPTION_TYPES.FREE
                                    ? styles.planButtonSuccess
                                    : ""
                                }`}
                                disabled={
                                  user?.subscriptionName ===
                                    SUBSCRIPTION_TYPES.FREE ||
                                  (user &&
                                    user?.subscriptionName ===
                                      SUBSCRIPTION_TYPES.PREMIUM) ||
                                  user?.subscription?.cancel_at_period_end
                                }
                                onClick={handleOpen}
                              >
                                <span>
                                  <span>
                                    <span
                                      className={styles.planButtonFontStyle}
                                    >
                                      {user?.subscriptionName ===
                                      SUBSCRIPTION_TYPES.FREE
                                        ? PLAN_TEXT.ACTIVE_PLAN
                                        : PLAN_TEXT.CHOOSE_PLAN}
                                    </span>
                                  </span>
                                </span>
                              </Button>
                            </div>
                          )}

                          {item?.subscriptionName ===
                            SUBSCRIPTION_TYPES.PREMIUM && (
                            <>
                              {user?.subscriptionName !==
                              SUBSCRIPTION_TYPES.PREMIUM ? (
                                <div className="d-grid gap-2">
                                  <Button
                                    variant="primary"
                                    onClick={() =>
                                      handleCreateSubscription(
                                        item?.subscriptionName,
                                        item?.stripePriceId
                                      )
                                    }
                                    disabled={
                                      user?.subscriptionName ===
                                      SUBSCRIPTION_TYPES.PREMIUM
                                    }
                                    loading={!user}
                                  >
                                    <span>
                                      <span>
                                        <span
                                          className={styles.planButtonFontStyle}
                                        >
                                          {user?.subscriptionName ===
                                          SUBSCRIPTION_TYPES.PREMIUM
                                            ? PLAN_TEXT.CURRENT_PLAN
                                            : PLAN_TEXT.UPGRADE_PLAN}
                                        </span>
                                      </span>
                                    </span>
                                  </Button>
                                </div>
                              ) : (
                                //   <Button
                                //   disabled={
                                //     user?.subscriptionName === SUBSCRIPTION_TYPES.PREMIUM
                                //   }
                                //   loading={!user}
                                //   primary
                                //   fullWidth
                                //   onClick={() =>
                                //     handleCreateSubscription(item?.subscriptionName, item?.stripePriceId)
                                //   }
                                // >
                                //   <span>
                                //     <span>
                                //       <span>
                                //         {user?.subscriptionName ===
                                //           SUBSCRIPTION_TYPES.PREMIUM
                                //           ? PLAN_TEXT.CURRENT_PLAN
                                //           : PLAN_TEXT.UPGRADE_PLAN}
                                //       </span>
                                //     </span>
                                //   </span>
                                // </Button>
                                <div className="d-grid gap-2">
                                  <Button
                                    variant="danger"
                                    onClick={handleOpen}
                                    disabled={
                                      user?.subscription?.cancel_at_period_end
                                    }
                                  >
                                    <span>
                                      <span>
                                        <span
                                          className={styles.planButtonFontStyle}
                                        >
                                          {PLAN_TEXT.CANCEL_PLAN}
                                        </span>
                                      </span>
                                    </span>
                                  </Button>
                                </div>
                              )}
                            </>
                          )}
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
                      {subscriptionData?.length > 0 &&
                        Object.keys(subscriptionData[0]?.features).map(
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
                                      subscriptionData[0].features[featureKey][
                                        index
                                      ].value
                                    )}
                                  </td>
                                  <td>
                                    {renderStatusIcon(
                                      subscriptionData[1].features[featureKey][
                                        index
                                      ].value
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
              {/* </div> */}
            </LegacyCard.Section>
          </LegacyCard>
          {active && (
            <CommonModal
              {...{
                active,
                isCancelPlan,
                handleClose,
                handleCancelSubscription,
              }}
              title="Are you sure to cancel the current plan?"
              description="<p><strong>Note: </strong> Canceling this subscription plan will result in the following:</p>
            <ul>
              <li>Upon cancellation, you'll retain access to premium features until the end of the current billing cycle.</li>
              <li>You won't be charged for the following month, and after the current period, your subscription will automatically switch to the Free plan.</li>
              <li>While premium features will no longer be available and you can not access forms created under the premium plan.</li>
            </ul>
            <p>Please review our <a href='https://www.contactformtoapi.com/terms-of-service/' target='_blank' >terms and conditions</a> for detailed information.</p>
            <p>If you have any questions, our <a href='https://www.contactformtoapi.com/' target='_blank'>customer support</a> is ready to assist.</p>
            <p>Thank you for being a valued subscriber!</p>"
            />
          )}
        </div>
        <div className={styles.planPageRight}>
          <a href="https://www.itpathsolutions.com/contact-us/" target="_blank">
            <img src={ipsBanner} alt="" />
          </a>
          <a
            href="https://apps.shopify.com/contact-form-to-any-api"
            target="_blank"
          >
            <img
              src={ratingBanner}
              alt=""
              style={{ width: "100%", marginTop: "7px" }}
            />
          </a>
          <a href="https://www.itpathsolutions.com/contact-us/" target="_blank">
            <img
              src={helpBanner}
              alt=""
              style={{ width: "100%", marginTop: "7px" }}
            />
          </a>
        </div>
      </div>
      <ToastContainer />
    </Page>
  );
}

export default Pricingplans;