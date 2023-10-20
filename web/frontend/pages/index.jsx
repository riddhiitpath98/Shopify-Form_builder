// import {
//   Card,
//   Page,
//   Layout,
//   TextContainer,
//   Image,
//   Stack,
//   Link,
//   Text,
// } from "@shopify/polaris";
// import { TitleBar } from "@shopify/app-bridge-react";
// import { useTranslation, Trans } from "react-i18next";

// import { trophyImage } from "../assets";

// import { ProductsCard } from "../components";

// export default function HomePage() {
//   const { t } = useTranslation();
//   return (
//     <Page narrowWidth>
//       <TitleBar title={t("HomePage.title")} primaryAction={null} />
//       <Layout>
//         <Layout.Section>
//           <Card sectioned>
//             <Stack
//               wrap={false}
//               spacing="extraTight"
//               distribution="trailing"
//               alignment="center"
//             >
//               <Stack.Item fill>
//                 <TextContainer spacing="loose">
//                   <Text as="h2" variant="headingMd">
//                     {t("HomePage.heading")}
//                   </Text>
//                   <p>
//                     <Trans
//                       i18nKey="HomePage.yourAppIsReadyToExplore"
//                       components={{
//                         PolarisLink: (
//                           <Link url="https://polaris.shopify.com/" external />
//                         ),
//                         AdminApiLink: (
//                           <Link
//                             url="https://shopify.dev/api/admin-graphql"
//                             external
//                           />
//                         ),
//                         AppBridgeLink: (
//                           <Link
//                             url="https://shopify.dev/apps/tools/app-bridge"
//                             external
//                           />
//                         ),
//                       }}
//                     />
//                   </p>
//                   <p>{t("HomePage.startPopulatingYourApp")}</p>
//                   <p>
//                     <Trans
//                       i18nKey="HomePage.learnMore"
//                       components={{
//                         ShopifyTutorialLink: (
//                           <Link
//                             url="https://shopify.dev/apps/getting-started/add-functionality"
//                             external
//                           />
//                         ),
//                       }}
//                     />
//                   </p>
//                 </TextContainer>
//               </Stack.Item>
//               <Stack.Item>
//                 <div style={{ padding: "0 20px" }}>
//                   <Image
//                     source={trophyImage}
//                     alt={t("HomePage.trophyAltText")}
//                     width={120}
//                   />
//                 </div>
//               </Stack.Item>
//             </Stack>
//           </Card>
//         </Layout.Section>
//         <Layout.Section>
//           <ProductsCard />
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }

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
  ListMajor,
  FirstOrderMajor,
} from "@shopify/polaris-icons";
import FeedbackForm from "./Support/FeedbackForm";
import FormList from "./Forms/FormList";
import FormLayout from "./Forms/FormLayout/FormLayout";
import Auth from "./Auth";
import AnyAPIIntegration from "./AnyAPIIntegration";
import APISettingsList from "./AnyAPIIntegration/APISettingsList";
import { Icons } from "../constant";

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
    label: "Logs",
    destination: "/logs",
  },
  {
    label: "Any API integration",
    destination: "/add-api",
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
    icon: Icons.dashboard,
    path: "/dashboard",
  },
  {
    id: "form",
    content: "Forms",
    icon: Icons.form,
    path: "/form",
  },
  {
    id: "submission",
    content: "Submissions",
    icon: Icons.submission,
    path: "/submissions",
  },
  {
    id: "settings",
    content: "Settings",
    icon: Icons.settings,
    path: "/settings",
  },
  {
    id: "plans",
    content: "Plans",
    icon: Icons.plans,
    path: "/plans",
  },
  {
    id: "anyAPILogs",
    content: "Logs",
    icon: Icons.submission,
    path: "/logs",
  },
  {
    id: "anyAPI",
    content: "Any API integration",
    icon: Icons.apiIntegrate,
    path: "/add-api",
  },
  {
    id: "support",
    content: "Support",
    icon: Icons.support,
    children: [
      {
        id: "faq",
        content: "FAQ",
        path: "#",
        icon: Icons.faq,
      },
      {
        id: "contact-us",
        content: "Contact Us",
        path: "/contact-us",
        icon: Icons.email,
      },
      {
        id: "feedback",
        content: "Feedback",
        path: "/feedback",
        icon: Icons.faq,
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
    id: "anyAPILogs",
    name: "Logs",
    path: "/logs",
    exact: true,
    element: <APISettingsList />,
  },
  {
    id: "anyAPI",
    name: "Any API integration",
    path: "/add-api",
    exact: true,
    element: <AnyAPIIntegration />,
  },
  {
    id: "editAnyAPI",
    name: "editAnyAPI",
    path: "/add-api/:apiId",
    exact: true,
    isEdit: true,
    element: <AnyAPIIntegration isEdit />,
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