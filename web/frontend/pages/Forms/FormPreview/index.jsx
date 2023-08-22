import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Grid,
  Heading,
  Layout,
  Page,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  Spinner,
  TextContainer,
  TextField,
  TextStyle,
} from "@shopify/polaris";
import { CustomInput } from "./CustomInput";
import { createSubmissions, getRecaptchaSettingsByAppId } from "../../../redux/actions/allActions";
import BannerCard from "./BannerCard";
import { allFieldsAreRequired, validation } from "../../../utils/validation";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./FormPreview.module.css";
import {
  addFormSubmission,
  setDateKeyName,
  updateEnableRecaptcha,
} from "../../../redux/reducers/inputFieldSlice";
import { setFormSubmitted } from "../../../redux/reducers/submissionSlice";
import "./Preview.css";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";

const FormPreview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formFeildData, setFormFeildData] = useState([]);
  const formSubmissionData = useSelector(
    (state) => state.inputField.formSubmissionData
  );
  const dateKeyName = useSelector((state) => state.inputField.dateKeyName);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [verfied, setVerifed] = useState(false);
  const formRef = useRef(null);
  const { editFormId } = useParams();
  const app = useAppBridge();
  const redirect = Redirect.create(app);


  const showMessage = useSelector(
    (state) => state.submission.submissionData?.showMessage
  );

  const googelRecaptcha = useSelector(
    (state) => state?.inputField?.googelRecaptcha
  );
  const recaptchaSettings = useSelector(
    (state) => state?.setting?.reCaptchaSettingData.data
  );
  const editFormData = useSelector((state) => state?.inputField?.editFormData);
  const formSubmitted = useSelector(
    (state) => state.submission.submissionData?.formSubmitted
  );

  const appId = useSelector((state) => state.appId.appId);
  const inputFields = useSelector((state) => state?.inputField?.inputFields);

  const submissionData = useSelector(
    (state) => state.submission.submissionData
  );

  const headerFieldData = useSelector(
    (state) => state?.inputField?.headerFieldData
  );

  const footerFieldData = useSelector(
    (state) => state?.inputField?.footerFieldData
  );

  const footerAlign = footerFieldData?.attributes?.footerAlign;

  const selectedViewPort = useSelector(
    (state) => state.viewPort.selectedViewport
  );

  const appearanceFields = useSelector(
    (state) => state.formSetting?.appearanceData?.appearanceFields
  );
  const selectedBackground =
    appearanceFields && appearanceFields?.appearanceBackground;

  const errorFields = useSelector(
    (state) => state?.formSetting?.validationData?.validationFields
  );

  const afterSubmitFields = useSelector(
    (state) => state.formSetting?.afterSubmitData?.afterSubmitFields
  );
  const selectedValue = afterSubmitFields?.submitAction;
  const redirectUrl = afterSubmitFields?.redirectUrl;

  useEffect(() => {
    if (inputFields.length) {
      let fieldArry = [...formFeildData];
      let formData = {};
      inputFields.forEach((input, index) => {
        let findIndex = fieldArry.findIndex(
          (item) => item.id === input.inputId
        );

        if (findIndex === -1) {
          let feildData = {
            id: input.inputId,
            feildId: `${input?.inputId}_${input.id}`,
            feildValue: input.attributes?.default_value || "",
            errorMessage: "",
            feildName: input.title,
            required: input?.attributes?.required,
          }
          if (input?.attributes?.confirmPassword) {
            fieldArry.push({
              ...feildData,
              confirmPassword: input?.attributes?.confirmPassword,
              confirmFeildId: `${input?.inputId}_confirm_${input.id}`
            });
          } else {
            fieldArry.push({
              ...feildData
            });
          }

          setFormFeildData([...fieldArry]);
        } else {
          const cloneData = [...formFeildData];
          cloneData.map((item) => {
            if (item.id === input.inputId) {
              item.errorMessage = input?.attributes?.required
                ? item?.errorMessage
                : "";
              item.required = input?.attributes?.required;
              if (input?.attributes?.confirmPassword) {
                item.confirmPassword = input?.attributes?.confirmPassword;
                item.confirmErrorMessage = input?.attributes?.required ? item?.confirmErrorMessage : "";
                item.errorMessage = input?.attributes?.required
                  ? item?.errorMessage
                  : "";
              }
            }
          });
          setFormFeildData(cloneData);
        }
        const unique_id = `${input?.inputId}_${input.id}`;
        formData = { ...formData, [unique_id]: input.attributes.default_value || "" }
        let value = formData[unique_id] || "";
        if (Array.isArray(input?.attributes?.default_value)) {
          if (!value) {
            value = [];
          }
          input?.attributes?.default_value?.forEach((item) => {
            let isInIndex = value.findIndex((e) => e.value === item.value);
            if (isInIndex === -1) {
              value.push(item);
            }
          });
        } else {
          value = input?.attributes?.isDefaultSelected
            ? input?.attributes?.isDefaultSelected
            : input?.attributes?.default_value
              ? input?.attributes?.default_value
              : formSubmissionData[unique_id];
        }
        formData = {
          ...formData,
          [unique_id]: value || "",
        };
        dispatch(addFormSubmission(formData));
        if (input.type === 'date') {
          dispatch(setDateKeyName(unique_id));
        }
      });

      const mapData = inputFields.map((input) => {
        return fieldArry.find((feild) => input.inputId === feild.id);
      });
      setFormFeildData(mapData); //set updated inputFields after removal of input
    }
    dispatch(
      updateEnableRecaptcha({
        formId: editFormData?.formData?._id,
        enable: editFormData?.formData?.enableRecaptcha,
      })
    );
    dispatch(getRecaptchaSettingsByAppId(appId));
  }, [dispatch, inputFields]);
  useEffect(() => {
    let cloneData = formFeildData.map((feild) => {
      if (feild.feildId === dateKeyName) {
        return {
          ...feild,
          feildValue: formSubmissionData[dateKeyName],
        };
      } else return feild;
    });
    setFormFeildData(cloneData);
  }, [formSubmissionData]);

  const handleDateTimeChange = (dateTime, name, id) => {
    const dateValue = dateTime;
    setSelectedDateTime(dateTime);
    let fieldArry = [...formFeildData];
    let fieldIndex = formFeildData.findIndex((item) => item.id === id);
    fieldArry[fieldIndex] = {
      ...fieldArry[fieldIndex],
      ["feildValue"]: dateValue,
      ["errorMessage"]: fieldArry[fieldIndex]?.required
        ? validation(
          fieldArry?.[fieldIndex]?.["feildName"],
          dateValue,
          errorFields
        )
        : "",
    };
    setFormFeildData([...fieldArry]);
    const formData = { ...formSubmissionData, [name]: dateValue };
    dispatch(addFormSubmission(formData));
  };

  const handleCaptchaChange = () => {
    setVerifed(true);
  };

  const handleChange = (event, confirmPassword) => {
    const { id, name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    if (!confirmPassword) {
      const formData = { ...formSubmissionData, [name]: inputValue }
      dispatch(addFormSubmission(formData));
    }

    let fieldArry = [...formFeildData];
    let fieldIndex = formFeildData.findIndex((item) => item.id === id);
    if (confirmPassword) {
      fieldArry[fieldIndex] = {
        ...fieldArry[fieldIndex],
        ['confirmFeildName']: name.replace(/^[a-z0-9]+_/, ''),
        ["confirmFeildValue"]: inputValue,
        ["confirmErrorMessage"]: fieldArry[fieldIndex]?.required
          ? validation(
            fieldArry?.[fieldIndex]?.["confirmFeildName"],
            inputValue,
            errorFields,
            fieldArry?.[fieldIndex]
          )
          : inputValue !== fieldArry?.[fieldIndex].feildValue ? errorFields?.["confirmedPasswordMatch"] : ""
      };
    } else {

      fieldArry[fieldIndex] = {
        ...fieldArry[fieldIndex],
        ["feildValue"]: inputValue,
        ["errorMessage"]: fieldArry[fieldIndex]?.required
          ? validation(
            fieldArry?.[fieldIndex]?.["feildName"],
            inputValue,
            errorFields
          )
          : "",
      };
    }
    setFormFeildData([...fieldArry]);
  };
  const handleFileChange = (event) => {
    const { id, name, files } = event.target;
    const fileList = Array.from(files);

    const fileData = fileList.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));

    let fieldArry = [...formFeildData];
    let fieldIndex = formFeildData.findIndex((item) => item.id === id);
    fieldArry[fieldIndex] = {
      ...fieldArry[fieldIndex],
      ["feildValue"]: fileData,
      ["errorMessage"]: fieldArry[fieldIndex]?.required
        ? validation(
          fieldArry?.[fieldIndex]?.["feildName"],
          fileList,
          errorFields
        )
        : "",
    };
    setFormFeildData([...fieldArry]);
    const formData = { ...formSubmissionData, [name]: fileData };
    dispatch(addFormSubmission(formData));
  };

  const handleCheckboxChange = (event) => {
    const { id, name, value, checked } = event.target;

    if (checked) {
      const data = [...formSubmissionData[name]];
      data.push({ label: value, value: value });
      let fieldArry = [...formFeildData];
      let fieldIndex = formFeildData.findIndex((item) => item.id === id);
      fieldArry[fieldIndex] = {
        ...fieldArry[fieldIndex],
        ["feildValue"]: data,
        ["errorMessage"]: fieldArry[fieldIndex]?.required
          ? validation(
            fieldArry?.[fieldIndex]?.["feildName"],
            value,
            errorFields
          )
          : "",
      };
      setFormFeildData([...fieldArry]);
      const formData = { ...formSubmissionData, [name]: data };
      dispatch(addFormSubmission(formData));
    } else {
      const data = [...formSubmissionData[name]];
      let fieldArry = [...formFeildData];
      let fieldIndex = formFeildData.findIndex((item) => item.id === id);
      fieldArry[fieldIndex] = {
        ...fieldArry[fieldIndex],
        ["feildValue"]: data.filter((item) => item.value !== value),
        ["errorMessage"]: fieldArry[fieldIndex]?.required
          ? validation(
            fieldArry?.[fieldIndex]?.["feildName"],
            value,
            errorFields
          )
          : "",
      };
      setFormFeildData([...fieldArry]);

      const formData = {
        ...formSubmissionData,
        [name]: data.filter((item) => item.value !== value),
      };
      dispatch(addFormSubmission(formData));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errorObj = {};
    const cloneData = [...formFeildData];
    let formData = {};
    formFeildData?.forEach((value) => {
      formData = { ...formData, [value.feildId]: "" }

      const error = validation(
        value?.["feildName"],
        value?.["feildValue"],
        errorFields
      );
      let confirm = "";
      if (value?.required && value?.confirmPassword) {
        confirm = validation(
          value?.["confirmFeildName"],
          value?.["confirmFeildValue"],
          errorFields,
          value
        );
      }
      if (value?.required && error) {
        errorObj[value?.["id"]] = error;
        if (value?.required && confirm) {
          errorObj[value?.['confirmFeildId']] = confirm
        }
      }
    });

    const isAllFieldsRequired = allFieldsAreRequired(Object.values(errorObj));

    if (isAllFieldsRequired) {
      dispatch(
        createSubmissions({ form: editFormId, submission: formSubmissionData })
      );
      dispatch(setFormSubmitted(true));
      const data = cloneData.map((feild) => {
        return { ...feild, feildValue: "", errorMessage: "", confirmErrorMessage: "" };
      });
      setFormFeildData(data);
      if (selectedValue === "clearForm" || selectedValue === "hideForm") {
        formRef.current.reset();
        dispatch(addFormSubmission({ ...formData }));
      } else if (selectedValue === "pageRedirect") {
        formRef.current.reset();
        redirect.dispatch(Redirect.Action.REMOTE, {
          url: `${redirectUrl}`,
          newContext: true,
        });
        dispatch(addFormSubmission({ ...formData }));
      }
    } else {
      let array = [];
      cloneData.forEach((value) => {
        if (value?.confirmPassword && value?.required) {
          array.push({
            ...value,
            errorMessage: value?.required ? errorObj[value?.["id"]] : "",
            confirmErrorMessage: value?.required || value?.confirmPassword ? errorObj[value?.['confirmFeildId']] : "",
          });
        } else
          array.push({
            ...value,
            errorMessage: value?.required ? errorObj[value?.["id"]] : "",
          });
      });
      setFormFeildData(array);
    }
  };

  const handleResetForm = () => {
    let formData = {};
    formFeildData.forEach((value) => {
      formData = { ...formData, [value.feildId]: "" }
    })
    dispatch(addFormSubmission({ ...formData }))
    formRef.current.reset();
  };

  const handleSelectText = (event) => {
    event.target.select();
  }

  return (
    <div className={styles.formContent}>
      {editFormData?.loading ? (
        <SkeletonPage>
          <Layout>
            <Layout.Section>
              <Card sectioned>
                <div className={styles.previewCard}>
                  <div className={styles.previewBox}>
                    <SkeletonBodyText />
                    <SkeletonBodyText />
                    <SkeletonBodyText />
                    <SkeletonBodyText />
                  </div>
                </div>
              </Card>
            </Layout.Section>
          </Layout>
        </SkeletonPage>
      ) : (
        <div className={styles.previewCard}>
          <div
            className={`${styles.previewBox} ${selectedViewPort === "mobile" ? styles.mobile : ""
              }`}
          >
            {inputFields?.length > 0 && (
              <div
                id="form_builder"
                className={`${styles.formBuilder} ${selectedViewPort === "mobile" ? styles.formBuilderMobile : ""
                  } ${selectedBackground === "image" && styles.formImageBackground
                  } `}
                style={{
                  maxWidth: appearanceFields?.appearanceWidth || "700px",
                  backgroundColor:
                    selectedBackground === "color"
                      ? appearanceFields?.formBackgroundColor
                      : selectedBackground === "none"
                        ? "#fff"
                        : "#fff",
                  backgroundImage:
                    selectedBackground === "image"
                      ? `url(${appearanceFields?.backgroundImageUrl})`
                      : "",
                  backgroundPosition: appearanceFields?.imageAlignment
                    ? appearanceFields?.imageAlignment === "middle"
                      ? `center`
                      : `${appearanceFields?.imageAlignment} `
                    : "top",
                }}
              >
                <form
                  ref={formRef}
                  name="submissionForm"
                  id="submissionForm"
                  className={styles.formContainer}
                  onSubmit={handleFormSubmit}
                  method="POST"
                  encType="multipart/form-data"
                  noValidate
                  style={{
                    display:
                      formSubmitted && selectedValue === "hideForm"
                        ? "none"
                        : "",
                  }}
                >
                  {headerFieldData &&
                    headerFieldData?.attributes?.showHeader && (
                      <div
                        className={styles.header}
                        style={{
                          color:
                            appearanceFields?.headingColor &&
                            appearanceFields?.headingColor,
                        }}
                      >
                        <h3
                          id={headerFieldData.id}
                          className={styles.formTitle}
                        >
                          {headerFieldData?.attributes?.title}
                        </h3>
                        <div
                          className={styles.headerDescription}
                          style={{
                            color:
                              appearanceFields?.descriptionColor &&
                              appearanceFields?.descriptionColor,
                          }}
                        >
                          {headerFieldData.attributes.description}
                        </div>
                      </div>
                    )}
                  <FormLayout>
                    <Grid>
                      {inputFields.map(
                        ({ id, title, type, attributes, inputId }, index) => {
                          const width = {
                            md: (selectedViewPort === "mobile" && 12) || (attributes?.column_width === "33%" ? 4 : attributes?.column_width === "50%" ? 6 : attributes?.column_width === "100%" && 12),
                            xl: (selectedViewPort === "mobile" && 12) || (attributes?.column_width === "33%" ? 4 : attributes?.column_width === "50%" ? 6 : attributes?.column_width === "100%" && 12),
                          }
                          return (
                            <Grid.Cell columnSpan={{ ...width }}>
                              <CustomInput
                                key={inputId}
                                {...{
                                  id,
                                  index,
                                  inputId,
                                  title,
                                  attributes,
                                  type,
                                  selectedDateTime,
                                  appearanceFields,
                                  handleDateTimeChange,
                                  formSubmissionData,
                                  handleCheckboxChange,
                                  handleFileChange,
                                  selectedViewPort,
                                  formFeildData,
                                }}
                                handleChange={handleChange}
                              />
                            </Grid.Cell>)
                        }
                      )}
                    </Grid >
                  </FormLayout>
                  {googelRecaptcha?.enable ? (
                    <div className={styles.captchaContainer}>
                      <div style={{ width: 0 }}>
                        <ReCAPTCHA
                          sitekey={`${recaptchaSettings?.siteKey}`}
                          onChange={handleCaptchaChange}
                        />
                      </div>
                    </div>
                  ) : null}
                  {footerFieldData && footerFieldData?.attributes && (
                    <>
                      <div
                        style={{
                          textAlign: footerFieldData?.attributes?.buttonWidth
                            ? "left"
                            : footerAlign,
                        }}
                      >
                        <div className={styles.footerDescription}>
                          <Heading element="h5" id={footerFieldData.id}>
                            <span
                              dangerouslySetInnerHTML={{
                                __html: footerFieldData.attributes.text,
                              }}
                            />
                          </Heading>
                        </div>

                        <button
                          type="submit"
                          className={`${styles.classicButton} ${styles.submitButton
                            }
                            ${footerFieldData?.attributes?.buttonWidth
                              ? styles.buttonWidth
                              : `${styles.classicButton}${styles.submitButton}`
                            } ${submissionData.loading && styles.loadingBtn}`}
                          style={{
                            backgroundColor:
                              appearanceFields?.mainColor &&
                              appearanceFields?.mainColor,
                            border: "none",
                          }}
                        >
                          {submissionData.loading ? (
                            <Spinner size="small" />
                          ) : (
                            footerFieldData.attributes.submitButton
                          )}
                        </button>
                        {footerFieldData.attributes.resetButton ? (
                          <button
                            type="button"
                            className={`${styles.classicButton} 
                              ${footerFieldData?.attributes?.buttonWidth
                                ? styles.buttonWidth
                                : styles.classicButton
                              }`}
                            onClick={handleResetForm}
                          >
                            {footerFieldData.attributes.resetButtonText}
                          </button>
                        ) : null}
                      </div>
                    </>
                  )}
                </form>
                {formSubmitted && showMessage && (
                  <div style={{ marginTop: "10px" }}>
                    <BannerCard />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(FormPreview);
