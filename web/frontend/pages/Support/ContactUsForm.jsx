import { useEffect, useState } from "react";
import {
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
  Page,
  Grid,
  Heading,
  Layout,
} from "@shopify/polaris";
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from "../../redux/actions/allActions";
import { ToastContainer } from "react-toastify";
import styles from "./ContactUsForm.module.css";
import { validateTextField } from "../../constant";

function ContactUsForm() {
  const appId = useSelector((state) => state.appId.appId)
  const [showValidation, setShowValidation] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    subjectLine: "",
    message: "",
    appId: appId
  });
  const [errorValues, setErrorValues] = useState({});
  const contactUsData = useSelector((state) => state?.support?.contactUsData);
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    let formVal = {};
    formVal = { ...formValues, [name]: value }
    if (showValidation)
      setErrorValues(validateTextField(formVal));
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formValues.firstName ||
      !formValues.lastName ||
      !formValues.email ||
      !formValues.contactNumber ||
      !formValues.subjectLine ||
      !formValues.message
    ) {
      setShowValidation(true)
      setErrorValues(validateTextField(formValues));
    } else if (errorValues.firstName ||
      errorValues.lastName ||
      errorValues.email ||
      errorValues.contactNumber ||
      errorValues.subjectLine ||
      errorValues.message) {
      setShowValidation(true)
      setErrorValues(validateTextField(formValues));
    } else {
      setShowValidation(false)
      dispatch(contactUs(formValues));
      setFormValues({
        appId: appId
      })
      setErrorValues({});
    }
  };

  return (
    <Page fullWidth title="Contact Us">
      <div>
        <Layout>
          <Layout.Section>
            <div className={styles.formLayoutContainer}>
              <Card sectioned>
                <Form onSubmit={handleSubmit} noValidate>
                  <FormLayout>
                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                        <TextField
                          id="firstName"
                          name="firstName"
                          value={formValues.firstName || ""}
                          onChange={(value) => handleChange("firstName", value)}
                          label="First Name"
                          type="text"
                          requiredIndicator
                          error={errorValues.firstName}
                          autoComplete="off"
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                        <TextField
                          value={formValues.lastName || ""}
                          name="lastName"
                          onChange={(value) => handleChange("lastName", value)}
                          label="Last Name"
                          type="text"
                          requiredIndicator
                          error={errorValues.lastName}
                          autoComplete="off"
                        />
                      </Grid.Cell>

                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                        <TextField
                        
                          value={formValues.email || ""}
                          name="email"
                          onChange={(value) => handleChange("email", value)}
                          label="Email ID"
                          type="email"
                          requiredIndicator
                          error={errorValues.email}
                          autoComplete="off"
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                        <TextField
                          value={formValues.contactNumber || ""}
                          name="contactNumber"
                          onChange={(value) =>
                            handleChange("contactNumber", value)
                          }
                          label="Contact Number"
                          type="text"
                          requiredIndicator
                          error={errorValues.contactNumber}
                          autoComplete="off"
                        />
                      </Grid.Cell>

                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}>
                        <TextField
                          value={formValues.subjectLine || ""}
                          name="subjectLine"
                          onChange={(value) =>
                            handleChange("subjectLine", value)
                          }
                          label="Subject Line"
                          type="text"
                          requiredIndicator
                          error={errorValues.subjectLine}
                          autoComplete="off"
                        />
                      </Grid.Cell>

                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}>
                        <TextField
                          value={formValues.message || ""}
                          name="message"
                          onChange={(value) => handleChange("message", value)}
                          label="Message"
                          type="text"
                          multiline={4}
                          requiredIndicator
                          error={errorValues.message}
                          autoComplete="off"
                        />
                      </Grid.Cell>

                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}>
                        <Button submit primary loading={contactUsData?.loading}>
                          Submit
                        </Button>
                      </Grid.Cell>
                    </Grid>
                  </FormLayout>
                  <ToastContainer />
                </Form>
              </Card>
            </div>
          </Layout.Section>
        </Layout>
      </div>
    </Page>
  );
}

export default ContactUsForm;
