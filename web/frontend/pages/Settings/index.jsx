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
  getRecaptchaSettingsByAppId,
  createRecaptchaSettings,
  editSmtpSettings,
  getSmtpSettingByAppId,
} from "../../redux/actions/allActions";
import { useDispatch, useSelector } from "react-redux";
import { Toast, Frame } from "@shopify/polaris";
import { ToastContainer, toast } from "react-toastify";
import { Icons, validateTextField } from "../../constant";
import styles from "./Settings.module.css";
import { getRestrictionWithPlan } from "../../utils/function";

function Settings() {
  const [formValues, setFormValues] = useState({
    smtpName: "",
    email: "",
    password: "",
    mail_encryption: "",
    port: "",
    shopId: "",
  });
  const [reCaptchaValues, setreCaptchaValues] = useState({
    siteKey: "",
    secretKey: "",
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
  const user = useSelector(state => state?.user?.userData?.user)
  const shopId = useSelector((state) => state.shopId.shopId);
  const recaptchaSettings = useSelector(state => state?.setting?.reCaptchaSettingData?.data);
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



  const handleSettingsChange = (name, value) => {
    setreCaptchaValues({
      ...reCaptchaValues,
      [name]: value,
    });
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecaptchaSettings(reCaptchaValues));
    setreCaptchaValues({});
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
    setFormValues({ ...formValues, shopId: shopId })
    setreCaptchaValues({ ...reCaptchaValues, shopId: shopId });
    dispatch(getSmtpSettingByAppId(shopId));
    dispatch(getRecaptchaSettingsByAppId(shopId));
  }, [shopId, dispatch]);

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
    if (recaptchaSettings) {
      setreCaptchaValues({
        shopId: shopId,
        siteKey: recaptchaSettings?.siteKey,
        secretKey: recaptchaSettings?.secretKey,
      })
    }
  }, [smtpSettingData, recaptchaSettings]);

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
                {getRestrictionWithPlan({ name: user.subscriptionName }) ? <LegacyCard sectioned>
                  <div
                    className={`${styles.submissions} ${selectedSetting === "recaptcha" ? styles.active : ""
                      }`}
                    onClick={() => setSelectedSetting("recaptcha")}
                  >
                    <div style={{ marginRight: 4 }}>
                      <Icon source={Icons.settingFile} />
                    </div>
                    <Heading>reCaptcha Settings</Heading>
                  </div>
                </LegacyCard> : null}
              </Layout.Section>
            </div>
            <Layout.Section>
              {
                selectedSetting === 'smtp' ? <div className={styles.formLayoutContainer}>
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
                              value={formValues.smtpName || ""}

                              onChange={(value) =>
                                handleChange("smtpName", value)
                              }
                              label="SMTP"
                              type="text"
                              autoComplete="off"
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
                </div> : (selectedSetting === 'recaptcha' && getRestrictionWithPlan({ name: user.subscriptionName })) ? <div className={styles.formLayoutContainer}>
                  <Card sectioned>
                    <Form onSubmit={(e) => handleSettingsSubmit(e)}>
                      <FormLayout>
                        <Heading>Google reCaptcha type v2</Heading>
                        <Grid>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}
                          >
                            <TextField
                              id="siteKey"
                              name="siteKey"
                              value={
                                reCaptchaValues?.siteKey || ""

                              }
                              onChange={(value) =>
                                handleSettingsChange("siteKey", value)
                              }
                              label="Site Key"
                              type="text"
                              autoComplete="off"
                            // error={errorValues.smtpName}
                            />
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}
                          >
                            <TextField
                              id="secretKey"
                              name="secretKey"
                              value={
                                reCaptchaValues?.secretKey ||
                                ""
                              }
                              onChange={(value) =>
                                handleSettingsChange("secretKey", value)
                              }
                              label="Secret Key"
                              type="text"
                              autoComplete="off"
                            // error={errorValues.smtpName}
                            />
                          </Grid.Cell>
                          <Grid.Cell
                            columnSpan={{ xs: 6, sm: 6, md: 12, lg: 12 }}
                          >
                            <Button submit primary>
                              Save
                            </Button>
                          </Grid.Cell>
                        </Grid>
                      </FormLayout>
                    </Form>
                    <ToastContainer />
                  </Card>
                </div> : null
              }
            </Layout.Section>
          </Layout>
        </div>
      </Page>
    </Frame >
  );
}

export default Settings;