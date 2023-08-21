import React from "react";
import { Icon } from "@shopify/polaris";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addElement } from "../../../../redux/reducers/inputFieldSlice";
import { Icons } from "../../../../constant";
import styles from "../../FormStyle.module.css";

const AddElementList = ({ isEdit, tabId, toggleDrawer }) => {
  const { title } = tabId;
  const dispatch = useDispatch();

  const customElements = [
    {
      label: "Inputs",
      fields: [
        {
          id: "text",
          title: "Text",
          icon: Icons.text,
          type: "text",
          attributes: {
            label: "Text",
            placeholder: "",
            description: "",
            hideLabel: false,
            limit_chars: false,
            limit_chars_count: "20",
            required: false,
            column_width: "50%",
          },
        },
        {
          id: "email",
          title: "Email",
          icon: Icons.email,
          type: "email",
          attributes: {
            label: "Email",
            placeholder: "Email",
            description: "",
            hideLabel: false,
            limit_chars: false,
            limit_chars_count: "20",
            required: false,
            column_width: "50%",
          },
        },
        {
          id: "name",
          title: "Name",
          icon: Icons.name,
          type: "text",
          attributes: {
            label: "Name",
            placeholder: "",
            description: "",
            hideLabel: false,
            limit_chars: false,
            limit_chars_count: "20",
            required: false,
            column_width: "50%",
          },
        },
        {
          id: "textarea",
          title: "Textarea",
          icon: Icons.textarea,
          type: "textarea",
          attributes: {
            label: "Textarea",
            placeholder: "",
            description: "",
            hideLabel: false,
            limit_chars: false,
            limit_chars_count: "20",
            required: false,
            column_width: "50%",
            resizeTextarea: false,
          },
        },
        {
          id: "phone",
          title: "Phone",
          icon: Icons.phone,
          type: "text",
          attributes: {
            label: "Phone",
            placeholder: "",
            description: "",
            hideLabel: false,
            limit_chars: false,
            limit_chars_count: "20",
            required: false,
            column_width: "50%",
          },
        },
        {
          id: "number",
          title: "Number",
          icon: Icons.number,
          type: "number",
          attributes: {
            label: "Number",
            placeholder: "",
            description: "",
            hideLabel: false,
            limit_chars: false,
            limit_chars_count: "20",
            required: false,
            column_width: "50%",
          },
        },
        {
          id: "password",
          title: "Password",
          icon: Icons.password,
          type: "password",
          attributes: {
            label: "Password",
            placeholder: "Enter Your Password",
            description: "",
            hideLabel: false,
            limit_chars: false,
            limit_chars_count: "20",
            required: false,
            confirmPassword: false,
            confirmPasswordLabel: "Confirm Password",
            confirmPasswordPlaceholder: "Confirm your password",
            confirmPasswordDescription: "",
            column_width: "50%",
          },
        },
        {
          id: "hidden",
          title: "Hidden",
          icon: Icons.hidden,
          type: "hidden",
          attributes: {
            label: "Hidden",
            data_type: "",
            hiddenValue: "",
          },
        },
      ],
    },
    {
      label: "Select",
      fields: [
        {
          id: "checkbox",
          title: "Checkboxes",
          icon: Icons.checkbox,
          type: "checkbox",
          attributes: {
            label: "Checkboxes",
            placeholder: "",
            description: "",
            required: false,
            hideLabel: false,
            options: [{ label: "Option 1", value: "Option 1" }],
            radio_options: [],
            dropdown_options: [],
            default_value: "",
            no_of_options: "1",
            column_width: "50%",
          },
        },
        {
          id: "accept_terms",
          title: "Accept Terms",
          icon: Icons.accept_terms,
          type: "checkbox",
          attributes: {
            label:
              "I agree <a href='/' target='_blank'>Terms and Conditions</a>",
            description: "",
            isDefaultSelected: false,
            required: false,
            column_width: "50%",
          },
        },
        {
          id: "radio",
          title: "Radio Buttons",
          icon: Icons.radio,
          type: "radio",
          attributes: {
            label: "Radio Buttons",
            placeholder: "",
            description: "",
            required: false,
            hideLabel: false,
            options: [],
            radio_options: [{ label: "Option 1", value: "Option 1" }],
            dropdown_options: [],
            default_value: "",
            no_of_options: "1",
            column_width: "50%",
          },
        },
        {
          id: "dropdown",
          title: "Dropdown",
          icon: Icons.dropdown,
          type: "select",
          attributes: {
            label: "Dropdown",
            placeholder: "Please Select",
            description: "",
            required: false,
            hideLabel: false,
            options: [],
            radio_options: [],
            dropdown_options: [],
            default_value: "",
            no_of_options: "1",
            column_width: "50%",
          },
        },
        // {
        //   id:"country",
        //   title:"Country",
        //   icon:GlobeMajor,
        // },
      ],
    },
    {
      label: "Static Text",
      fields: [
        {
          id: "heading",
          title: "Heading",
          type: "heading",
          icon: Icons.heading,
          attributes: {
            heading: "Heading",
            caption: "",
            column_width: "50%",
          },
        },
        {
          id: "paragraph",
          title: "Paragraph",
          type: "editor",
          icon: Icons.paragraph,
          attributes: {
            text: "Paragraph",
            column_width: "50%",
          },
        },
      ],
    },
    {
      label: "Structure",
      fields: [
        {
          id: "divider",
          title: "Divider",
          type: "divider",
          icon: Icons.divider,
          attributes: {
            hideDivider: false,
          },
        },
      ],
    },
  ];

  const handleRedirectToFields = (data) => {
    const id = uuidv4();
    const inputId = id.slice(0, 8);
    dispatch(addElement({ ...data, inputId, isEdit }));
    toggleDrawer();
  };

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
                {customElements?.map(({ label, fields }, index) => (
                  <div className={styles.contentWrapper} key={index}>
                    <div>
                      <div className={styles.subHeading}>{label}</div>
                      <div>
                        {fields?.map((data, index) => (
                          <div className={styles.contentWrapper} key={index}>
                            <div className={styles.listItem}>
                              <div
                                className={styles.row}
                                onClick={() => handleRedirectToFields(data)}
                              >
                                <div className={styles.elementIcon}>
                                  <Icon source={data?.icon} />
                                </div>
                                <div className={styles.elementTitle}>
                                  <div>
                                    <div>{data?.title}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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

export default AddElementList;
