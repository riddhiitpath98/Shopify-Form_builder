import { BrowserRouter, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import { store } from './redux'
import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import Routing from "./Routes";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  // const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const { t } = useTranslation();

  const location = useLocation();
  const apiKey = process.env.SHOPIFY_API_KEY;
  // const shopOrigin = sessionStorage.getItem("hostOrigin");

  return (
    <PolarisProvider>
      <Provider
        store={store}
      >
        <AppBridgeProvider>
          <QueryProvider>
            <NavigationMenu
              navigationLinks={[
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
              ]}
            />

            {/* <Routes pages={pages} /> */}
            <Routing />
          </QueryProvider>
        </AppBridgeProvider>
      </Provider>
    </PolarisProvider>
  );
}
