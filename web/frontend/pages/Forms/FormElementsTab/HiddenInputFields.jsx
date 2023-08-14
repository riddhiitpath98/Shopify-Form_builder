import React, { useEffect, useState } from "react";
import { InputTypeProvider } from "../FormTabsProvider/Providers/InputTypeProvider";
import { Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { updatePayload } from "../../../redux/reducers/inputFieldSlice";
import { Icons } from "../../../constant";
import styles from "../FormStyle.module.css";

const HiddenInputFields = ({ isEdit, tabId, toggleDrawer }) => {
  const { inputId, title, attributes } = tabId;
  const dispatch = useDispatch();

  const [hiddenInput, setHiddenInput] = useState({
    label: attributes.label,
    data_type: attributes.data_type,
    hiddenValue: attributes.hiddenValue,
  });

  const formData = useSelector((state) => state?.inputField?.inputFields);

  
  const hiddenOptions = [
    { value: "fixedValue", label: "Fixed value" },
    { value: "dynamicValue", label: "Dynamic value" },
  ];

  const handleChange = (name, value) => {
    const updatedFormInputs = { ...hiddenInput, [name]: value };
    setHiddenInput(updatedFormInputs);
    dispatch(
      updatePayload({
        inputId,
        title,
        attributes: updatedFormInputs,
      })
    );
  };

  const hiddenInputFields = [
    {
      id: "hidden_label_element",
      label: "Label",
      type: "text",
      name: "label",
      value: hiddenInput.label,
      handleChange,
    },
    {
      id: "hidden_data_type_element",
      label: "Data type",
      type: "select",
      name: "hidden_data_type",
      value: hiddenInput.hidden_data_type,
      handleChange,
    },
    {
      id: "hidden_assign_val_element",
      label: "Assign Value",
      type: "text",
      name: "hiddenValue",
      value: hiddenInput.hiddenValue,
      handleChange,
    },
    {
      id: "hidden_remove_element",
      label: "Remove element",
      type: "button",
      name: "remove_element",
      value: "",
    },
  ];

  useEffect(() => {
    if (isEdit) {
      const filteredData = formData && formData.find(
        (value) => value?.inputId === inputId
      );      
      setHiddenInput(filteredData?.attributes || hiddenInput);
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
              {hiddenInputFields.map(
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
                          hiddenOptions,
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
export default HiddenInputFields;
