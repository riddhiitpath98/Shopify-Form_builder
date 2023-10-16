import { Badge, Button, Icon, LegacyCard, Page } from "@shopify/polaris";
// import { pricingPlanData } from "../../constant";
import "./PricingPlan.module.css";
import { TickMinor } from "@shopify/polaris-icons";
import { MinusMinor } from "@shopify/polaris-icons";
import React, { useEffect } from "react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useSelector } from "react-redux";
import styles from "./PricingPlan.module.css";


function Pricingplans() {
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  useEffect(() => {
    fullscreen.dispatch(Fullscreen.Action.EXIT);
  }, [])

  const subscriptionData = useSelector(
    (state) => state.subscription?.subscriptionData?.data
  );
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
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  useEffect(() => {
    fullscreen.dispatch(Fullscreen.Action.EXIT);
  }, []);

  return (
    <Page fullWidth title="Pricing Plans">
      <div style={{ width: "70%" }}>
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
                      {/* <div className={styles.badge}>
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
                              <span className={styles.rupees}>0</span>
                            </span>
                          </span>
                        </span>
                        <span className={styles.month}>
                          /<span>mo</span>
                        </span>
                      </div>

                      <Button outline disabled fullWidth>
                        <span>
                          <span>
                            <span>Current Plan</span>
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
                        {/* <span className={styles.monthlyPriceCur}>USD</span> */}
                        <span className={styles.priceValue}>
                          <span className={styles.price}>
                            <span>
                              {/* <sub className={styles.dollar}>$</sub>
                              <span className={styles.dollarValue}>14.9</span> */}
                              <span className={styles.rupees}>Coming Soon</span>
                            </span>
                          </span>
                        </span>
                        {/* <span className={styles.month}>
                          /<span>mo</span>
                        </span> */}
                      </div>
                    
                      <Button  primary fullWidth>
                        <span>
                          <span>
                            <span>Start free trial</span>
                          </span>
                        </span>
                      </Button>
                      {/* <div className={styles.pmuBadge}>
                        <span>7 days trial</span>
                      </div> */}
                    </td>
                    {subscriptionData?.length > 0 && Object.keys(subscriptionData[0]?.features).map(
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
                                      <span>{capitalizeFirstLetter(innerKey)}</span>
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
      </div>
    </Page >
  );
}

export default Pricingplans;