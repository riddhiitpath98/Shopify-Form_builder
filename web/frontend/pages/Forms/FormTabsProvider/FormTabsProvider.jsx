import AcceptTermsFields from "../FormElementsTab/AcceptTermsFields";
import CheckboxGroupFields from "../FormElementsTab/CheckboxGroupFields";
import DividerInputFields from "../FormElementsTab/DividerInputFields";
import FormFields from "../FormElementsTab/FormFields";
import HeadingInputFields from "../FormElementsTab/HeadingInputFields";
import HiddenInputFields from "../FormElementsTab/HiddenInputFields";
import ParagraphInputFields from "../FormElementsTab/ParagraphInputFields";
import AfterSubmitFields from "../FormSettingsTab/AfterSubmitFields";
import AppearanceFields from "../FormSettingsTab/AppearanceFields";
import ErrorMessageFields from "../FormSettingsTab/ErrorMessageFields";
import AddElementList from "./Providers/AddElementList";
import FooterFields from "./Providers/FooterFields";
import HeaderFields from "./Providers/HeaderFields";

const FormTabsProvider = ({ isEdit, tabId, toggleDrawer }) => {
  switch (tabId?.id) {
    case "header_tab":
      return <HeaderFields {...{ isEdit, tabId, toggleDrawer }} />;
    case "add_element":
      return <AddElementList {...{ isEdit, tabId, toggleDrawer }} />;
    case "footer_tab":
      return <FooterFields {...{ isEdit, tabId, toggleDrawer }} />;
    case "text":
    case "email":
    case "name":
    case "phone":
    case "password":
    case "number":
    case "textarea":
      return <FormFields {...{ isEdit, tabId, toggleDrawer }} />;
    case "checkbox":
    case "radio":
    case "dropdown":
      return <CheckboxGroupFields {...{ isEdit, tabId, toggleDrawer }} />;
    case "hidden":
      return <HiddenInputFields {...{ isEdit, tabId, toggleDrawer }} />;
    case "heading":
      return <HeadingInputFields {...{ isEdit, tabId, toggleDrawer }} />;
    case "accept_terms":
      return <AcceptTermsFields {...{ isEdit, tabId, toggleDrawer }} />;
    case "paragraph":
      return <ParagraphInputFields {...{ isEdit, tabId, toggleDrawer }} />;
    case "divider":
      return <DividerInputFields {...{ isEdit, tabId, toggleDrawer }} />;
    case "appearance":
      return <AppearanceFields {...{ isEdit, tabId, toggleDrawer }} />;
    case "error_msg":
      return <ErrorMessageFields {...{ isEdit, tabId, toggleDrawer }} />;
    case "submit_actions":
      return <AfterSubmitFields {...{ isEdit, tabId, toggleDrawer }} />;
    default:
      return null;
  }
};

export default FormTabsProvider;
