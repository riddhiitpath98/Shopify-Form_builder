import React from 'react'
import styles from "./BannerPremium.module.css";
import { Banner, Link } from '@shopify/polaris';


const BannerPremium = ({ text, url, linkText }) => {
    return (
        <Banner status='warning' onDismiss={() => { }} >
            <p className={styles.premiumPlanText}>{text} <Link url={url}><span className={styles.premiumPlanLink}>{linkText}</span></Link></p>
        </Banner>
    )
}

export default BannerPremium