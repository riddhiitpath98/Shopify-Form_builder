import ReactDOM from "react-dom";

import App from "./App";
import { initI18n } from "./utils/i18nUtils";
import { BrowserRouter } from "react-router-dom";

// Ensure that locales are loaded before rendering the app
initI18n().then(() => {
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById("app"));
});
