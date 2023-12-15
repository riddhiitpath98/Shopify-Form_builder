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
import {
  addShopData,
} from "../../redux/actions/allActions";
import { useAppBridge } from "@shopify/app-bridge-react";
import { addShopId } from "../../redux/reducers/appIdSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../StripeCardPayment";
const stripePromise = loadStripe(
  "pk_live_IGCZ91wblgKajj7dxA8xci0E"
);


export default function PlanModal({
  active,
  toggleModal,
  isSuccess,
  shopData,
  showCardElement,
  setShowCardElement
}) {
  const app = useAppBridge();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [priceId, setPriceId] = useState();
  const subscriptionData = useSelector(
    (state) => state.subscription?.subscriptionData?.data
  );
  const appName = useSelector((state) => state?.shopId?.appName);
  const user = useSelector(state => state?.user?.userData?.user);
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
      setShowCardElement(true);
      setPriceId(PLAN_DETAILS.PREMIUM);
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
                        className={`${styles.boxHeadingText} ${!Object?.keys(user).length && user?.subscriptionName !== SUBSCRIPTION_TYPES.PREMIUM || user === undefined
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
                          {/* <div className={styles.trialDays}></div> */}
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
                              /<span>mo</span>
                            </span>
                          </div>

                          <Button

                            fullWidth
                            onClick={() =>
                              handleCreateSubscription(SUBSCRIPTION_TYPES.FREE)
                            }
                          >
                            <span>
                              <span>
                                <span>{PLAN_TEXT.START_FREE_PLAN}</span>
                              </span>
                            </span>
                          </Button>
                          <div className={styles.badge}>
                            <span>0 days trial</span>
                          </div>
                        </td>
                        <td className={styles.pricingRow}>
                          {/* <div className={styles.pmuBadge}>
                        <Badge status="success">
                          <span>
                            <span>-33% lifetime off</span>
                          </span>
                        </Badge>
                      </div> */}

                          {/* <div className={styles.trialDays}>3 days trial</div> */}
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
                              /<span>mo</span>
                            </span>
                          </div>
                          <Button
                            primary
                            fullWidth
                            onClick={() =>
                              handleCreateSubscription(
                                SUBSCRIPTION_TYPES.PREMIUM
                              )
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
        )
        }
      </Modal >
    </div >
  );
}
