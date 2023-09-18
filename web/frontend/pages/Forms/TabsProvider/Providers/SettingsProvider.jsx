import React, { useState } from "react";
import FormDrawer from "../../FormDrawer/FormDrawer";
import styles from "../../FormStyle.module.css";
import { Icon } from "@shopify/polaris";
import useSettingsElement from "../../../../hooks/useSettingsElement";
import { useSelector } from "react-redux";

const SettingsProvider = ({ isEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tabId, setTabId] = useState({});
  const user = useSelector(state => state.user.userData.user);
  const { elements } = useSettingsElement();
  const toggleDrawer = (id, title, attributes) => {
    setTabId({ id, title, attributes });
    setIsOpen((prev) => !prev);
  };

  return (
    <section>
      {elements(user.subscriptionName)?.map(({ id, title, icon, attributes }) => (
        <div className={styles.rootContent} key={id}>
          <div className={styles.contentWrapper}>
            <div>
              <div className={styles.contentWrapper}>
                <div className={styles.listItem}>
                  <div
                    className={styles.row}
                    onClick={() => toggleDrawer(id, title, attributes)}
                  >
                    <div className={styles.elementIcon}>
                      <Icon source={icon} />
                    </div>
                    <div className={styles.elementTitle}>
                      <div>
                        <div>{title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <FormDrawer {...{ isEdit, isOpen, toggleDrawer, tabId }} />
    </section>
  );
};

export default SettingsProvider;
