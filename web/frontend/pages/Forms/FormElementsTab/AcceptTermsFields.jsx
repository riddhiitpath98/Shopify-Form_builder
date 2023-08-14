import React, { useEffect, useState } from "react";
import { InputTypeProvider } from "../FormTabsProvider/Providers/InputTypeProvider";
import { Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { updatePayload } from "../../../redux/reducers/inputFieldSlice";
import styles from "../FormStyle.module.css";
import { Icons } from "../../../constant";

const AcceptTermsFields = ({ isEdit,tabId, toggleDrawer }) => {
  const { inputId, title, attributes } = tabId;
  const dispatch = useDispatch();

  const formData = useSelector((state) => state?.inputField?.inputFields);

  const [acceptTermsInput, setAcceptTermsInput] = useState({
    label: attributes.label,
    description: attributes.description,
    isDefaultSelected: attributes.isDefaultSelected,
    required: attributes.required,
    column_width: attributes.column_width,
  });

  const options = [
    { value: "please select", label: "please select" },
    { value: "option 1", label: "Option 1" },
    { value: "option 2", label: "Option 2" },
    { value: "option 3", label: "Option 3" },
  ];

  const handleChange = (name, value) => {
    const updatedFormInputs = { ...acceptTermsInput, [name]: value };
    setAcceptTermsInput(updatedFormInputs);
    dispatch(
      updatePayload({
        inputId,
        title,
        attributes: updatedFormInputs,
      })
    );
  };

  const acceptTermsInputFields = [
    {
      id: "accept_terms_label_element",
      label: "Label",
      type: "text",
      name: "label",
      value: acceptTermsInput.label,
      handleChange,
    },
    // {
    //   id: "heading_default_selected",
    //   label: "Default is selected",
    //   type: "checkbox",
    //   name: "isDefaultSelected",
    //   checked: acceptTermsInput.isDefaultSelected,
    //   handleChange,
    // },
    {
      id: "accpet_terms_description_element",
      label: "Description",
      type: "text",
      name: "description",
      value: acceptTermsInput.description,
      handleChange,
    },
    {
      id: "required",
      label: "Required",
      type: "checkbox",
      name: "required",
      checked: acceptTermsInput.required,
      handleChange,
    },
    {
      id: "heading_column_width_element",
      title: "Column width",
      type: "choice_list",
      name: "column_width",
      selected: acceptTermsInput.column_width,
      handleChange,
    },
  ];

  useEffect(() => {
    if (isEdit) {
      const filteredData = formData && formData.find(
        (value) => value?.inputId === inputId
      );      
      setAcceptTermsInput(filteredData?.attributes || acceptTermsInput);
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
              {acceptTermsInputFields?.map(
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
                          options,
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
export default AcceptTermsFields;
