import React from "react";
import { Banner } from "@shopify/polaris";
import styles from "./BannerPremium.module.css";

export default function BannerPremium({ title, text, url, status, buttonText }) {
  return (
    <div className={styles.ipsBannerPremiumPlan}>
      <Banner
        title={title}
        // action={{ content: buttonText, url: url }}
        status={status}
        onDismiss={() => {}}
      >
        <p>{text}</p>
      </Banner>
    </div>
  );
}
