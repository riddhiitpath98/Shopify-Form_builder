import React, { useEffect, useState } from "react";
import { InputTypeProvider } from "../FormTabsProvider/Providers/InputTypeProvider";
import { Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { updatePayload } from "../../../redux/reducers/inputFieldSlice";
import { Icons } from "../../../constant";
import styles from "../FormStyle.module.css";

const HeadingInputFields = ({ isEdit, tabId, toggleDrawer }) => {
  const { inputId, title, attributes } = tabId;
  const dispatch = useDispatch();

  const [headingInput, setHeadingInput] = useState({
    heading: attributes.heading,
    caption: attributes.caption,
    column_width: attributes.column_width,
  });

  const formData = useSelector((state) => state?.inputField?.inputFields);


  const handleHtmlInputChange = (event) => {
    const updatedFormInputs = {
      ...headingInput,
      [event.target.name]: event.target.value,
    };
    setHeadingInput(updatedFormInputs);
    updateGlobalState(updatedFormInputs);
  };

  const handleChange = (name, value) => {
    let selectedValue = value;
    if (Array.isArray(value)) {
      selectedValue = value[0];
    }
    const updatedFormInputs = { ...headingInput, [name]: selectedValue };
    setHeadingInput(updatedFormInputs);
    updateGlobalState(updatedFormInputs)
  };

  const updateGlobalState = (updatedFormInputs) => {
    dispatch(
      updatePayload({
        inputId,
        title,
        attributes: updatedFormInputs,
      })
    );
  };

  const headingInputFields = [
    {
      id: "heading_element",
      label: "Label",
      type: "text",
      name: "heading",
      value: headingInput.heading,
      handleChange,
    },
    {
      id: "heading_caption_element",
      label: "Caption",
      type: "HTML",
      name: "caption",
      value: headingInput.caption,
      handleHtmlInputChange,
    },
    {
      id: "heading_column_width_element",
      title: "Column width",
      type: "choice_list",
      name: "column_width",
      selected: headingInput.column_width,
      handleChange,
    },
  ];

  useEffect(() => {
    if (isEdit) {
      const filteredData = formData && formData.find(
        (value) => value?.inputId === inputId
      );      
      setHeadingInput(filteredData?.attributes || headingInput);
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
              {headingInputFields?.map(
                ({ id, type, title, label, value, ...otherData }) => (
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
                          value,
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
export default HeadingInputFields;
