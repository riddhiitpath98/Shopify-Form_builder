import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Icon } from "@shopify/polaris";
import { Icons } from "../../../constant";
import styles from "../FormStyle.module.css";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getRecaptchaSettingsByAppId, updateReCaptchaSettings } from "../../../redux/actions/allActions";
import { updateEnableRecaptcha } from "../../../redux/reducers/inputFieldSlice";


const GooglereCaptcha = ({ isEdit, tabId, toggleDrawer }) => {
  const { title, attributes } = tabId;
  const app = useAppBridge();
  const dispatch = useDispatch();
  const appId = useSelector(state => state?.appId?.appId)
  const recaptchaSettings = useSelector(state => state?.setting?.reCaptchaSettingData?.data);
  const formData = useSelector(state => state?.inputField?.editFormData?.formData)
  const googelRecaptcha = useSelector(state => state?.inputField?.googelRecaptcha);

  useEffect(() => {
    dispatch(getRecaptchaSettingsByAppId(appId))
  }, [dispatch]);

  const handleChange = (value) => {
    const update = { ...googelRecaptcha, enable: value }
    dispatch(updateEnableRecaptcha(update))
    if (googelRecaptcha.formId) {
      dispatch(updateReCaptchaSettings(update))
    }
    else {
      dispatch(updateEnableRecaptcha(update))
    }
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
              <div className={styles.formFields}>
                <div className={styles.textWrapper}>
                  <div className={styles.paragraph}>
                    {recaptchaSettings?.siteKey !== "" &&
                      recaptchaSettings?.secretKey !== "" ? (
                      <Checkbox
                        label="Enable"
                        name="enableReCaptcha"
                        checked={googelRecaptcha?.enable}
                        onChange={handleChange}
                      />
                    ) : (
                      <span>
                        Please make sure that you have set Google reCaptcha v2
                        Site key and Secret key in{" "}
                        <a
                          href="https://anavya-store.myshopify.com/admin/apps/contact-form-app-new/settings"
                          target="_blank"
                          onClick={() =>
                            app.dispatch(
                              Redirect.create(
                                app,
                                "https://anavya-store.myshopify.com/admin/apps/contact-form-app-new/settings"
                              )
                            )
                          }
                        >
                          reCaptcha Settings
                        </a>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GooglereCaptcha;
