import React, { useEffect, useState } from "react";
import { InputTypeProvider } from "../FormTabsProvider/Providers/InputTypeProvider";
import { Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { updatePayload } from "../../../redux/reducers/inputFieldSlice";
import { Icons } from "../../../constant";
import styles from "../FormStyle.module.css";


const CheckboxGroupFields = ({ isEdit, tabId, toggleDrawer }) => {
  console.log('tabId: ', tabId);
  const { inputId, title, attributes } = tabId;
  const dispatch = useDispatch();
  const formData = useSelector((state) => state?.inputField?.inputFields);

  const [checkBoxGroup, setCheckboxGroup] = useState({
    label: attributes.label,
    placeholder: attributes.placeholder,
    description: attributes.description,
    required: attributes.required,
    hideLabel: attributes.hideLabel,
    options: attributes.options,
    radio_options: attributes.radio_options,
    dropdown_options: attributes.dropdown_options,
    default_value: attributes.default_value,
    no_of_options: attributes.no_of_options,
    column_width: attributes.column_width,
  });

  const [tagValue, setTagValue] = useState("");
  const [radioTagValue, setRadioTagValue] = useState("");
  const [dropdownTagValue, setDropdownTagValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState(
    attributes?.default_value
  );

  const handleChange = (name, value) => {
    let selectedValue = value;
    if (Array.isArray(value)) {
      selectedValue = value[0];
    }
    const updatedFormInputs = { ...checkBoxGroup, [name]: selectedValue };
    setCheckboxGroup(updatedFormInputs);
    updateGlobalState(updatedFormInputs);
  };

  const handleOptionSelect = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    const updatedCheckBoxGroup = {
      ...checkBoxGroup,
      default_value: selectedOptions,
    };
    setCheckboxGroup(updatedCheckBoxGroup);
    updateGlobalState(updatedCheckBoxGroup);
  };

  const handleTagChange = (event) => {
    const newTags = event.target.value.split("\n").map((tag) => ({
      label: tag.trim(),
      value: tag.trim(),
    }));
    if (event.target.name === "options") {
      setTagValue(event.target.value);
      const updatedCheckBoxGroup = {
        ...checkBoxGroup,
        options: [...newTags],
        placeholder: event.target.value,
      };
      setCheckboxGroup(updatedCheckBoxGroup);
      updateGlobalState(updatedCheckBoxGroup);
    } else if (event.target.name === "radio_options") {
      setRadioTagValue(event.target.value);
      const updatedCheckBoxGroup = {
        ...checkBoxGroup,
        radio_options: [...newTags],
      };
      setCheckboxGroup(updatedCheckBoxGroup);
      updateGlobalState(updatedCheckBoxGroup);
    } else if (event.target.name === "dropdown_options") {
      setDropdownTagValue(event.target.value);
      const updatedCheckBoxGroup = {
        ...checkBoxGroup,
        dropdown_options: [...newTags],
      };
      setCheckboxGroup(updatedCheckBoxGroup);
      updateGlobalState(updatedCheckBoxGroup);
    }
  };

  const updateGlobalState = (updatedCheckBoxGroup) => {
    dispatch(
      updatePayload({
        inputId,
        title,
        attributes: updatedCheckBoxGroup,
      })
    );
  };
  const checkBoxFields = [
    {
      id: "file_label_element",
      label: "Label",
      type: "text",
      name: "label",
      value: checkBoxGroup.label,
      handleChange,
    },
    {
      id: "file_description_element",
      label: "Description",
      type: "text",
      name: "description",
      value: checkBoxGroup.description,
      handleChange,
    },
    {
      id: "required",
      label: "Required",
      type: "checkbox",
      name: "required",
      checked: checkBoxGroup.required,
      handleChange,
    },
    {
      id: "hide_label",
      label: "Hide Label",
      type: "checkbox",
      name: "hideLabel",
      checked: checkBoxGroup.hideLabel,
      handleChange,
    },
    {
      id: "options",
      label: "Options",
      type: "textarea",
      name: "options",
      value: checkBoxGroup.options,
      handleChange,
    },
    {
      id: "checkbox_default_value",
      title: "Select Default Value",
      type: "custom_select",
      name: "default_value",
      multiSelectOptions: checkBoxGroup.options,
      selectedOptions: checkBoxGroup.default_value,
      handleOptionSelect,
    },
    {
      id: "no_of_options",
      title: "No of options per line",
      type: "no_of_options",
      name: "no_of_options",
      selected: checkBoxGroup.no_of_options,
      handleChange,
    },
    {
      id: "column_width",
      title: "Column width",
      type: "choice_list",
      name: "column_width",
      selected: checkBoxGroup.column_width,
      handleChange,
    },
  ];

  const dropDownFields = [
    {
      id: "dropdown_placeholder_element",
      label: "Placeholder",
      type: "text",
      name: "placeholder",
      value: checkBoxGroup.placeholder,
      handleChange,
    },
    {
      id: "dropdown_options",
      label: "Options",
      type: "textarea",
      name: "dropdown_options",
      value: checkBoxGroup.dropdown_options,
      handleChange,
    },
    {
      id: "dropdown_default_value",
      label: "Select Default Value",
      type: "select",
      name: "default_value",
      placeholder: "Please Select",
      value: checkBoxGroup.default_value,
      selected: checkBoxGroup.dropdown_options,
      handleChange,
    },
  ];

  const radioFields = [
    {
      id: "radio_options",
      label: "Options",
      type: "textarea",
      name: "radio_options",
      value: checkBoxGroup.radio_options,
      handleChange,
    },
    {
      id: "radio_default_value",
      label: "Select Default Value",
      type: "select",
      name: "default_value",
      placeholder: "Please Select",
      value: checkBoxGroup.default_value,
      selected: checkBoxGroup.radio_options,
      handleChange,
    },
  ];

  const groupFields = () => {
    let data = [];
    const cloneData = [...checkBoxFields];
    if (tabId?.id === "checkbox") {
      data = checkBoxFields;
    } else if (tabId?.id === "radio") {
      cloneData.splice(4, 2, ...radioFields);
      data = cloneData;
    } else {
      cloneData.splice(4, 2, ...dropDownFields);
      data = cloneData;
    }
    return data;
  };

  useEffect(() => {
    let checkBoxArr = [];
    let radioArr = [];
    let dropDownArr = [];
    const filteredData =
      formData && formData.find((value) => value?.inputId === inputId);
    filteredData?.attributes?.options &&
      filteredData?.attributes?.options.map((data) =>
        checkBoxArr.push(data?.value)
      );
    setTagValue(checkBoxArr);
    filteredData?.attributes?.radio_options &&
      filteredData?.attributes?.radio_options?.map((data) =>
        radioArr.push(data?.value)
      );
    setRadioTagValue(radioArr);
    filteredData?.attributes?.dropdown_options &&
      filteredData?.attributes?.dropdown_options?.map((data) =>
        dropDownArr.push(data?.value)
      );
    setDropdownTagValue(dropDownArr);
    setCheckboxGroup(filteredData?.attributes || checkBoxGroup);
  }, []);

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
              {groupFields().map(
                ({
                  id,
                  type,
                  title,
                  label,
                  selected,
                  placeholder,
                  multiSelectOptions,
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
                          label,
                          tabId,
                          toggleDrawer,
                          handleTagChange,
                          tagValue,
                          radioTagValue,
                          dropdownTagValue,
                          selected,
                          placeholder,
                          multiSelectOptions,
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
export default CheckboxGroupFields;
