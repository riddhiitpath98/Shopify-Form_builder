import React, { useEffect, useState } from "react";
import { InputTypeProvider } from "../FormTabsProvider/Providers/InputTypeProvider";
import { Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { updatePayload } from "../../../redux/reducers/inputFieldSlice";
import { Icons } from "../../../constant";
import styles from "../FormStyle.module.css";

const FormFields = ({ isEdit, tabId, toggleDrawer }) => {
  const { inputId, title, attributes } = tabId;
  const dispatch = useDispatch();

  const formData = useSelector((state) => state?.inputField?.inputFields);

  const [commonFormInputs, setCommonFormInputs] = useState({
    label: attributes.label,
    hideLabel: attributes.hideLabel,
    placeholder: attributes.placeholder,
    description: attributes.description,
    limit_chars: attributes.limit_chars,
    limit_chars_count: attributes.limit_chars_count,
    required: attributes.required,
    column_width: attributes.column_width,
    confirmPassword: attributes.confirmPassword,
    confirmPasswordLabel: attributes.confirmPasswordLabel,
    confirmPasswordPlaceholder: attributes.confirmPasswordPlaceholder,
    confirmPasswordDescription: attributes.confirmPasswordDescription,
    resizeTextarea: attributes.resizeTextarea,
  });

  const handleChange = (name, value) => {
    let selectedValue = value;
    if (Array.isArray(value)) {
      selectedValue = value[0];
    }
    const updatedCommonFormInputs = {
      ...commonFormInputs,
      [name]: selectedValue,
    };
    setCommonFormInputs(updatedCommonFormInputs);
    dispatch(
      updatePayload({
        inputId,
        title,
        attributes: updatedCommonFormInputs,
      })
    );
  };

  const commonInputFields = [
    {
      id: "common_label_element",
      label: "Label",
      type: "text",
      name: "label",
      value: commonFormInputs.label,
      handleChange,
    },
    {
      id: "common_placeholder_element",
      label: "Placeholder",
      type: "text",
      name: "placeholder",
      value: commonFormInputs.placeholder,
      handleChange,
    },
    {
      id: "common_description_element",
      label: "Description",
      type: "text",
      name: "description",
      value: commonFormInputs.description,
      handleChange,
    },
    {
      id: "limit_chars",
      label: "Limit characters",
      type: "checkbox",
      name: "limit_chars",
      checked: commonFormInputs.limit_chars,
      handleChange,
    },
    {
      id: "limit_chars_count",
      type: "number",
      name: "limit_chars_count",
      show: commonFormInputs.limit_chars,
      value: commonFormInputs.limit_chars_count,
      handleChange,
    },
    {
      id: "hide_label",
      label: "Hide Label",
      type: "checkbox",
      name: "hideLabel",
      checked: commonFormInputs.hideLabel,
      handleChange,
    },
    {
      id: "required",
      label: "Required",
      type: "checkbox",
      name: "required",
      checked: commonFormInputs.required,
      handleChange,
    },
    {
      id: "column_width",
      title: "Column width",
      type: "choice_list",
      name: "column_width",
      selected: commonFormInputs.column_width,
      handleChange,
    },
  ];

  const passwordFields = [
    {
      id: "confirm_password",
      label: "Also create confirm password input",
      type: "checkbox",
      name: "confirmPassword",
      checked: commonFormInputs.confirmPassword,
      handleChange,
    },
    {
      id: "confirm_password_label",
      label: "Label confirm",
      type: "conditional_text",
      name: "confirmPasswordLabel",
      IsShowConfirmPassword: commonFormInputs.confirmPassword,
      value: commonFormInputs.confirmPasswordLabel,
      handleChange,
    },
    {
      id: "confirm_password_placeholder",
      label: "Placeholder confirm",
      type: "conditional_text",
      name: "confirmPasswordPlaceholder",
      IsShowConfirmPassword: commonFormInputs.confirmPassword,
      value: commonFormInputs.confirmPasswordPlaceholder,
      handleChange,
    },
    {
      id: "confirm_password_description",
      label: "Description confirm",
      type: "conditional_text",
      name: "confirmPasswordDescription",
      IsShowConfirmPassword: commonFormInputs.confirmPassword,
      value: commonFormInputs.confirmPasswordDescription,
      handleChange,
    },
  ];

  const textareaFields = [
    {
      id: "resizeTextarea",
      label: "Resize Input",
      type: "checkbox",
      name: "resizeTextarea",
      checked: commonFormInputs.resizeTextarea,
      handleChange,
    },
  ];

  const groupFields = () => {
    let data = [];
    const cloneData = [...commonInputFields];
    if (tabId?.id === "password") {
      cloneData.splice(7, 0, ...passwordFields);
      data = cloneData;
    } else if (tabId?.id === "textarea") {
      cloneData.splice(7, 0, ...textareaFields);
      data = cloneData;
    } else {
      data = commonInputFields;
    }
    return data;
  };

  useEffect(() => {
    if (isEdit) {
      const filteredData =
        formData && formData.find((value) => value?.inputId === inputId);
      setCommonFormInputs(filteredData?.attributes || commonFormInputs);
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
              {groupFields()?.map(
                ({
                  id,
                  type,
                  title,
                  show,
                  IsShowConfirmPassword,
                  ...otherData
                }) => (
                  <div className={styles.formFields}>
                    <div className={styles.textWrapper}>
                      <InputTypeProvider
                        key={id}
                        {...{
                          id,
                          type,
                          title,
                          tabId,
                          show,
                          IsShowConfirmPassword,
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
export default FormFields;
