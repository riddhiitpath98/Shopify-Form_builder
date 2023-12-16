import { useCallback, useMemo } from "react";
import { Icons, SUBSCRIPTION_TYPES } from "../constant";

const elemType = ["Inputs", "Select", "Static Text", "premium only"];

const useElements = () => {
    const customElements = useMemo(
        () => [
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
                        id: "file",
                        // viewAccess: ["premium", "enterprise"],
                        title: "File",
                        icon: Icons.file,
                        type: "file",
                        attributes: {
                            label: "File",
                            description: "",
                            hideLabel: false,
                            required: false,
                            column_width: "50%",
                            allowedExtensions: [
                                { label: "jpg", value: "jpg" },
                                { label: "jpeg", value: "jpeg" },
                                { label: "pdf", value: "pdf" },
                            ],
                            allowMultiple: false,
                        },
                    },
                    {
                        id: "url",
                        viewAccess: ["premium", "enterprise"],
                        title: "Url",
                        icon: Icons.url,
                        type: "text",
                        attributes: {
                            label: "Url",
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
                        id: "date_time",
                        viewAccess: ["premium", "enterprise"],
                        title: "Date Time",
                        icon: Icons.date_time,
                        type: "date",
                        attributes: {
                            label: "Date Time",
                            placeholder: "",
                            description: "",
                            hideLabel: false,
                            limit_chars: false,
                            required: false,
                            dateTimeFormat: "2",
                            dateFormat: "d-m-Y",
                            timeFormat: "12h",
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
                            column_width: "100%",
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
                                "I agree <a href='#'>Terms and Conditions</a>",
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
                    {
                        id: "html",
                        viewAccess: ["premium", "enterprise"],
                        title: "HTML",
                        icon: Icons.html,
                        type: "HTML",
                        attributes: {
                            htmlCode: "<div>Enter your code</div>",
                            column_width: "50%",
                        },
                    },
                ],
            },
            {
                label: "premium only",
                viewAccess: "free",
                fields: [
                    {
                        id: "url",
                        premiumOnly: true,
                        title: "Url",
                        icon: Icons.url,
                        type: "text",
                        attributes: {
                            label: "Url",
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
                        id: "date_time",
                        premiumOnly: true,
                        title: "Date Time",
                        icon: Icons.date_time,
                        type: "date",
                        attributes: {
                            label: "Date Time",
                            placeholder: "",
                            description: "",
                            hideLabel: false,
                            limit_chars: false,
                            required: false,
                            dateTimeFormat: "2",
                            dateFormat: "d-m-Y",
                            timeFormat: "12h",
                            column_width: "50%",
                        },
                    },
                    {
                        id: "html",
                        premiumOnly: true,
                        title: "HTML",
                        icon: Icons.html,
                        type: "HTML",
                        attributes: {
                            htmlCode: "<div>Enter your code</div>",
                            column_width: "50%",
                        },
                    },

                ],
            }
        ],
        [Icons]
    );

    const checkElements = (plan, elem, checkPreview) => {
        const data = checkPreview
            ? elem.filter((val) => {
                if (!val?.viewAccess)
                    return val
                else if (val?.viewAccess?.includes(plan))
                    return val
                else
                    return null
            })
            : elem.map((val) => {
                return {
                    ...val,
                    fields: val?.fields?.filter((item) => {
                        if (!item?.viewAccess) {
                            return item;
                        } else if (item?.viewAccess?.includes(plan)) {
                            return item;
                        } else return null;
                    }),
                };
            });
        return data;
    };

    const elements = (
        selectedPlan = SUBSCRIPTION_TYPES.FREE,
        inputFields = customElements,
        checkPreview
    ) => {
        if (!selectedPlan) return [];
        return checkElements(selectedPlan, inputFields, checkPreview);
    };

    return { customElements, elements };
};

export default useElements;
