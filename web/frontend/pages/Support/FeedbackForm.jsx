import { useAppBridge } from "@shopify/app-bridge-react";
import {
  Button,
  LegacyCard,
  Form,
  FormLayout,
  Grid,
  Heading,
  Label,
  Layout,
  Page,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import styles from "./ContactUsForm.module.css";
import { addFeedback } from "../../redux/actions/allActions";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "../../components/StarRating";
import { ToastContainer } from "react-toastify";
import { validateTextField } from "../../constant";

const initialState = {
  name: "",
  websiteName: "",
  email: "",
  contactNumber: "",
  message: "",
  rating: 1
}

const FeedbackForm = () => {

  const shopId = useSelector((state) => state.shopId.shopId)

  const [formValues, setFormValues] = useState({ ...initialState, shopId });
  const [errorValues, setErrorValues] = useState(initialState);
  const feedbackData = useSelector((state) => state?.support?.feedbackData);
  const dispatch = useDispatch();

  const handleChange = (name, value) => {
    let formVal = {};
    formVal = { ...formValues, [name]: value }
    setErrorValues({
      ...errorValues, [name]: validateTextField(name, value)
    })
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleRateChange = (e, rating) => {
    setFormValues({
      ...formValues,
      rating: rating,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const errorMessages = {};

    Object.keys(formValues).forEach(val => {
      const error = validateTextField(val, formValues[val])
      if (error) {
        errorMessages[val] = error
      }
    })

    if (Object.keys(errorMessages).length) {
      setErrorValues(errorMessages)
      return
    }

    dispatch(addFeedback(formValues));
    setFormValues({ shopId: shopId });
  };

  return (
    <Page fullWidth title="Feedback">
      <div>
        <Layout>
          <Layout.Section>
            <div className={styles.formLayoutContainer}>
              <LegacyCard sectioned>
                <Form onSubmit={handleSubmit} noValidate>
                  <FormLayout>
                    <Grid>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                        <TextField
                          id="name"
                          name="name"
                          value={formValues.name || ""}
                          onChange={(value) => handleChange("name", value)}
                          label="Name"
                          type="text"
                          requiredIndicator
                          error={errorValues.name}
                          autoComplete="off"
                        />
                      </Grid.Cell>
                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                        <TextField
                          value={formValues.websiteName || ""}
                          name="websiteName"
                          onChange={(value) =>
                            handleChange("websiteName", value)
                          }
                          label="Website/Company Name"
                          type="text"
                          requiredIndicator
                          error={errorValues.websiteName}
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

                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                        <Label id="rating" children="Rating" />
                        <StarRating name="rating" rating={formValues.rating} handleRateChange={handleRateChange} />
                      </Grid.Cell>

                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}>
                        <TextField
                          value={formValues.message || ""}
                          name="message"
                          onChange={(value) => handleChange("message", value)}
                          label="Message"
                          type="textarea"
                          multiline={4}
                          requiredIndicator
                          error={errorValues.message}
                          autoComplete="off"
                        />
                      </Grid.Cell>

                      <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}>
                        <Button submit primary loading={feedbackData?.loading}>
                          Submit
                        </Button>
                      </Grid.Cell>
                    </Grid>
                  </FormLayout>
                </Form>
                <ToastContainer />
              </LegacyCard>
            </div>
          </Layout.Section>
        </Layout>
      </div>
    </Page>
  );
};

export default FeedbackForm;
