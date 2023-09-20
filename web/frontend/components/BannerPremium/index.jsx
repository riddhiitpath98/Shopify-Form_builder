import React from 'react'
import styles from "./BannerPremium.module.css";
import { Link } from '@shopify/polaris';


const BannerPremium = ({ text, url, linkText }) => {
    return (
        <div className={styles.premiumPlan}>
            <p className={styles.premiumPlanText}>{text}<Link url={url}><span className={styles.premiumPlanLink}>{linkText}</span></Link></p>
        </div>
    )
}

export default BannerPremium