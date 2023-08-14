import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@shopify/polaris";
import { Icons } from "../../../constant";
import { SettingsInputTypeProvider } from "./SettingsInputTypeProvider";
import { useDispatch, useSelector } from "react-redux";
import { updatedValidationPayload } from "../../../redux/reducers/formSettingSlice";
import styles from "../FormStyle.module.css";

const ErrorMessageFields = ({ isEdit, tabId, toggleDrawer }) => {
  const { title, attributes } = tabId;

  const dispatch = useDispatch();

  const validation = useSelector(
    (state) => state.formSetting.validationData.data.validation
  );
  const updatedErrorMsg = useSelector(
    (state) => state.formSetting.validationData?.updatedValidation
  );
  const [errorMessage, setErrorMessage] = useState(updatedErrorMsg?.length > 0 ? updatedErrorMsg : validation);

  const handleChange = (name, value) => {
    const newArray = errorMessage.map((item, i) => {
      if (item.name === name) {
        return { ...item, value: value };
      } else {
        return item;
      }
    });
    setErrorMessage(newArray);
    dispatch(updatedValidationPayload(newArray));
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
              {errorMessage?.map(({ id, type, label, name, ...otherData }) => (
                <div className={styles.formFields} key={id}>
                  <div className={styles.textWrapper}>
                    <SettingsInputTypeProvider
                      key={id}
                      {...{
                        id,
                        type,
                        label,
                        name,
                        tabId,
                        toggleDrawer,
                        handleChange,
                        ...otherData,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ErrorMessageFields;
