import {
  Button,
  Modal,
  LegacyStack,
  TextContainer,
  LegacyCard,
  HorizontalStack,
  Badge,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import styles from "./PricingPlan.module.css";

export default function PlanModal({
  active,
  setActive,
  toggleModal,
  activator,
}) {
  //   const [active, setActive] = useState(true);

  //   const toggleModal = useCallback(() => setActive((active) => !active), []);

  //   const activator = <Button onClick={toggleModal}>Open</Button>;

  return (
    <div style={{ height: "500px" }}>
      <Modal
        activator={activator}
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

                        <Button outline disabled fullWidth>
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
                      {/* {pricingPlanData?.map((planData, id) => ( */}
                        <>
                          <tr >
                            <th colSpan={3}>
                              <span className={styles.tableHeader}>
                                {/* <span>{planData?.heading}</span> */}
                              </span>
                            </th>
                          </tr>
                          {/* {planData?.tableData?.map((data, id) => ( */}
                            <tr >
                              <th scope="row" className={styles.rowData}>
                                <div className={styles.rowTitle}>
                                  <dl className={styles.labelName}>
                                    <dt className={styles.labelText}>
                                      {/* <span>{data?.title}</span> */}
                                    </dt>
                                    <dd
                                      className={styles.labelDescription}
                                    ></dd>
                                  </dl>
                                </div>
                              </th>
                              {/* <td>{renderStatusIcon(data?.unpaid)}</td>
                              <td>{renderStatusIcon(data?.paid)}</td> */}
                            </tr>
                          {/* ))} */}
                        </>
                      {/* ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </LegacyCard.Section>
          </LegacyCard>
        </div>
        {/* <Modal.Section>
          <LegacyStack vertical>
            <LegacyStack.Item>
              <TextContainer>
                <p>
                  You can share this discount link with your customers via email
                  or social media. Your discount will be automatically applied
                  at checkout.
                </p>
              </TextContainer>
            </LegacyStack.Item>
          </LegacyStack>
        </Modal.Section> */}
      </Modal>
    </div>
  );
}
