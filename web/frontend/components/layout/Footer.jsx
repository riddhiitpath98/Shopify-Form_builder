import { FooterHelp, Page } from "@shopify/polaris";

import styles from "../../pages/Dashboard/Dashboard.module.css";

import Logo from "../../assets/IPS_Logo.png";

const Footer = () => {
  return (
    <Page>
      <FooterHelp>
        <div className={styles.footer}>
          <span>
            Made with L❤️VE by{" "}
            <a href="https://www.itpathsolutions.com/" target="_blank">
              IT Path Solutions
            </a>
          </span>
        </div>
        <div className={styles.footerLogo}>
          <img
            src={Logo}
            alt="IT Path Solutions"
            width={"115px"}
            height={"37px"}
          />
        </div>
      </FooterHelp>
    </Page>
  );
};

export default Footer;
