import React from 'react'
import styles from "./FormPreview.module.css";

const CommonTextFeild = ({ id,
    inputId,
    type,
    formSubmissionData,
    appearanceFields,
    title,
    index,
    attributes,
    inputStyles,
    widthInput,
    handleChange,
    formFeildData,
    ...props }) => {
    const {
        label,
        placeholder,
        description,
        limit_chars,
        limit_chars_count,
        required,
        hideLabel,
    } = attributes || {};

    return (
        <div className={styles.ipsFormPreviewInputContainer}>
            <label
                htmlFor={inputId}
                className={styles.ipsFormPreviewInputClassicLabel}
                style={{
                    color:
                        appearanceFields?.labelColor && appearanceFields?.labelColor,
                }}
            >
                {hideLabel ? "" : label}
            </label>
            <span className={styles.ipsFormPreviewTextRequired}> {required ? " *" : ""}</span>
            <br />
            <input
                type={type}
                id={inputId}
                className={styles.ipsFormPreviewInputClassicInput}
                value={formSubmissionData[`${inputId}_${id}`]}
                name={`${inputId}_${id}`}
                min={0}
                required={""}
                placeholder={placeholder}
                autoComplete="off"
                maxLength={limit_chars ? limit_chars_count : undefined}
                style={{ ...inputStyles, width: widthInput }}
                onChange={(event) => handleChange(event)}
            />
            <span className={styles.ipsPreviewDescription} style={{
                color:
                    appearanceFields?.descriptionColor && appearanceFields?.descriptionColor,
            }}>{description}</span>
            <small>
                <p className={styles.ipsFormPreviewErrorMessage}>
                    {required ? formFeildData[index]?.errorMessage : null}
                </p>
            </small>
        </div>
    )
}

export default CommonTextFeild