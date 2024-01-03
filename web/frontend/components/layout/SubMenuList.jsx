import { Icon } from "@shopify/polaris";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import styles from "./NavigationMenubar.module.css";

const SubMenuList = ({ submenus, isOpenMenu, setIsOpenMenu }) => {
  const app = useAppBridge();
  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown")) {
      setIsOpenMenu(false)
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <ul
      className={`${styles.ipsTabSubMenu} ${`dropdown ${isOpenMenu ? styles.ipsTabShow : ""
        }`}`}
    >
      {submenus.map(({ id, content, path, icon }) => (
        <li key={id} className={styles.ipsTabSubMenuItems}>
          {id === "faq" ? (
            <Link
              to="https://www.contactformtoapi.com/#faq"
              target="_blank"
              onClick={() =>
                app.dispatch(
                  Redirect.create(app, "https://www.contactformtoapi.com/#faq")
                )
              }
              className={`${styles.ipsTabMenuLink} ${location.pathname?.includes(path) ? styles.ipsTabActive : ""
                }`}
            >
              <div style={{ margin: 0 }}>
                <Icon
                  source={icon}
                  className={`${location.pathname?.includes(path) ? styles.ipsTabActive : ""
                    }`}
                />
              </div>
              <span className={styles.ipsTabNavTitle}>{content}</span>
            </Link>
          ) : (
            <Link
              to={path}
              className={`${styles.ipsTabMenuLink} ${location.pathname?.includes(path) ? styles.ipsTabActive : ""
                }`}
            >
              <div style={{ margin: 0 }}>
                <Icon
                  source={icon}
                  className={`${location.pathname?.includes(path) ? styles.ipsTabActive : ""
                    }`}
                />
              </div>
              <span className={styles.ipsTabNavTitle}>{content}</span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SubMenuList;
