import React, { useEffect, useState } from "react";
import { InputTypeProvider } from "../FormTabsProvider/Providers/InputTypeProvider";
import { Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { updatePayload } from "../../../redux/reducers/inputFieldSlice";
import { Icons } from "../../../constant";
import styles from "../FormStyle.module.css";

const HtmlInputFields = ({ isEdit, tabId, toggleDrawer }) => {
    const { inputId, title, attributes } = tabId;
    const dispatch = useDispatch();

    const formData = useSelector((state) => state?.inputField?.inputFields);


    const [htmlInput, setHtmlInput] = useState({
        htmlCode: attributes.htmlCode,
        column_width: attributes.column_width,
    });
    const [htmlData, setHtmlData] = useState();

    const handleHtmlInputChange = (event) => {
        setHtmlData(event.target.value);
        const updatedFormInputs = {
            ...htmlInput,
            [event.target.name]: event.target.value,
        };
        setHtmlInput(updatedFormInputs);
        updateGlobalState(updatedFormInputs);
    };

    const handleChange = (name, value) => {
        let selectedValue = value;
        if (Array.isArray(value)) {
            selectedValue = value[0];
        }
        const updatedFormInputs = {
            ...htmlInput,
            [name]: selectedValue,
        };
        setHtmlInput(updatedFormInputs);
        updateGlobalState(updatedFormInputs);
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

    const htmlInputFields = [
        {
            id: "html_code_element",
            label: "HTML code",
            type: "HTML",
            name: "htmlCode",
            value: htmlInput.htmlCode,
            handleHtmlInputChange,
        },
        {
            id: "heading_column_width_element",
            title: "Column width",
            type: "choice_list",
            name: "column_width",
            selected: htmlInput.column_width,
            handleChange,
        },
    ];

    useEffect(() => {
        if (isEdit) {
            const filteredData = formData && formData.find(
                (value) => value?.inputId === inputId
            );
            setHtmlInput(filteredData?.attributes || htmlInput);
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
                            {htmlInputFields?.map(
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
export default HtmlInputFields;