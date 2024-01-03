import React from "react";
import styles from "./FormPreview.module.css";
import CustomDatePicker from "./CustomDatePicker";

const CommonDateInput = ({
  id,
  inputId,
  title,
  index,
  type,
  attributes,
  selectedDateTime,
  handleDateTimeChange,
  formSubmissionData,
  inputStyles,
  widthInput,
  appearanceFields,
  selectedViewPort,
  formFeildData,
  ...props
}) => {
  const {
    label,
    placeholder,
    description,
    required,
    hideLabel,
    dateTimeFormat,
    dateFormat,
    timeFormat,
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
      <CustomDatePicker
        // value={selectedDateTime}
        id={inputId}
        name={`${inputId}_${id}`}
        option={dateTimeFormat}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        placeholder={placeholder}
        width={widthInput}
        inputStyles={inputStyles}
        value={formSubmissionData[`${inputId}_${id}`]}
        handleDateTimeChange={handleDateTimeChange}
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

export default CommonDateInput;
