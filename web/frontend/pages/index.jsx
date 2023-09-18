import React from "react";
import Dashboard from "./Dashboard";
import Pricingplans from "./Pricingplans";

import Settings from "./Settings";
import Submissions from "./Submissions";
import ContactUsForm from "./Support/ContactUsForm";
import {
  AnalyticsMajor,
  FormsMajor,
  SettingsMajor,
  CashDollarMajor,
  QuestionMarkInverseMajor,
  ReportsMajor,
  EmailMajor,
  CircleInformationMajor,
} from "@shopify/polaris-icons";
import FeedbackForm from "./Support/FeedbackForm";
import FormList from "./Forms/FormList";
import FormLayout from "./Forms/FormLayout/FormLayout";
import Auth from "./Auth";

export const navigation = [
  {
    label: "Dashboard",
    destination: "/dashboard",
  },
  {
    label: "Form",
    destination: "/form",
  },
  {
    label: "Submissions",
    destination: "/submissions",
  },
  {
    label: "Settings",
    destination: "/settings",
  },
  {
    label: "Pricing Plans",
    destination: "/plans",
  },
  {
    label: "Contact Us",
    destination: "/contact-us",
  },
];

export const Tabs = [
  {
    id: "dashboard",
    content: "Dashboard",
    icon: AnalyticsMajor,
    path: "/dashboard",
  },
  {
    id: "form",
    content: "Forms",
    icon: FormsMajor,
    path: "/form",
  },
  {
    id: "submission",
    content: "Submissions",
    icon: ReportsMajor,
    path: "/submissions",
  },
  {
    id: "settings",
    content: "Settings",
    icon: SettingsMajor,
    path: "/settings",
  },
  {
    id: "plans",
    content: "Plans",
    icon: CashDollarMajor,
    path: "/plans",
  },
  {
    id: "support",
    content: "Support",
    icon: QuestionMarkInverseMajor,
    children: [
      {
        id: "faq",
        content: "FAQ",
        path: "#",
        icon: CircleInformationMajor,
      },
      {
        id: "contact-us",
        content: "Contact Us",
        path: "/contact-us",
        icon: EmailMajor,
      },
      {
        id: "feedback",
        content: "Feedback",
        path: "/feedback",
        icon: CircleInformationMajor,
      },
    ],
  },
];

const routes = [
  {
    id: "auth",
    name: "Auth",
    path: "/",
    exact: true,
    isHideNavbar: true,
    element: <Auth />,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    path: "/dashboard",
    exact: true,
    element: <Dashboard />,
  },
  {
    id: "form",
    name: "FormList",
    path: "/form",
    exact: true,
    element: <FormList />,
  },
  {
    id: "submissions",
    name: "Submissions",
    path: "/submissions",
    exact: true,
    element: <Submissions />,
  },
  {
    id: "settings",
    name: "Settings",
    path: "/settings",
    exact: true,
    element: <Settings />,
  },
  {
    id: "plans",
    name: "Plans",
    path: "/plans",
    exact: true,
    element: <Pricingplans />,
  },
  {
    id: "contact-us",
    name: "Contact Us",
    path: "/contact-us",
    exact: true,
    element: <ContactUsForm />,
  },
  {
    id: "feedback",
    name: "Feedback",
    path: "/feedback",
    exact: true,
    element: <FeedbackForm />,
  },
  {
    id: "edit-form",
    name: "editForm",
    path: "/form/:editFormId",
    exact: true,
    isEdit: true,
    isHideNavbar: true,
    element: <FormLayout isEdit />,
  },
  {
    id: "form-layout",
    name: "newForm",
    path: "/form/new",
    exact: true,
    isHideNavbar: true,
    element: <FormLayout />,
  },
];

export const withNavbarRoute = routes?.filter((data) => !data?.isHideNavbar);
export const withoutNavbarRoute = routes?.filter((data) => data?.isHideNavbar);
