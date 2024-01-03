import { useDispatch, useSelector } from "react-redux";
import styles from "./FormPreview.module.css";
import "./Preview.css";
import { useEffect } from "react";
import {
  addFormSubmission,
  setDateKeyName,
} from "../../../redux/reducers/inputFieldSlice";

import CommonTextFeild from "./CommonTextFeild";
import CommonFileInput from "./CommonFileInput";
import CommonPassword from "./CommonPassword";
import CommonTextarea from "./CommonTextarea";
import CommonDateInput from "./CommonDateInput";

export const CustomInput = ({
  id,
  inputId,
  title,
  index,
  type,
  attributes,
  selectedDateTime,
  handleChange,
  handleDateTimeChange,
  handleCheckboxChange,
  handleFileChange,
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
    options,
    radio_options,
    hideLabel,
    allowedExtensions,
    hiddenValue,
    dataType,
    no_of_options,
    text,
    heading,
    caption,
    dateTimeFormat,
    dropdown_options,
    default_value,
    htmlCode,
  } = attributes || {};
  const noOfOptions = parseInt(no_of_options?.[0]);
  const acceptExtensions = allowedExtensions
    ?.map((extension) => `.${extension.value}`)
    .join(",");

  const inputWidth = 100 / noOfOptions + "%";

  const widthInput = "100%";

  let inputStyles = {};
  const selectedValue = appearanceFields && appearanceFields?.appearanceStyle;
  if (selectedValue === "classicRounded" || selectedValue === "flatRounded") {
    inputStyles = { borderRadius: "20px" };
  } else if (selectedValue === "flat") {
    inputStyles = { boxShadow: "none" };
  }

  const formSubmissionData = useSelector(
    (state) => state.inputField.formSubmissionData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const name = `${inputId}_${id}`;
    if (Object.keys(formSubmissionData).includes(name)) {
      dispatch(setDateKeyName(name));
    }
  }, [dateTimeFormat]);

  switch (type) {
    case "text":
    case "email":
    case "number":
      return (
        <CommonTextFeild
          {...{
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
            handleChange,
            formFeildData,
            ...props,
          }}
        />
      );
    case "password":
      return (
        <CommonPassword
          {...{
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
            handleChange,
            formFeildData,
            ...props,
          }}
        />
      );
    case "textarea":
      return (
        <CommonTextarea
          {...{
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
            handleChange,
            formFeildData,
            ...props,
          }}
        />
      );
    case "checkbox":
      if (id === "accept_terms") {
        return (
          <div className={styles.ipsFormPreviewInputContainer}>
            <div
              style={{ width: widthInput }}
              className={styles.ipsFormPreviewInputCheckboxWrapper}
            >
              <input
                className={styles.ipsFormPreviewInputCheckboxInput}
                id={inputId}
                type={type}
                name={`${inputId}_${id}`}
                onChange={(event) => handleChange(event)}
              />
              <label
                className={`${styles.ipsFormPreviewInputCheckboxLabel} accept-terms-checkbox-label`}
                htmlFor={inputId}
              >
                <span
                  className={styles.ipsPreviewDescription}
                  style={{
                    color:
                      appearanceFields?.labelColor &&
                      appearanceFields?.labelColor,
                  }}
                  dangerouslySetInnerHTML={{ __html: label }}
                />
              </label>
              <span className={styles.ipsFormPreviewTextRequired}>
                {" "}
                {required ? " *" : ""}
              </span>
            </div>
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
      } else {
        return (
          <>
            <div className={styles.ipsFormPreviewInputContainer}>
              <label
                htmlFor={inputId}
                className={styles.ipsFormPreviewInputClassicLabel}
                style={{
                  color:
                    appearanceFields?.labelColor &&
                    appearanceFields?.labelColor,
                }}
              >
                {hideLabel ? "" : label}
              </label>
              <span className={styles.ipsFormPreviewTextRequired}>
                {" "}
                {required ? " *" : ""}
              </span>
              <ul
                style={{
                  listStyleType: "none",
                  margin: 0,
                  padding: 0,
                  width: widthInput,
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {options?.map((option) => (
                  <li style={{ width: inputWidth }} key={option.value}>
                    <div className={styles.ipsFormPreviewInputCheckboxWrapper}>
                      <label
                        className={styles.ipsFormPreviewInputCheckboxLabel}
                        style={{
                          color:
                            appearanceFields?.optionColor &&
                            appearanceFields?.optionColor,
                        }}
                      >
                        <input
                          className={styles.ipsFormPreviewInputCheckboxInput}
                          type={type}
                          value={option.value}
                          id={inputId}
                          name={`${inputId}_${id}`}
                          checked={
                            formSubmissionData[`${inputId}_${id}`] &&
                            formSubmissionData[`${inputId}_${id}`]?.some(
                              (val) => val.value === option.value
                            )
                          }
                          onChange={(event) => handleCheckboxChange(event)}
                        />
                        {option.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
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
          </>
        );
      }

    case "radio":
      return (
        <>
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
            <ul
              style={{
                listStyleType: "none",
                margin: 0,
                padding: 0,
                width: widthInput,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {radio_options?.map((option) => (
                <li key={option.value} style={{ width: inputWidth }}>
                  <div className={styles.ipsFormPreviewInputCheckboxWrapper}>
                    <label
                      className={styles.ipsFormPreviewInputCheckboxLabel}
                      style={{
                        color:
                          appearanceFields?.optionColor &&
                          appearanceFields?.optionColor,
                      }}
                    >
                      <input
                        className={styles.ipsFormPreviewInputCheckboxInput}
                        type={type}
                        id={inputId}
                        name={`${inputId}_${id}`}
                        checked={
                          formSubmissionData[`${inputId}_${id}`] ===
                          option.value
                        }
                        defaultChecked={default_value}
                        value={option.value}
                        onChange={(event) => handleChange(event)}
                      />

                      {option.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
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
        </>
      );
    case "file":
      return (
        <CommonFileInput
          {...{
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
            ...props,
          }}
        />
      );
    case "date":
      return (
        <CommonDateInput
          {...{
            id,
            inputId,
            type,
            formSubmissionData,
            appearanceFields,
            handleDateTimeChange,
            title,
            index,
            attributes,
            inputStyles,
            widthInput,
            handleChange,
            formFeildData,
            ...props,
          }}
        />
      );
    case "select":
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
          <select
            name={`${inputId}_${id}`}
            id={inputId}
            className={styles.ipsFormPreviewInputClassicInput}
            defaultValue={default_value}
            value={formSubmissionData[`${inputId}_${id}`]}
            style={{ ...inputStyles, width: widthInput }}
            onChange={(event) => handleChange(event)}
          >
            <option value="" disabled selected>
              {placeholder}
            </option>
            {dropdown_options?.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
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

    case "hidden":
      return (
        <div
          className={styles.ipsFormPreviewInputContainer}
          style={{ display: "none", visibility: "hidden", width: widthInput }}
        >
          <label htmlFor={inputId} className={styles.ipsFormPreviewInputClassicLabel}>
            <span data-label="Hidden">{label}</span>
          </label>

          <input
            type={type}
            data-type={dataType}
            id={inputId}
            name={`${inputId}_${id}`}
            value={hiddenValue}
          />
        </div>
      );
    case "editor":
      return (
        <div className={styles.ipsFormPreviewInputContainer}>
          <div
            className={styles.ipsFormPreviewParagraphInput}
            style={{
              width: widthInput,
              color:
                appearanceFields?.paragraphColor &&
                appearanceFields?.paragraphColor,
              background:
                appearanceFields?.paragraphBackgroundColor &&
                appearanceFields?.paragraphBackgroundColor,
            }}
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </div>
      );
    case "heading":
      return (
        <div className={styles.ipsFormPreviewInputContainer}>
          <h3
            className={styles.ipsFormPreviewHeadingTitle}
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p
            className={styles.ipsFormPreviewHeadingCaption}
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        </div>
      );
    case "HTML":
      return (
        <div className={styles.ipsFormPreviewInputContainer}>
          <div
            dangerouslySetInnerHTML={{ __html: htmlCode ? htmlCode : caption }}
          />
        </div>
      );
    default:
      return null;
  }
};
