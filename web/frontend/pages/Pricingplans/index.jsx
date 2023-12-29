import { Badge, Icon, LegacyCard, Page } from "@shopify/polaris";
// import { pricingPlanData } from "../../constant";
import "./PricingPlan.module.css";
import { TickMinor } from "@shopify/polaris-icons";
import { CancelMinor } from "@shopify/polaris-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Fullscreen, Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PricingPlan.module.css";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { Button } from "react-bootstrap";

import {
  addShopData,
  cancelSubscription,
  createApplicationCharge,
  getUserByShopId,
} from "../../redux/actions/allActions";
import {
  PLAN_DETAILS,
  PLAN_TEXT,
  SUBSCRIPTION_TYPES,
  handleRecurringChargeVal,
} from "../../constant";
import { addShopId, getAppName } from "../../redux/reducers/appIdSlice";
import { useAppQuery } from "../../hooks";
import CommonModal from "../../components/CommonModal";
import { ToastContainer } from "react-toastify";
import { addClientSecret } from "../../redux/reducers/userSlice";
import PaymentModal from "./paymentModal";
import axios from "axios";
import ipsBanner from "../../assets/ips_banner_2.jpg"
import ratingBanner from "../../assets/ips_banner_1.png"

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
        <span className={styles.priceValue}>
          <Icon source={TickMinor} color="primary" />
        </span>
      );
    } else if (status === false || status === null) {
      return (
        <span className={styles.priceValue}>
          <Icon source={CancelMinor} color="critical" />
        </span>
      );
    } else {
      return status;
    }
  };
  const capitalizeFirstLetter = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  // useEffect(() => {
  //   fullscreen.dispatch(Fullscreen.Action.EXIT);
  // }, []);

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
      <div style={{display: "flex"}}> 
      <div style={{ width: "70%" }}>
        <LegacyCard>
          <LegacyCard.Section>
            <div className="grid">
              <div className={styles.gridItem}>
                <div className={styles.boxHeading}>
                  <h4
                    className={`${styles.boxHeadingText} ${
                      user?.subscriptionName === SUBSCRIPTION_TYPES.FREE
                        ? styles.freeHeader
                        : styles.premiumHeader
                    }`}
                  >
                    Your current plan
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
                        {item?.subscriptionName === SUBSCRIPTION_TYPES.FREE && (
                          <div
                            className="d-grid "
                            style={{ visibility: "hidden" }}
                          >
                            <Button
                              variant="secondary"
                              className={`${
                                user?.subscriptionName !==
                                SUBSCRIPTION_TYPES.FREE
                                  ? styles.buttonSuccess
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
                                  <span className={styles.buttonFontStyle}>
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
                                      <span className={styles.buttonFontStyle}>
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
                                      <span className={styles.buttonFontStyle}>
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
                      <th colSpan={3} className={styles.featureTitle}>
                        <span className={styles.tableHeader}>
                          <span>Feature List</span>
                        </span>
                      </th>
                    </tr>
                    {subscriptionData?.length > 0 &&
                      Object.keys(subscriptionData[0]?.features).map(
                        (featureKey) => (
                          <React.Fragment key={featureKey}>
                            <tr>
                              <th colSpan={3}>
                                <span className={styles.tableHeader}>
                                  <span>
                                    {capitalizeFirstLetter(featureKey)}
                                  </span>
                                </span>
                              </th>
                            </tr>

                            {Object.entries(
                              subscriptionData[0]?.features[featureKey]
                            ).map(([innerKey, innerValue]) => (
                              <tr key={innerKey}>
                                <th scope="row" className={styles.rowData}>
                                  <div className={styles.rowTitle}>
                                    <dl className={styles.labelName}>
                                      <dt className={styles.labelText}>
                                        <span>
                                          {capitalizeFirstLetter(innerKey)}
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
            {/* </div> */}
          </LegacyCard.Section>
        </LegacyCard>
        {active && (
          <CommonModal
            {...{ active, isCancelPlan, handleClose, handleCancelSubscription }}
            title="Are you sure to cancel the current plan?"
            description="<p><strong>Note: </strong> Canceling this subscription plan will result in the following:</p>
            <ul>
              <li>Upon cancellation, you'll retain access to premium features until the end of the current billing cycle.</li>
              <li>You won't be charged for the following month, and after the current period, your subscription will automatically switch to the Free plan.</li>
              <li>While premium features will no longer be available and you can not access forms created under the premium plan.</li>
            </ul>
            <p>Please review our <a href='https://www.contactformtoapi.com/terms-of-service/' target='_blank' >terms and conditions</a> for detailed information.</p>
            <p>If you have any questions, our <a href='link-to-support'>customer support</a> is ready to assist.</p>
            <p>Thank you for being a valued subscriber!</p>"
          />
        )}
      </div>
      <div style={{width: "30%", marginLeft: "20px"}}>
         <a href="https://www.itpathsolutions.com/contact-us/" target="_blank" ><img src={ipsBanner} alt="" style={{width: "50vh", height:"50%"}}/></a>
          <a href="https://apps.shopify.com/contact-form-to-any-api" target="_blank" ><img src={ratingBanner} alt="" style={{width: "50vh", marginTop: "7px"}}/></a>
      </div>
      </div>
      <ToastContainer />
    </Page>
  );
}

export default Pricingplans;
