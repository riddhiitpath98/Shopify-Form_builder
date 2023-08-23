import React, { useState } from "react";
import FormDrawer from "../../FormDrawer/FormDrawer";
import styles from "../../FormStyle.module.css";
import { Icons, appearanceAttributes, validationAttributes } from "../../../../constant";
import { Icon } from "@shopify/polaris";

const SettingsProvider = ({ isEdit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tabId, setTabId] = useState({});

  const toggleDrawer = (id, title, attributes) => {
    setTabId({ id, title, attributes });
    setIsOpen((prev) => !prev);
  };

  const settingsElements = [
    {
      id: "appearance",
      title: "Appearance",
      icon: Icons.appearance,
      attributes: appearanceAttributes,
    },
    {
      id: "error_msg",
      title: "Error message",
      icon: Icons.error_msg,
      attributes: validationAttributes
    },
    {
      id: "submit_actions",
      title: "After Submit",
      icon: Icons.after_submit,
      attributes: {
        submitAction: "",
        submitMessage: "",
      }
    },
  ];

  return (
    <section>
      {settingsElements?.map(({ id, title, icon, attributes }) => (
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
