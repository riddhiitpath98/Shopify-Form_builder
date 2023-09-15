import React, { useEffect, useState } from "react";
import { InputTypeProvider } from "../FormTabsProvider/Providers/InputTypeProvider";
import { Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { updatePayload } from "../../../redux/reducers/inputFieldSlice";
import { Icons } from "../../../constant";
import styles from "../FormStyle.module.css";

const FileInputFields = ({ isEdit, tabId, toggleDrawer }) => {
  const { inputId, title, attributes } = tabId;
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState(...attributes?.allowedExtensions);

  const [fileInput, setFileInput] = useState({
    label: attributes.label,
    hideLabel: attributes.hideLabel,
    required: attributes.required,
    description: attributes.description,
    column_width: attributes.column_width,
    allowedExtensions: attributes.allowedExtensions,
    allowMultiple: attributes.allowMultiple,
  });

  const formData = useSelector((state) => state?.inputField?.inputFields);

  const multiSelectOptions = [
    { label: "jpg", value: "jpg" },
    { label: "jpeg", value: "jpeg" },
    { label: "png", value: "png" },
  ];
  const handleOptionSelect = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    const updatedFileInputs = {
      ...fileInput,
      allowedExtensions: [...selectedOptions],
    };
    setFileInput(updatedFileInputs);
    dispatch(
      updatePayload({
        inputId,
        title,
        attributes: updatedFileInputs,
      })
    );
  };

  const handleChange = (name, value) => {
    let selectedValue = value;
    if (Array.isArray(value)) {
      selectedValue = value[0];
    }
    const updatedFormInputs = { ...fileInput, [name]: selectedValue };
    setFileInput(updatedFormInputs);
    dispatch(
      updatePayload({
        inputId,
        title,
        attributes: updatedFormInputs,
      })
    );
  };

  const fileInputFields = [
    {
      id: "file_label_element",
      label: "Label",
      type: "text",
      name: "label",
      value: fileInput.label,
      handleChange,
    },
    {
      id: "allow_multiple",
      label: "Allow Multiple",
      type: "checkbox",
      name: "allowMultiple",
      checked: fileInput.allowMultiple,
      handleChange,
    },
    {
      id: "custom_select",
      title: "Allowed Extensions",
      type: "custom_select",
      name: "allowedExtensions",
      selectedOptions: fileInput.allowedExtensions,
      handleOptionSelect,
    },
    {
      id: "file_description_element",
      label: "Description",
      type: "text",
      name: "description",
      value: fileInput.description,
      handleChange,
    },
    {
      id: "hide_label",
      label: "Hide Label",
      type: "checkbox",
      name: "hideLabel",
      checked: fileInput.hideLabel,
      handleChange,
    },
    {
      id: "required",
      label: "Required",
      type: "checkbox",
      name: "required",
      checked: fileInput.required,
      handleChange,
    },
    {
      id: "column_width",
      title: "Column width",
      type: "choice_list",
      name: "column_width",
      selected: fileInput.column_width,
      handleChange,
    },
  ];

  useEffect(() => {
    if (isEdit) {
      const filteredData = formData && formData.find(
        (value) => value?.inputId === inputId
      );
      setFileInput(filteredData?.attributes || fileInput);
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
              {fileInputFields?.map(({ id, type, title, ...otherData }) => (
                <div className={styles.formFields}>
                  <div className={styles.textWrapper}>
                    <InputTypeProvider
                      key={id}
                      {...{
                        id,
                        type,
                        title,
                        tabId,
                        multiSelectOptions,
                        selectedOptions,
                        toggleDrawer,
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
export default FileInputFields;