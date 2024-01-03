import React from "react";
import styles from "./FormPreview.module.css";

const CommonTextarea = ({
  id,
  inputId,
  title,
  index,
  type,
  attributes,
  selectedDateTime,
  handleChange,
  inputStyles,
  widthInput,
  handleDateTimeChange,
  handleCheckboxChange,
  appearanceFields,
  selectedViewPort,
  formFeildData,
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
    resizeTextarea,
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
      <textarea
        placeholder={placeholder}
        id={inputId}
        rows={3}
        name={`${inputId}_${id}`}
        className={styles.ipsFormPreviewInputClassicInput}
        required={""}
        maxLength={limit_chars ? limit_chars_count : undefined}
        style={{
          ...inputStyles,
          width: widthInput,
          resize: resizeTextarea ? "vertical" : "none",
          maxHeight: "200px",
          minHeight: "80px",
        }}
        onChange={handleChange}
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

export default CommonTextarea;
