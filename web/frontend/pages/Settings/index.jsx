import { useState, useEffect } from "react";
import {
  Form,
  FormLayout,
  TextField,
  Button,
  Card,
  Page,
  Select,
  Grid,
  Heading,
  Layout,
  Icon,
  LegacyCard,
} from "@shopify/polaris";
import {
  createSMTPSettings,
  editSmtpSettings,
  getSmtpSettingByAppId,
} from "../../redux/actions/allActions";
import { useDispatch, useSelector } from "react-redux";
import { Toast, Frame } from "@shopify/polaris";
import { ToastContainer, toast } from "react-toastify";
import { Icons, validateTextField } from "../../constant";
import styles from "./Settings.module.css";

function Settings() {
  const [formValues, setFormValues] = useState({
    smtpName: "",
    email: "",
    password: "",
    mail_encryption: "",
    port: "",
    shopId: "",
  });
  const dispatch = useDispatch();

  const settingData = useSelector((state) => state?.setting?.settingData);
  const smtpSettingData = useSelector(
    (state) => state?.setting?.smtpSettingData?.data
  );
  const isEdit = useSelector(
    (state) => state?.setting?.smtpSettingData?.isEdit
  );
  const shopId = useSelector((state) => state.shopId.shopId);
  const [showValidation, setShowValidation] = useState(false);

  const [errorValues, setErrorValues] = useState({});

  const [selectedSetting, setSelectedSetting] = useState("smtp");

  const handleChange = (name, value) => {
    let formVal = {};
    formVal = { ...formValues, port: value === "ssl" ? 465 : value === "tls" ? 587 : "", [name]: value }
    if (showValidation)
      setErrorValues(validateTextField(formVal));
    setFormValues({
      ...formValues,
      [name]: value,
      port: value === "ssl" ? 465 : value === "tls" ? 587 : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formValues.smtpName ||
      !formValues.email ||
      !formValues.password ||
      !formValues.mail_encryption ||
      !formValues.port
    ) {
      setShowValidation(true)
      setErrorValues(validateTextField(formValues));
    } else {
      if (isEdit || settingData?.isEdit) {
        setShowValidation(false)
        dispatch(editSmtpSettings(formValues));
      } else {
        setShowValidation(false)
        dispatch(createSMTPSettings(formValues));
        setErrorValues({});
      }
    }
  };

  useEffect(() => {
    setFormValues({ ...formValues, shopId: shopId });
    dispatch(getSmtpSettingByAppId(shopId));
  }, [dispatch]);

  useEffect(() => {
    if (isEdit || settingData?.isEdit) {
      setFormValues({
        email: smtpSettingData.email,
        smtpName: smtpSettingData.smtpName,
        password: smtpSettingData.password,
        mail_encryption: smtpSettingData.mail_encryption,
        port: smtpSettingData.port,
        shopId: smtpSettingData.shopId,
      });
    }
  }, [smtpSettingData]);

  const mailEncOptions = [
    { label: "Choose Option", value: "" },
    { label: "TLS", value: "tls" },
    { label: "SSL", value: "ssl" },
  ];

  return (
    <Frame>
      <Page fullWidth title="Settings">
        <div>
          <Layout>
            <div>
              <Layout.Section>
                <LegacyCard sectioned>
                  <div
                    className={`${styles.submissions} ${selectedSetting === "smtp" ? styles.active : ""
                      }`}
                    onClick={() => setSelectedSetting("smtp")}
                  >
                    <div style={{ marginRight: 4 }}>
                      <Icon source={Icons.settingFile} />
                    </div>
                    <Heading>SMTP Settings</Heading>
                  </div>
                </LegacyCard>
              </Layout.Section>
            </div>
            <Layout.Section>
              {selectedSetting === "smtp" && (
                <div className={styles.formLayoutContainer}>
                  <LegacyCard sectioned>
                    <Form onSubmit={(e) => handleSubmit(e)} noValidate>
                      <FormLayout>
                        <Grid>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}
                          >
                            <TextField
                              id="smtpName"
                              name="smtpName"
                              value={
                                settingData.smtpName || formValues.smtpName
                              }
                              onChange={(value) =>
                                handleChange("smtpName", value)
                              }
                              label="SMTP"
                              type="text"
                              autoComplete="off"
                              requiredIndicator
                              error={errorValues.smtpName}
                            />
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}
                          >
                            <TextField
                              value={formValues.email || ""}
                              name="email"
                              onChange={(value) => handleChange("email", value)}
                              label="Username/Email address"
                              type="text"
                              autoComplete="off"
                              requiredIndicator
                              error={errorValues.email}
                            />
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}
                          >
                            <TextField
                              value={formValues.password || ""}
                              name="password"
                              onChange={(value) =>
                                handleChange("password", value)
                              }
                              label="Password/App password"
                              type="password"
                              autoComplete="off"
                              requiredIndicator
                              error={errorValues.password}
                            />
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}
                          >
                            <Select
                              label="Mail encryption"
                              name="mail_encryption"
                              options={mailEncOptions}
                              onChange={(value) =>
                                handleChange("mail_encryption", value)
                              }
                              value={formValues.mail_encryption || ""}
                              requiredIndicator
                              error={errorValues.mail_encryption}
                            />
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 6 }}
                          >
                            <TextField
                              value={formValues.port || ""}
                              name="port"
                              onChange={(value) => handleChange("port", value)}
                              label="Port"
                              type="text"
                              autoComplete="off"
                              requiredIndicator
                              error={errorValues.port}
                            />
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}
                          >
                            <Button
                              submit
                              primary
                              loading={settingData?.loading}
                            >
                              {`${isEdit || settingData?.isEdit
                                ? "Update"
                                : "Save"
                                }`}
                            </Button>
                          </Grid.Cell>
                        </Grid>
                      </FormLayout>
                    </Form>
                    <ToastContainer />
                  </LegacyCard>
                </div>
              )}
            </Layout.Section>
          </Layout>
        </div>
      </Page>
    </Frame>
  );
}

export default Settings;
