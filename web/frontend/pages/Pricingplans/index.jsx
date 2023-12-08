import { Badge, Button, Icon, LegacyCard, Page } from "@shopify/polaris";
// import { pricingPlanData } from "../../constant";
import "./PricingPlan.module.css";
import { TickMinor } from "@shopify/polaris-icons";
import { MinusMinor } from "@shopify/polaris-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Fullscreen, Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge, useNavigate } from "@shopify/app-bridge-react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./PricingPlan.module.css";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import {
  addShopData,
  createApplicationCharge,
  getUserByShopId,
} from "../../redux/actions/allActions";
import {
  PLAN_DETAILS,
  PLAN_TEXT,
  SUBSCRIPTION_TYPES,
  handleRecurringChargeVal,
} from "../../constant";
import { addShopId } from "../../redux/reducers/appIdSlice";
import { useAppQuery } from "../../hooks";
import CommonModal from "../../components/CommonModal";
import { ToastContainer } from "react-toastify";
import { addClientSecret } from "../../redux/reducers/userSlice";
import PaymentModal from "./paymentModal";
import axios from "axios";


function Pricingplans() {
  const app = useAppBridge();
  const dispatch = useDispatch();
  const fullscreen = Fullscreen.create(app);
  const shopData = useAppQuery({ url: "/api/shop" });

  const [active, setActive] = useState(false);
  const [isCancelPlan, setIsCancelPlan] = useState(false);
  const [recurringCharge, setRecurringCharge] = useState({});
  const [clientSecret, setClientSecret] = useState();
  const appearance = {
    theme: 'stripe',
  };

  const subscriptionData = useSelector(
    (state) => state.subscription?.subscriptionData?.data
  );

  const shopId = useSelector((state) => state?.shopId?.shopId);
  const user = useSelector((state) => state?.user?.userData?.user);
  console.log('user: ', user);
  const navigate = useNavigate();
  const subscription = useAppQuery({ url: "/api/subscriptions" });
  const appName = useSelector((state) => state?.shopId?.appName);
  const [priceId, setPriceId] = useState();
  const [showCardElement, setShowCardElement] = useState(false);
  const handleOpen = (data) => {
    setActive(true);
    setIsCancelPlan(true);
  };

  const handleClose = useCallback(() => {
    setActive(false);
  }, []);

  const handleUserNavigation = async (plan) => {
    // if (plan === SUBSCRIPTION_TYPES.FREE) {
    //   console.log('plan', plan)
    //   // const {
    //   //   id,
    //   //   name,
    //   //   email,
    //   //   domain,
    //   //   city,
    //   //   country,
    //   //   customer_email,
    //   //   shop_owner,
    //   //   myshopify_domain,
    //   //   phone,
    //   // } = shopData.data;
    //   // let user = {
    //   //   shopId: id,
    //   //   shopName: name,
    //   //   email,
    //   //   domain: myshopify_domain,
    //   //   city,
    //   //   country,
    //   //   customer_email,
    //   //   shop_owner,
    //   //   myshopify_domain,
    //   //   phone,
    //   // };
    //   // subscriptionData.filter(({ subscriptionName, _id }, index) => {
    //   //   if (subscriptionName === plan) {
    //   //     user = { ...user, subscriptionName, subscriptionId: _id };
    //   //   }
    //   // });
    //   // dispatch(addShopData(user));
    //   // dispatch(addShopId(id));
    //   // toggleModal();
    //   // navigate("/dashboard", { replace: true });
    // } else if (plan === SUBSCRIPTION_TYPES.PREMIUM) {
    //   const data = {
    //     plan: SUBSCRIPTION_TYPES.PREMIUM,
    //     amount: recurringCharge?.premium_subscription?.amount,
    //     email: user?.customer_email,
    //     currency: recurringCharge?.premium_subscription?.currencyCode,
    //     description: 'Software development services',
    //     shipping: {
    //       name: user?.shop_owner,
    //       address: {
    //         line1: user?.address,
    //         postal_code: user?.zip,
    //         city: user?.city,
    //         state: user?.state,
    //         country: user?.country,
    //       },
    //     },
    //   };
    //   dispatch(createSubscription(data))
    // }
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
        customer_email,
        shop_owner,
        myshopify_domain,
        phone,
      } = shopData?.data;
      let user = {
        shopId: id,
        shopName: name,
        email,
        domain: myshopify_domain,
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
      setShowCardElement(true)
      setPriceId(PLAN_DETAILS.PREMIUM)
    };
  }

  useEffect(() => {
    fullscreen.dispatch(Fullscreen.Action.EXIT);
    dispatch(getUserByShopId(shopId));
    setRecurringCharge(handleRecurringChargeVal(appName, shopData?.data));
  }, [dispatch, shopId, shopData?.isSuccess]);

  const handleCancelSubscription = async () => {
    const response = await axios.delete(`/payment/delete-subscription/${user?.subscription?.subscriptionId}`)
    const index = subscriptionData.findIndex(
      (sub) => sub.subscriptionName === SUBSCRIPTION_TYPES.FREE
    );
    const data = {
      ...user,
      shopId: user?.shopId,
      shopName: user?.shopName,
      domain: user?.domain,
      subscriptionName: subscriptionData[index].subscriptionName,
      subscriptionId: subscriptionData[index]._id,
      subscription: null
    };
    dispatch(addShopData(data));
    setActive(false);
    setIsCancelPlan(false);

    // const cancelSubscription = subscription?.data?.appSubscriptions.filter(
    //   (item) => item.name === "Premium Subscription"
    // );
    // getSessionToken(app).then((session) => {
    //   const options = {
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `Bearer ${session}` || "",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(cancelSubscription[0]),
    //   };

    //   fetch(`/api/cancelSubscription`, options)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       if (
    //         res?.data?.appSubscriptionCancel?.appSubscription?.status ===
    //         "CANCELLED"
    //       ) {
    //         const index = subscriptionData.findIndex(
    //           (sub) => sub.subscriptionName === SUBSCRIPTION_TYPES.FREE
    //         );
    //         const data = {
    //           ...user,
    //           shopId: user?.shopId,
    //           shopName: user?.shopName,
    //           domain: user?.domain,
    //           subscriptionName: subscriptionData[index].subscriptionName,
    //           subscriptionId: subscriptionData[index]._id,
    //           subscription: null
    //         };
    //         dispatch(addShopData(data));
    //         setActive(false);
    //         setIsCancelPlan(false);
    //       }
    //     });
    // });
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
          <Icon source={MinusMinor} color="base" />
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
  useEffect(() => {
    fullscreen.dispatch(Fullscreen.Action.EXIT);
  }, []);

  const toggleModal = () => {
    setShowCardElement(false);
  }
  return (
    <Page fullWidth title="Pricing Plans">
      {showCardElement ? <PaymentModal active={showCardElement} priceId={priceId} toggleModal={toggleModal} setShowCardElement={setShowCardElement} /> : null}
      <div style={{ width: "70%" }}>
        <LegacyCard>
          <LegacyCard.Section>
            <div className="grid">
              <div className={styles.gridItem}>
                <div className={styles.boxHeading}>
                  <h4
                    className={`${styles.boxHeadingText} ${user?.subscriptionName === SUBSCRIPTION_TYPES.FREE
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
                      {/* <div className={styles.badge}>
                        <Badge status="success">
                          <span>
                            <span>-33% lifetime off</span>
                          </span>
                        </Badge>
                      </div> */}
                      <div className={styles.trialDays}></div>
                      <div className={styles.monthlyPrice}>
                        <span className={styles.monthlyPriceCur}>USD</span>
                        <span className={styles.priceValue}>
                          <span className={styles.price}>
                            <span>
                              {/* <sub className={styles.dollar}>$</sub> */}
                              <span className={styles.rupees}>$0</span>
                            </span>
                          </span>
                        </span>
                        <span className={styles.month}>
                          /<span>month</span>
                        </span>
                      </div>

                      <Button
                        primary
                        disabled={
                          user?.subscriptionName === SUBSCRIPTION_TYPES.FREE
                        }
                        onClick={handleOpen}
                        fullWidth
                      >
                        <span>
                          <span>
                            <span>
                              {user?.subscriptionName ===
                                SUBSCRIPTION_TYPES.FREE
                                ? PLAN_TEXT.CURRENT_PLAN
                                : PLAN_TEXT.CHOOSE_PLAN}
                            </span>
                          </span>
                        </span>
                      </Button>
                    </td>
                    <td className={styles.pricingRow}>
                      <div className={styles.trialDays}>3 days trial</div>
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
                              {/* <sub className={styles.dollar}>$</sub> */}
                              <span className={styles.rupees}>$6.67</span>
                            </span>
                          </span>
                        </span>
                        <span className={styles.month}>
                          /<span>month</span>
                        </span>
                      </div>
                      <Button
                        disabled={
                          user?.subscriptionName === SUBSCRIPTION_TYPES.PREMIUM
                        }
                        primary
                        fullWidth
                        onClick={() =>
                          handleCreateSubscription(SUBSCRIPTION_TYPES.PREMIUM)
                        }
                      >
                        <span>
                          <span>
                            <span>
                              {user?.subscriptionName ===
                                SUBSCRIPTION_TYPES.PREMIUM
                                ? PLAN_TEXT.CURRENT_PLAN
                                : PLAN_TEXT.CHOOSE_PLAN}
                            </span>
                          </span>
                        </span>
                      </Button>

                      {user?.subscriptionName === SUBSCRIPTION_TYPES.PREMIUM ? (
                        <div style={{ marginTop: "5px" }}>
                          <Button fullWidth onClick={handleOpen}>
                            <span>
                              <span>
                                <span>{PLAN_TEXT.CANCEL_PLAN}</span>
                              </span>
                            </span>
                          </Button>
                        </div>
                      ) : null}
                      {/* <div className={styles.pmuBadge}>
                        <span>7 days trial</span>
                      </div> */}
                    </td>
                    {subscriptionData?.length > 0 &&
                      Object.keys(subscriptionData[0]?.features).map(
                        (featureKey) => (
                          <React.Fragment key={featureKey}>
                            <tr>
                              <th colSpan={3}>
                                <span className={styles.tableHeader}>
                                  <span>{featureKey}</span>
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
            title="Are you sure to cancel/change the current plan?"
            description="<p><strong>Note:</strong> Canceling this subscription plan will result in the following:</p>
            <ul>
              <li>The subscription will be set to the Free plan.</li>
              <li>You will not be able to access the features that are available in the premium plan.</li>
              <li>You can access all forms created under the premium plan, without any restricted elements.</li>
            </ul>
            <p>Be sure to read above terms & conditions before cancelling the subscription.</p>"
          />
        )}

      </div>
      <ToastContainer />
    </Page>
  );
}

export default Pricingplans;
