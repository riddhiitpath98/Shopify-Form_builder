import { useEffect, useState } from "react";
import { Icon } from "@shopify/polaris";
import { useDispatch } from "react-redux";
import { InputTypeProvider } from "./InputTypeProvider";
import { addFooterElement } from "../../../../redux/reducers/inputFieldSlice";
import { useSelector } from "react-redux";
import { Icons } from "../../../../constant";
import styles from "../../FormStyle.module.css";

const FooterFields = ({ tabId, toggleDrawer }) => {
  const { id, title, attributes } = tabId;
  const dispatch = useDispatch();
  const footerFieldData = useSelector(
    (state) => state?.inputField?.footerFieldData
  );

  const [footerFields, setFooterFields] = useState({
    text: footerFieldData?.attributes ? footerFieldData?.attributes?.text : attributes.text,
    submitButton:
      footerFieldData?.attributes ? footerFieldData?.attributes?.submitButton : attributes.submitButton,
    resetButton:
      footerFieldData?.attributes ? footerFieldData?.attributes?.resetButton : attributes.radioButton,
    buttonWidth:
      footerFieldData?.attributes ? footerFieldData?.attributes?.buttonWidth : attributes.buttonWidth,
    resetButtonText: footerFieldData?.attributes ? footerFieldData?.attributes?.resetButtonText : attributes.resetButtonText,
    footerAlign: footerFieldData?.attributes ? footerFieldData?.attributes?.footerAlign : attributes.footerAlign,
  });
  
  const handleChange = (name, value) => {
    const updatedCommonFormInputs = { ...footerFields, [name]: value };
    setFooterFields(updatedCommonFormInputs);
    dispatch(
      addFooterElement({
        id,
        title,
        attributes: updatedCommonFormInputs,
      })
    );
  };

  const customFooterFields = [
    {
      id: "footer_tilte_element",
      label: "Text",
      type: "editor",
      name: "text",
      value: footerFields.text,
      handleChange,
    },
    {
      id: "footer_submit_text_element",
      label: "Submit Text",
      type: "text",
      name: "submitButton",
      value: footerFields.submitButton,
      handleChange,
    },
    {
      id: "footer_reset_element",
      label: "Reset button",
      type: "checkbox",
      name: "resetButton",
      checked: footerFields.resetButton,
      handleChange,
    },
    {
      id: "footer_button_width_element",
      label: "Full width footer button",
      type: "checkbox",
      name: "buttonWidth",
      checked: footerFields.buttonWidth,
      handleChange,
    },
    {
      id: "footer_reset_text_element",
      label: "Reset button Text",
      type: "text",
      name: "resetButtonText",
      value: footerFields.resetButtonText,
      handleChange,
    },
    {
      id: "footerAlign",
      title: "Alignment",
      type: "text_alignment",
      name: "footerAlign",
      selected: footerFields.footerAlign,
      handleChange,
    },
  ];

  return (
    <>
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
                {customFooterFields?.map(({ id, type, ...otherData }) => (
                  <div className={styles.formFields}>
                    <div className={styles.textWrapper}>
                      <InputTypeProvider key={id} {...{ type, ...otherData }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FooterFields;
