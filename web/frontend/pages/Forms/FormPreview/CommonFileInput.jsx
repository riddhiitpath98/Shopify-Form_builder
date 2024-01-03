import React from "react";
import styles from "./FormPreview.module.css";

const CommonFileInput = ({
  id,
  inputId,
  type,
  formSubmissionData,
  appearanceFields,
  title,
  index,
  attributes,
  inputStyles,
  widthInput,
  handleFileChange,
  formFeildData,
  acceptExtensions,
  ...props
}) => {
  const {
    label,
    placeholder,
    description,
    limit_chars,
    limit_chars_count,
    required,
    hideLabel,
    allowedExtensions,
    allowMultiple,
  } = attributes || {};

  return (
    <div className={styles.ipsFormPreviewInputContainer}>
      <label
        htmlFor={inputId}
        className={styles.ipsFormPreviewInputClassicLabel}
        style={{
          color: appearanceFields?.labelColor && appearanceFields?.labelColor,
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
        name={`${inputId}_${id}`}
        accept={acceptExtensions}
        placeholder={placeholder}
        autoComplete="off"
        required={""}
        maxLength={limit_chars ? limit_chars_count : undefined}
        style={{ ...inputStyles, width: widthInput }}
        {...(allowMultiple ? { multiple: true } : {})}
        onChange={(event) => handleFileChange(event)}
      />
      <span
        className={styles.ipsPreviewDescription}
        style={{
          color:
            appearanceFields?.descriptionColor &&
            appearanceFields?.descriptionColor,
        }}
      >
        {description}
      </span>
      <small>
        <p className={styles.ipsFormPreviewErrorMessage}>
          {required ? formFeildData[index]?.errorMessage : null}
        </p>
      </small>
    </div>
  );
};

export default CommonFileInput;
