import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  FormLayout,
  Grid,
  Layout,
  LegacyCard,
  Page,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { ToastContainer } from "react-toastify";
import { validateTextField } from "../../constant";
import styles from "./AnyAPIIntegration.module.css";
import { createFormToAPIsettings, fetchFormData } from "../../redux/actions/allActions";

const AnyAPIIntegration = () => {
  const dispatch = useDispatch();
  const [formElementData, setFormElementData] = useState([]);
  const [elementsValue, setElementsValue] = useState({});
  const [error, setError] = useState({});
  const [formValues, setFormValues] = useState({
    apiTitle: "",
    apiUrl: "",
    headerRequest: "",
    inputType: "",
    method: "",
    formId: "",
    shopId: ""
  });
  const [errorValues, setErrorValues] = useState({});
  const apiSettingData = useSelector((state) => state?.apiSettingData);
  const shopId = useSelector((state) => state.shopId.shopId);
  const [showValidation, setShowValidation] = useState(false);

  const formData = useSelector(
    (state) => state?.inputField?.finalFormData?.formData
  );


  const getElementDataByFormId = (formId) => {
    const selectedForm = formData.find((form) => form._id === formId);

    if (selectedForm) {
      const elementData = selectedForm.customForm.find((data) => data.element);
      if (elementData) {
        return elementData.element;
      }
    }
    return null;
  };

  useEffect(() => {
    dispatch(fetchFormData(shopId));
  }, [dispatch, shopId])

  useEffect(() => {

    setFormValues({
      ...formValues,
      shopId: shopId,

      elementKey: elementsValue
    })
  }, [elementsValue])

  const chackValidation = (name, value) => {
    if (!name || !value) {
      return 'This field is required.'
    } else return ''
  }

  const handleChange = (name, value, isExec = false) => {
    let formVal = {};
    formVal = { ...formValues, [name]: value };

    if (name === "formId") {
      const selectedFormId = value;
      const elementData = getElementDataByFormId(selectedFormId);
      if (elementData) {
        setFormElementData(elementData);
        let form_fields = {};
        elementData.forEach(item => {
          form_fields[`${item?.inputId}_${item.id}`] = ''
        })
        setElementsValue({ ...form_fields })
      }
    }

    if (!isExec && showValidation) {
      setErrorValues(validateTextField(formVal))
    }

    !isExec && setFormValues({
      ...formValues,
      [name]: value,
    });
    isExec && setElementsValue({
      ...elementsValue, [name]: value
    })
    isExec && setError({
      ...error, [name]: chackValidation(name, value)
    })

  };

  const formTitleData = [];
  const formTitle = useMemo(() => {
    formData?.map((data) => {
      data?.customForm?.forEach((formData) => {
        formData.formTitle &&
          formTitleData.push({ id: data._id, title: formData.formTitle });
      });
    });
    return formTitleData;
  }, [formData?.length]);

  const formTitleOptions = [
    { label: 'Select Form', value: '', disabled: true },
    ...formTitle.map((title) => ({
      label: title.title,
      value: title.id,
    })),
  ];
  const inputTypeOptions = [
    { label: "Select Type", value: "", disabled: true },
    { label: "json", value: "json" },
  ];

  const methodOptions = [
    { label: "Select Method", value: "", disabled: true },
    { label: "GET", value: "get" },
    { label: "POST", value: "post" },
  ];

  const handleSubmit = async (event) => {
    let errorMessages = {}
    let wholeData = { ...elementsValue, ...formValues }
    Object.keys(wholeData).forEach(val => {
      const message = chackValidation(val, wholeData[val])
      if (message) {
        errorMessages[val] = message
      }
    })


    if (Object.keys(errorMessages).length) {
      setError({ ...errorMessages, ...error });
      setErrorValues({ ...errorMessages })
      setShowValidation(true);
      return
    }

    dispatch(createFormToAPIsettings(formValues));
    setShowValidation(false);
    setFormValues({});
    setElementsValue({});
    setErrorValues({});
  };

  return (
    <Page fullWidth title="Contact Form with API settings">
      <div>
        <Layout>
          <Layout.Section>
            <div className={styles.formLayoutContainer}>
              <LegacyCard sectioned>
                <Form onSubmit={(event) => handleSubmit(event)} noValidate >
                  <FormLayout>
                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}>
                        <Text variant="headingLg" as="h5">
                          Add API Title
                        </Text>
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}>
                        <TextField
                          value={formValues.apiTitle || ""}
                          name="apiUrl"
                          onChange={(value) => handleChange("apiTitle", value)}
                          label="Add API title"
                          type="text"
                          requiredIndicator
                          error={errorValues.apiTitle}
                          autoComplete="off"
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                        <Select
                          label="Select Contact Form"
                          name="formId"
                          options={formTitleOptions}
                          onChange={(value) => handleChange("formId", value)}
                          value={formValues.formId || ""}
                          error={errorValues.formId}
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                        <TextField
                          value={formValues.apiUrl || ""}
                          name="apiUrl"
                          onChange={(value) => handleChange("apiUrl", value)}
                          label="API Url"
                          type="text"
                          requiredIndicator
                          error={errorValues.apiUrl}
                          autoComplete="off"
                        />
                      </Grid.Cell>

                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                        <TextField
                          value={formValues.headerRequest || ""}
                          name="headerRequest"
                          onChange={(value) =>
                            handleChange("headerRequest", value)
                          }
                          label="Header Request"
                          type="headerRequest"
                          multiline={5}
                          requiredIndicator
                          error={errorValues.headerRequest}
                          autoComplete="off"
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                        <Select
                          label="Input Type"
                          name="inputType"
                          options={inputTypeOptions}
                          onChange={(value) => handleChange("inputType", value)}
                          value={formValues.inputType || ""}
                          error={errorValues.inputType}
                        />
                      </Grid.Cell>

                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}>
                        <Select
                          label="Method"
                          name="method"
                          options={methodOptions}
                          onChange={(value) => handleChange("method", value)}
                          value={formValues.method || ""}
                          error={errorValues.method}
                        />
                      </Grid.Cell>

                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}>
                        <Text>Map your Fields</Text>
                      </Grid.Cell>

                      {formElementData && formElementData?.length > 0
                        ? formElementData?.map((element) => (
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}
                          >
                            <TextField
                              value={elementsValue[`${element.inputId}_${element.id}`] || ""}
                              name={`${element.inputId}_${element.id}`}
                              onChange={(value) =>
                                handleChange(`${element.inputId}_${element.id}`, value, true)
                              }
                              label={element.attributes.label}
                              type="text"
                              placeholder="Enter mapping key field name"
                              requiredIndicator
                              autoComplete="off"
                              error={error[`${element.inputId}_${element.id}`]}
                            />
                          </Grid.Cell>
                        ))
                        : null}

                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}>
                        <Button primary submit >
                          Submit
                        </Button>
                      </Grid.Cell>
                    </Grid>
                  </FormLayout>
                  <ToastContainer />
                </Form>
              </LegacyCard>
            </div>
          </Layout.Section>
        </Layout>
      </div>
    </Page>
  );
};

export default AnyAPIIntegration;
