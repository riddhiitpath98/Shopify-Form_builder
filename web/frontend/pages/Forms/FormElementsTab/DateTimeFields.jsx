import React, { useEffect, useState } from "react";
import { InputTypeProvider } from "../FormTabsProvider/Providers/InputTypeProvider";
import { Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { addFormSubmission, updatePayload } from "../../../redux/reducers/inputFieldSlice";
import { Icons } from "../../../constant";
import styles from "../FormStyle.module.css";

const DateTimeFields = ({ isEdit, tabId, toggleDrawer }) => {
    const { inputId, title, attributes } = tabId;
    const dispatch = useDispatch();

    const [dateTimeInput, setDateTimeInput] = useState({
        label: attributes.label,
        placeholder: attributes.placeholder,
        description: attributes.description,
        hideLabel: attributes.hideLabel,
        limit_chars: attributes.limit_chars,
        required: attributes.required,
        dateTimeFormat: attributes.dateTimeFormat,
        dateFormat: attributes.dateFormat,
        timeFormat: attributes.timeFormat,
        column_width: attributes.column_width,
    });
    const formData = useSelector((state) => state?.inputField?.inputFields);
    const dateKeyName = useSelector(state => state.inputField.dateKeyName);
    const formSubmissionData = useSelector(state => state.inputField.formSubmissionData);

    const dateFormatOptions = [
        { label: "Y-m-d", value: "Y-m-d" },
        { label: "d-m-Y", value: "d-m-Y" },
    ];
    const timeFormatOptions = [
        { label: "12h", value: "12h" },
        { label: "24h", value: "24h" },
    ];
    const handleChange = (name, value) => {
        if (Object.keys(formSubmissionData).includes(dateKeyName)) {
            let formData = { ...formSubmissionData, [dateKeyName]: "" }
            dispatch(addFormSubmission(formData))
        }

        let selectedValue = value;
        const result = typeof value === "string" ? value.split(" ") : "";
        if (Array.isArray(value)) {
            selectedValue = value[0];
        }
        const updatedFormInputs = { ...dateTimeInput, [name]: selectedValue };
        setDateTimeInput(updatedFormInputs);
        dispatch(
            updatePayload({
                inputId,
                title,
                attributes: updatedFormInputs,
            })
        );
    };
    const dateTimeInputFields = [
        {
            id: "date_time_label_element",
            label: "Label",
            type: "text",
            name: "label",
            value: dateTimeInput.label,
            handleChange,
        },
        {
            id: "date_time_placeholder_element",
            label: "Placeholder",
            type: "text",
            name: "placeholder",
            value: dateTimeInput.placeholder,
            handleChange,
        },
        {
            id: "date_time_description_element",
            label: "Description",
            type: "text",
            name: "description",
            value: dateTimeInput.description,
            handleChange,
        },
        {
            id: "date_time_required",
            label: "Required",
            type: "checkbox",
            name: "required",
            checked: dateTimeInput.required,
            handleChange,
        },
        {
            id: "hide_label",
            label: "Hide Label",
            type: "checkbox",
            name: "hideLabel",
            checked: dateTimeInput.hideLabel,
            handleChange,
        },
        {
            id: "date_time_format",
            title: "Format",
            type: "date_time_format",
            name: "dateTimeFormat",
            value: dateTimeInput.dateTimeFormat,
            selected: dateTimeInput.dateTimeFormat,
            handleChange,
        },
        {
            id: "date_format_element",
            label: "Date Format",
            type: "select",
            name: "dateFormat",
            value: dateTimeInput.dateFormat,
            handleChange,
        },
        {
            id: "time_format_element",
            label: "Time Format",
            type: "select",
            name: "timeFormat",
            value: dateTimeInput.timeFormat,
            handleChange,
        },
        {
            id: "column_width",
            title: "Column width",
            type: "choice_list",
            name: "column_width",
            selected: dateTimeInput.column_width,
            handleChange,
        },
    ];

    // useEffect(() => {
    //   if (isEdit) {
    //     const filteredData = formData && formData.find(
    //       (value) => value?.inputId === inputId
    //     );      
    //     setDateTimeInput(filteredData?.attributes || dateTimeInput);
    //   }
    // }, [isEdit]);

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
                            {dateTimeInputFields?.map(({ id, type, title, ...otherData }) => (
                                <div className={styles.formFields}>
                                    <div className={styles.textWrapper}>
                                        <InputTypeProvider
                                            key={id}
                                            {...{
                                                id,
                                                type,
                                                title,
                                                tabId,
                                                toggleDrawer,
                                                dateFormatOptions,
                                                timeFormatOptions,
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
export default DateTimeFields;