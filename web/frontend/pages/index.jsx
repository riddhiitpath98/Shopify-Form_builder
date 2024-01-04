import React, { lazy } from "react";

// lazy loading component
const Dashboard = lazy(() => import('./Dashboard'));
const Pricingplans = lazy(() => import('./Pricingplans'));
const Settings = lazy(() => import('./Settings'));
const Submissions = lazy(() => import('./Submissions'));
const ContactUsForm = lazy(() => import('./Support/ContactUsForm'));
const FeedbackForm = lazy(() => import('./Support/FeedbackForm'));
const FormList = lazy(() => import('./Forms/FormList'));
const FormLayout = lazy(() => import('./Forms/FormLayout/FormLayout'));
const Auth = lazy(() => import('./Auth'));
const AnyAPIIntegration = lazy(() => import('./AnyAPIIntegration'));
const APISettingsList = lazy(() => import('./AnyAPIIntegration/APISettingsList'));
const APILogs = lazy(() => import('./AnyAPIIntegration/APILogs'));
const StripeCardPayment = lazy(() => import('./StripeCardPayment'));

import { Icons } from '../constant'
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
  // {
  //   label: "All API",
  //   destination: "/api-settings",
  // },
  // {
  //   label: "Logs",
  //   destination: "/logs",
  // },
  {
    label: "Settings",
    destination: "/settings",
  },
  {
    label: "Pricing Plans",
    destination: "/plans",
  },
  // {
  //   label: "Billing History",
  //   destination: "/billing-history",
  // },
  {
    label: "Contact Us",
    destination: "/contact-us"
  },
];

export const Tabs = [
  {
    id: "dashboard",
    content: "Dashboard",
    icon: Icons?.dashboard,
    path: "/dashboard",
  },
  {
    id: "form",
    content: "Forms",
    icon: Icons?.form,
    path: "/form",
  },
  {
    id: "submission",
    content: "Submissions",
    icon: Icons?.submission,
    path: "/submissions",
  },
  {
    id: "anyAPI",
    content: "API Settings",
    icon: Icons?.settings,
    path: "/api-settings",
    viewAccess: ['premium']
  },
  {
    id: "anyAPILogs",
    content: "Logs",
    icon: Icons?.submission,
    path: "/logs",
    viewAccess: ['premium']
  },
  {
    id: "settings",
    content: "Settings",
    icon: Icons?.settings,
    path: "/settings",
  },
  {
    id: "plans",
    content: "Plans",
    icon: Icons?.plans,
    path: "/plans",
  },

  // {
  //   id: "billing-history",
  //   content: "Billing History",
  //   icon: Icons?.apiIntegrate,
  //   path: "/billing-history",
  // },
  {
    id: "support",
    content: "Support",
    icon: Icons?.support,
    children: [
      {
        id: "faq",
        content: "FAQ",
        path: "#",
        icon: Icons?.faq,
      },
      {
        id: "contact-us",
        content: "Contact Us",
        path: "/contact-us",
        icon: Icons?.email,
      },
      {
        id: "feedback",
        content: "Feedback",
        path: "/feedback",
        icon: Icons?.faq,
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
    id: "allApi",
    name: "allAPI",
    path: "/api-settings",
    exact: true,
    element: <APISettingsList />,
  },
  {
    id: "addAPI",
    name: "addAPIIntegration",
    path: "/add-api",
    exact: true,
    element: <AnyAPIIntegration />,
  },
  {
    id: "editAnyAPI",
    name: "editAnyAPI",
    path: "/edit-api/:apiId",
    exact: true,
    isEdit: true,
    element: <AnyAPIIntegration isEdit />,
  },
  {
    id: "anyAPILogs",
    name: "Logs",
    path: "/logs",
    exact: true,
    element: <APILogs />,
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
  // {
  //   id: "billing-history",
  //   name: "Billing",
  //   path: "/billing-history",
  //   exact: true,
  //   element: <BillingHistory />,
  // },
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
  {
    id: "stripe-payment",
    name: 'stripePayment',
    path: '/premium-subscription/payment',
    exact: false,
    isHideNavbar: false,
    element: <StripeCardPayment />
  }
];

export const withNavbarRoute = routes?.filter((data) => !data?.isHideNavbar);
export const withoutNavbarRoute = routes?.filter((data) => data?.isHideNavbar);