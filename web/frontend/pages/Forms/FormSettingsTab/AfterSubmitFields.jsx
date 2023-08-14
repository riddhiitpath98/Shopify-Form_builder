import React, { useEffect, useState } from "react";
import { Icon } from "@shopify/polaris";
import { Icons } from "../../../constant";
import { SettingsInputTypeProvider } from "./SettingsInputTypeProvider";
import styles from "../FormStyle.module.css";
import { useDispatch, useSelector } from "react-redux";
import { updatedAfterSubmitPayload } from "../../../redux/reducers/formSettingSlice";
import { setFormSubmitted } from "../../../redux/reducers/submissionSlice";

const AfterSubmitFields = ({ isEdit, tabId, toggleDrawer }) => {
  const { title, attributes } = tabId;
  const dispatch = useDispatch();
  const [isRedirect, setIsRedirect] = useState({});
  const afterSubmit = useSelector(
    (state) => state.formSetting.afterSubmitData.data.afterSubmit
  );
  const updatedAfterSubmit = useSelector(
    (state) => state.formSetting.afterSubmitData?.updatedAfterSubmit
  );

  const [afterSubmitData, setAfterSubmitData] = useState(updatedAfterSubmit?.length > 0 ? updatedAfterSubmit : afterSubmit);


  const afterSubmitFields = useSelector(
    (state) => state.formSetting?.afterSubmitData?.afterSubmitFields
  );

  const handleChange = (name, value) => {
    dispatch(setFormSubmitted(false));
    if (value === "pageRedirect") {
      setIsRedirect({ [value]: true });
    } else if (value === "clearForm" || value === "hideForm") {
      setIsRedirect({ [value]: false });
    }
    const newArray = afterSubmitData.map((item, i) => {
      if (item.name === name) {
        return { ...item, value: value };
      } else {
        return item;
      }
    });
    setAfterSubmitData(newArray);
    dispatch(updatedAfterSubmitPayload(newArray));
  };

  return (
    <div>
      <div className={`${styles.nested} ${styles.toggle}`}>
        <div className={styles.nestedHeader}>
          <div className={styles.backIcon} onClick={toggleDrawer}>
            <Icon source={Icons.backArrow} />
          </div>
          <div className={styles.nestedTitle}>{title}</div>
        </div>
        <div className={styles.nestedContent}>
          <div>
            <div>
              {afterSubmitData?.map(
                ({ id, type, label, name, options, ...otherData }) => (
                  <div className={styles.formFields}>
                    <div className={styles.textWrapper}>
                      <SettingsInputTypeProvider
                        key={id}
                        {...{
                          id,
                          type,
                          label,
                          name,
                          tabId,
                          options,
                          toggleDrawer,
                          handleChange,
                          isRedirect,
                          ...otherData,
                        }}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AfterSubmitFields;
