import React from "react";
import styles from "./FormPreview.module.css";

const CommonPassword = ({
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
  formSubmissionData,
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
    allowMultiple,
    confirmPassword,
    confirmPasswordLabel,
    confirmPasswordPlaceholder,
    confirmPasswordDescription,
  } = attributes || {};
  return (
    <>
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
          placeholder={placeholder}
          autoComplete="off"
          required={""}
          value={formSubmissionData[`${inputId}_${id}`]}
          maxLength={limit_chars ? limit_chars_count : undefined}
          style={{ ...inputStyles, width: widthInput }}
          {...(allowMultiple ? { multiple: true } : {})}
          onChange={(event) => handleChange(event)}
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

      {confirmPassword && (
        <div className={styles.ipsFormPreviewInputContainer}>
          <label
            htmlFor={inputId}
            className={styles.ipsFormPreviewInputClassicLabel}
            style={{
              color:
                appearanceFields?.labelColor && appearanceFields?.labelColor,
            }}
          >
            {hideLabel ? "" : confirmPasswordLabel}
          </label>
          <span className={styles.ipsFormPreviewTextRequired}> {required ? " *" : ""}</span>
          <br />
          <input
            type={type}
            id={inputId}
            className={styles.ipsFormPreviewInputClassicInput}
            name={`${inputId}_confirm_${id}`}
            placeholder={confirmPasswordPlaceholder}
            autoComplete="off"
            required={""}
            maxLength={limit_chars ? limit_chars_count : undefined}
            style={{ ...inputStyles, width: widthInput }}
            {...(allowMultiple ? { multiple: true } : {})}
            onChange={(event) => handleChange(event, confirmPassword)}
          />
          <span className={styles.description}>
            {confirmPasswordDescription}
          </span>
          <small>
            <p className={styles.ipsFormPreviewErrorMessage}>
              {required ? formFeildData[index]?.confirmErrorMessage : null}
            </p>
          </small>
        </div>
      )}
    </>
  );
};

export default CommonPassword;
