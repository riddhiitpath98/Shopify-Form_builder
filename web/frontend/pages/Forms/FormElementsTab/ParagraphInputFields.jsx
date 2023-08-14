import React, { useEffect, useState } from "react";
import { InputTypeProvider } from "../FormTabsProvider/Providers/InputTypeProvider";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@shopify/polaris";
import { updatePayload } from "../../../redux/reducers/inputFieldSlice";
import { Icons } from "../../../constant";
import styles from "../FormStyle.module.css";

const ParagraphInputFields = ({ isEdit, tabId, toggleDrawer }) => {
  const { inputId, title, attributes } = tabId;
  const dispatch = useDispatch();

  const formData = useSelector((state) => state?.inputField?.inputFields);



  const [paragraphInput, setParagraphInput] = useState({
    text: attributes.text,
    column_width: attributes.column_width,
  });

  const handleChange = (name, value) => {
    let selectedValue = value;
    if (Array.isArray(value)) {
      selectedValue = value[0];
    }
    const updatedFormInputs = { ...paragraphInput, [name]: selectedValue };
    setParagraphInput(updatedFormInputs);
    dispatch(
      updatePayload({
        inputId,
        title,
        attributes: updatedFormInputs,
      })
    );
  };

  const paragraphInputFields = [
    {
      id: "editor_text_element",
      label: "Text",
      type: "editor",
      name: "text",
      value: paragraphInput.text,
      handleChange
    },
    {
      id: "paragraph_column_width_element",
      title: "Column width",
      type: "choice_list",
      name: "column_width",
      selected: paragraphInput.column_width,
      handleChange,
    },
  ];

  useEffect(() => {
    if (isEdit) {
      const filteredData = formData && formData.find(
        (value) => value?.inputId === inputId
      );      
      setParagraphInput(filteredData?.attributes || paragraphInput);
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
              {paragraphInputFields?.map(
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
export default ParagraphInputFields;
