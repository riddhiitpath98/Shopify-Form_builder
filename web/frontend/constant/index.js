import { toast } from "react-toastify";
import {
  TextMajor,
  EmailMajor,
  TypeMajor,
  TextAlignmentLeftMajor,
  MentionMajor,
  TextBlockMajor,
  HashtagMajor,
  HideMinor,
  AttachmentMajor,
  LinkMinor,
  CalendarMajor,
  EnableSelectionMinor,
  FraudProtectMajor,
  CircleTickOutlineMinor,
  CircleChevronDownMinor,
  // GlobeMajor,
  MinusMinor,
  PhoneMajor,
  CodeMajor,
  HeaderMajor,
  AddMajor,
  FooterMajor,
  IllustrationMajor,
  CircleTickMajor,
  RiskMajor,
  BehaviorMajor,
  MobileChevronMajor,
  MobileMajor,
  DesktopMajor,
  NoteMajor,
  ListMajor,
  FormsMajor,
  DragHandleMinor,
  DuplicateMinor
} from "@shopify/polaris-icons";

export const Icons = {
  text: TextMajor,
  email: EmailMajor,
  name: MentionMajor,
  textarea: TextBlockMajor,
  phone: PhoneMajor,
  number: HashtagMajor,
  password: HideMinor,
  file: AttachmentMajor,
  url: LinkMinor,
  date_time: CalendarMajor,
  hidden: HideMinor,
  checkbox: EnableSelectionMinor,
  accept_terms: FraudProtectMajor,
  radio: CircleTickOutlineMinor,
  dropdown: CircleChevronDownMinor,
  heading: TypeMajor,
  paragraph: TextAlignmentLeftMajor,
  divider: MinusMinor,
  html: CodeMajor,
  header_tab: HeaderMajor,
  add_element: AddMajor,
  footer_tab: FooterMajor,
  appearance: IllustrationMajor,
  reCaptcha: CircleTickMajor,
  error_msg: RiskMajor,
  after_submit: BehaviorMajor,
  backArrow: MobileChevronMajor,
  mobile: MobileMajor,
  desktop: DesktopMajor,
  settingFile: NoteMajor,
  submission: ListMajor,
  form: FormsMajor,
  dragElement: DragHandleMinor,
  copy: DuplicateMinor
};

export const pricingPlanData = [
  {
    heading: "Form",
    tableData: [
      { title: "Number of form(s)", unpaid: 10 },
      { title: "Number of fields per form", unpaid: "Unlimited" },
      {
        title: "Number of submissions per month",
        unpaid: "Unlimited",
      },
      { title: "Conditional option fields", unpaid: true },
      { title: "Registration form", unpaid: true },
      { title: "Survey Form", unpaid: true },
    ],
  },
  {
    heading: "Style",
    tableData: [
      { title: "Customize form style", unpaid: true },
      { title: "Customize field style", unpaid: true },
      { title: "Background options", unpaid: true },
    ],
  },
  {
    heading: "Third Party Integration",
    tableData: [
      { title: "Google reCAPTCHA", unpaid: false },
    ],
  },
  {
    heading: "Features",
    tableData: [
      { title: "Realtime preview", unpaid: true },
      { title: "Email notification", unpaid: true },
      { title: "File upload", unpaid: true },
      { title: "Date & Time", unpaid: false },
      { title: "HTML Field", unpaid: false },
      { title: "URL Field", unpaid: false },
      { title: "Export submissions", unpaid: false },
    ],
  },
];

export const tabs = [
  {
    id: "elements",
    content: "Elements",
    panelID: "elements-fitted-content",
  },
  {
    id: "settings",
    content: "Settings",
    panelID: "settings-fitted-content",
  },
  // {
  //   id: "publish",
  //   content: "Publish",
  //   panelID: "publish-fitted-content",
  // },
];

export const customHeaderFields = [
  { id: "header_element", label: "Title", type: "text", value: "" },
  { id: "header_element", label: "Description", type: "text", value: "" },
];
export const customTextFields = [
  { id: "text_element", label: "Label", type: "text", value: "" },
  { id: "text_element", label: "Placeholder", type: "text", value: "" },
  { id: "text_element", label: "Description", type: "text", value: "" },
  { id: "text_element", label: "Required", type: "checkbox", value: "" },
];
export const customEmailFields = [
  { id: "email_element", label: "Label", type: "text", value: "" },
  { id: "email_element", label: "Placeholder", type: "text", value: "" },
  { id: "email_element", label: "Description", type: "text", value: "" },
  { id: "email_element", label: "Required", type: "checkbox", value: "" },
];

export const toastConfig = {
  position: toast.POSITION.BOTTOM_CENTER,
  theme: "dark",
  autoClose: 500,
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const contactRegex = /^[2-9]{1}[0-9]{9}$/;

export const validateTextField = (name, value) => {
  if (!value || String(value).trim() === '') {
    return 'This field is required.'
  }

  switch (name) {
    case 'email':
      if (!value || String(value).trim() === '') {
        return 'This field is required.'
      } else if (!emailRegex.test(value)) {
        return 'This is not a valid email format!'
      } else return ''

    case 'contactNumber':
      if (!value || String(value).trim() === '') {
        return 'This field is required.'
      } else if (!contactRegex.test(value)) {
        return 'Please enter a valid contact number!'
      } else return ''
    default: return ''
  }
};

export const validationAttributes = [
  {
    id: "required_msg",
    name: "required",
    label: "Required",
    message: "Please fill in field",
  },
  { id: "invalid_msg", name: "invalid", label: "Invalid", message: "Invalid" },
  {
    id: "invalid_name_msg",
    name: "invalidName",
    label: "Invalid name",
    message: "Invalid name",
  },
  {
    id: "invalid_email_msg",
    name: "invalidEmail",
    label: "Invalid email",
    message: "Invalid email",
  },
  {
    id: "invalid_url_msg",
    name: "invalidUrl",
    label: "Invalid url",
    message: "Invalid url",
  },
  {
    id: "invalid_phone_msg",
    name: "invalidPhone",
    label: "Invalid phone",
    message: "Invalid phone",
  },
  {
    id: "invalid_number_msg",
    name: "invalidNumber",
    label: "Invalid number",
    message: "Invalid number",
  },
  {
    id: "invalid_password_msg",
    name: "invalidPassword",
    label: "Invalid password",
    message: "Invalid password",
  },
  {
    id: "confirm_pwd_match",
    name: "confirmedPasswordMatch",
    label: "Confirmed password does't match",
    message: "Confirmed password does't match",
  },
  {
    id: "customer_exist",
    name: "customerAlreadyExists",
    label: "Customer already exists",
    message: "Customer already exists",
  },
  {
    id: "file_size_limit",
    name: "fileSizeLimit",
    label: "File size limit",
    message: "File size limit exceeded",
  },
  {
    id: "file_not_allowed",
    name: "fileNotAllowed",
    label: "File not allowed",
    message: "File extension not allowed",
  },
  {
    id: "required_captcha",
    name: "requiredCaptcha",
    label: "Required captcha",
    message: "Please, enter the captcha",
  },
  {
    id: "required_product",
    name: "requiredProduct",
    label: "Please select product",
    message: "Please select product",
  },
  {
    id: "limit_quantity",
    name: "limitQuantity",
    label: "Limit quantity",
    message: "The number of products left in stock has been exceeded",
  },
];

const styleOptions = [
  { label: "Classic", value: "classic" },
  { label: "Flat", value: "flat" },
  { label: "Classic rounded", value: "classicRounded" },
  { label: "Flat rounded", value: "flatRounded" },
];

const backgroundOptions = [
  { label: "Color", value: "color" },
  { label: "None", value: "none" },
  { label: "Image", value: "image" },
];

const imageAlignmentOptions = [
  { label: "Top", value: "top" },
  { label: "Middle", value: "middle" },
  { label: "Bottom", value: "bottom" },
];

const formActions = [
  { label: "Clear Form", value: "clearForm" },
  { label: "Redirect to page", value: "pageRedirect" },
  { label: "Hide Form", value: "hideForm" },
];

export const appearanceAttributes = [
  // {
  //   id: "appearance_layout",
  //   label: "Layout",
  //   type: "appappearance_layout",
  //   name: "appearanceLayout",
  //   value: 2,
  // },
  {
    id: "appearance_width",
    label: "Width",
    type: "number",
    name: "appearanceWidth",
    value: 700,
  },
  {
    id: "appearance_style",
    label: "Style",
    type: "select",
    name: "appearanceStyle",
    options: styleOptions,
    value: "",
  },
  {
    id: "appearance_color_mainButtonColor",
    label: "Main button Color",
    type: "color_panel",
    name: "mainButtonColor",
    value: "#4e5db9",
  },
  {
    id: "appearance_color_buttonTextColor",
    label: "Button text Color",
    type: "color_panel",
    name: "buttonTextColor",
    value: "#ffffff",
  },
  {
    id: "appearance_color_headingColor",
    label: "Heading Color",
    type: "color_panel",
    name: "headingColor",
    value: "#777a8b",
  },
  {
    id: "appearance_color_labelColor",
    label: "Label Color",
    type: "color_panel",
    name: "labelColor",
    value: "#000000",
  },
  {
    id: "appearance_color_descriptionColor",
    label: "Description Color",
    type: "color_panel",
    name: "descriptionColor",
    value: "#6c757d",
  },
  {
    id: "appearance_color_optionColor",
    label: "Option Color",
    type: "color_panel",
    name: "optionColor",
    value: "#dba464",
  },
  {
    id: "appearance_color_paragraphColor",
    label: "Paragraph Color",
    type: "color_panel",
    name: "paragraphColor",
    value: "#dba464",
  },
  {
    id: "appearance_color_paragraphBackgroundColor",
    label: "Paragraph Background Color",
    type: "color_panel",
    name: "paragraphBackgroundColor",
    value: "#6c757d",
  },
  {
    id: "appearance_background",
    label: "Background",
    type: "select",
    name: "appearanceBackground",
    options: backgroundOptions,
    value: "color",
  },
  {
    id: "appearance_color_formBackgroundColor",
    label: "Background Color",
    type: "conditional_color_panel",
    name: "formBackgroundColor",
    value: "#ffffff",
  },
  {
    id: "appearance_image_url",
    label: "Background image url",
    type: "conditional_text",
    name: "backgroundImageUrl",
    placeholder: "https://",
    value: "",
  },
  {
    id: "appearance_image_alignment",
    label: "Image alignment",
    type: "conditional_select",
    name: "imageAlignment",
    options: imageAlignmentOptions,
    value: "",
  },
];

export const formSubmittAttributes = [
  {
    id: "submit_action",
    label: "Action",
    type: "select",
    name: "submitAction",
    options: formActions,
    value: "clearForm",
  },
  {
    id: "submit_msg",
    label: "Message",
    type: "editor",
    name: "submitMessage",
    value: "Thanks for getting in touch!",
  },
  {
    id: "submit_redirect_url",
    label: "Redirect url",
    type: "conditional_url",
    name: "redirectUrl",
    value: "",
  },
];

export const getIncrementedKeysData = (data) => {
  const keyMap = {};
  return data.map((item) => {
    if (!keyMap[item.key]) {
      keyMap[item.key] = 1;
    } else {
      keyMap[item.key]++;
      item.key = `${item.key}_${keyMap[item.key]}`;
    }
    return item;
  });
};

export const SUBSCRIPTION_TYPES = {
  FREE : 'free',
  PREMIUM : "premium"
}