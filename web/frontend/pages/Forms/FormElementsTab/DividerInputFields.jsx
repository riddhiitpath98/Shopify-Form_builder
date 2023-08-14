import React, { useEffect, useState } from "react";
import { InputTypeProvider } from "../FormTabsProvider/Providers/InputTypeProvider";
import { Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { updatePayload } from "../../../redux/reducers/inputFieldSlice";
import { Icons } from "../../../constant";
import styles from "../FormStyle.module.css";

const DividerInputFields = ({ isEdit, tabId, toggleDrawer }) => {
  const { inputId, title, attributes } = tabId;
  const dispatch = useDispatch();

  const formData = useSelector((state) => state?.inputField?.inputFields);



  const [dividerInput, setDividerInput] = useState({
    hideDivider: attributes.hideDivider,
  });

  const handleChange = (name, value) => {
    const updatedFormInputs = { ...dividerInput, [name]: value };
    setDividerInput(updatedFormInputs);
    dispatch(
      updatePayload({
        inputId,
        title,
        attributes: updatedFormInputs,
      })
    );
  };

  const dividerInputFields = [
    {
      id: "hide_divider_element",
      label: "Hide divider",
      type: "checkbox",
      name: "hideDivider",
      checked: dividerInput.hideDivider,
      handleChange,
    },
    {
      id: "divider_remove_element",
      label: "Remove element",
      type: "button",
      name: "divider_remove_element",
      value: "",
    },
  ];

  useEffect(() => {
    if (isEdit) {
      const filteredData = formData && formData.find(
        (value) => value?.inputId === inputId
      );      
      setDividerInput(filteredData?.attributes || dividerInput);
    }
  }, [isEdit]);

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
              {dividerInputFields?.map(
                ({ id, type, title, label, ...otherData }) => (
                  <div className={styles.formFields}>
                    <div className={styles.textWrapper}>
                      <InputTypeProvider
                        key={id}
                        {...{
                          id,
                          type,
                          title,
                          label,
                          tabId,
                          toggleDrawer,
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
export default DividerInputFields;
