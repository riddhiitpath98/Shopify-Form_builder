import { useEffect, useState } from "react";
import {
  Form,
  FormLayout,
  TextField,
  Button,
  Page,
  Grid,
  Heading,
  Layout,
  LegacyCard,
} from "@shopify/polaris";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from "react-toastify";
import styles from "./ContactUsForm.module.css";
import { validateTextField } from "../../constant";
import { contactUs } from "../../redux/actions/allActions";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  subjectLine: "",
  message: "",
}

function ContactUsForm() {
  const shopId = useSelector((state) => state.shopId.shopId)
  const [formValues, setFormValues] = useState({
    ...initialState,
    shopId: shopId
  });
  const [errorValues, setErrorValues] = useState(initialState);
  const contactUsData = useSelector((state) => state?.support?.contactUsData);
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    setErrorValues({ ...errorValues, [name]: validateTextField(name, value) });
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    const errorMessages = {};
    const { shopId, ...data } = formValues
    Object.keys(data).forEach(val => {
      const error = validateTextField(val, data[val])
      if (error) {
        errorMessages[val] = error
      }
    })
    if (Object.keys(errorMessages).length) {
      setErrorValues(errorMessages)
      return
    }
    dispatch(contactUs(formValues));
    // dispatch(createFormToAPIsettings({ ...formValues, shopId }));
    setFormValues({ shopId: shopId });
  };

  return (
    <Page fullWidth title="Contact Us">
      <div>
        <Layout>
          <Layout.Section>
            <div className={styles.ipsContactusFormLayoutContainer}>
              <LegacyCard sectioned>
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
              </LegacyCard>
            </div>
          </Layout.Section>
        </Layout>
      </div>
    </Page>
  );
}

export default ContactUsForm;
