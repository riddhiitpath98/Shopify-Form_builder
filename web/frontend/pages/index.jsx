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
    content: "Form",
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
