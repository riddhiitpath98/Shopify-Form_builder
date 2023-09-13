import {
  Button,
  Modal,
  LegacyStack,
  TextContainer,
  LegacyCard,
  HorizontalStack,
  Badge,
  Icon,
} from "@shopify/polaris";
import React, { useState, useCallback, useEffect } from "react";
import styles from "./PricingPlan.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../constant";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { addShopData } from "../../redux/actions/allActions";

export default function PlanModal({ active, toggleModal, isSuccess, shopData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const subscriptionData = useSelector(
    (state) => state.subscription?.subscriptionData?.data
  );
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

  const handleUserNavigation = (plan) => {
    const { id, name, email, domain, city, country, customer_email, shop_owner, myshopify_domain, phone } = shopData;
    let user = { id, name, email, domain, city, country, customer_email, shop_owner, myshopify_domain, phone };
    subscriptionData.filter(({ subscriptionName, _id }, index) => {
      if (subscriptionName === plan) {
        user = { ...user, subscriptionName, subscriptionId: _id }
      }
    })
    dispatch(addShopData(user))
    navigate("/dashboard", { replace: true })
  }

  return (
    <div style={{ height: "500px" }}>
      <Modal
        // activator={activator}
        open={active}
        onClose={toggleModal}
        title="Pricing plans"
        primaryAction={{
          content: "Close",
          onAction: toggleModal,
        }}
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

                        <Button primary fullWidth onClick={() => handleUserNavigation('free')}>
                          <span>
                            <span>
                              <span>Choose this plan</span>
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
                                {/* <sub className={styles.dollar}>$</sub> */}
                                {/* <span className={styles.dollarValue}>14.9</span> */}
                                <span className={styles.rupees}>
                                  Coming Soon...
                                </span>
                              </span>
                            </span>
                          </span>
                          <span className={styles.month}>
                            {/* /<span>mo</span> */}
                          </span>

                        </div>
                        <Button primary fullWidth onClick={() => handleUserNavigation('primium')}>
                          <span>
                            <span>
                              <span>Choose this plan</span>
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

                      {subscriptionData.length > 0 && Object.keys(subscriptionData[0]?.features).map(
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
                              subscriptionData[0].features[featureKey]
                            ).map(([innerKey, innerValue]) => (
                              <tr key={innerKey}>
                                <th scope="row" className={styles.rowData}>
                                  <div className={styles.rowTitle}>
                                    <dl className={styles.labelName}>
                                      <dt className={styles.labelText}>
                                        <span>{innerKey}</span>
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
    </div>);
}