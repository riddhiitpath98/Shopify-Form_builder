import { Badge, Button, Card, Heading, Icon, Page } from "@shopify/polaris";
import { pricingPlanData } from "../../constant";
import "./PricingPlan.module.css";
import { TickMinor } from "@shopify/polaris-icons";
import { MinusMinor } from "@shopify/polaris-icons";
import styles from "./PricingPlan.module.css";

function Pricingplans() {
  const renderStatusIcon = (status) => {
    if (status === true) {
      return (
        <span className={styles.priceValue}>
          <Icon source={TickMinor} color="primary" />
        </span>
      );
    } else if (status === false) {
      return (
        <span className={styles.priceValue}>
          <Icon source={MinusMinor} color="base" />
        </span>
      );
    } else {
      return status;
    }
  };

  const handleClick = () => {
    alert("Premium plan")
  }
  return (
    <Page fullWidth>
      <Heading>Pricing Plans</Heading>
      <div style={{ width: "70%" }}>
        <Card>
          <Card.Section>
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
                            <span>Current Plan</span>
                          </span>
                        </span>
                      </Button>
                      <div className={styles.badge}>
                        <span>0 days trial</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.pmuBadge}>
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
                              <span className={styles.dollarValue}>14.9</span>
                              <span className={styles.rupees}>9.99</span>
                            </span>
                          </span>
                        </span>
                        <span className={styles.month}>
                          /<span>mo</span>
                        </span>
                      </div>

                      <Button onClick={handleClick} primary fullWidth>
                        <span>
                          <span>
                            <span>Start free trial</span>
                          </span>
                        </span>
                      </Button>
                      <div className={styles.pmuBadge}>
                        <span>7 days trial</span>
                      </div>
                    </td>
                    {pricingPlanData?.map((planData, id) => (
                      <>
                        <tr key={id}>
                          <th colSpan={3}>
                            <span className={styles.tableHeader}>
                              <span>{planData?.heading}</span>
                            </span>
                          </th>
                        </tr>
                        {planData?.tableData?.map((data, id) => (
                          <tr key={id}>
                            <th scope="row" className={styles.rowData}>
                              <div className={styles.rowTitle}>
                                <dl className={styles.labelName}>
                                  <dt className={styles.labelText}>
                                    <span>{data?.title}</span>
                                  </dt>
                                  <dd className={styles.labelDescription}></dd>
                                </dl>
                              </div>
                            </th>
                            <td>{renderStatusIcon(data?.unpaid)}</td>
                            <td>{renderStatusIcon(data?.paid)}</td>
                          </tr>
                        ))}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* </div> */}
          </Card.Section>
        </Card>
      </div>
    </Page>
  );
}

export default Pricingplans;
