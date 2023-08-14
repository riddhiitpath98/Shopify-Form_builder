import React from "react";
import ElementsProvider from "./Providers/ElementsProvider";
import SettingsProvider from "./Providers/SettingsProvider";
// import PublishProvider from "./Providers/PublishProvider";

const TabsProvider = ({ isEdit, currentTab }) => {
  switch (currentTab) {
    case "elements":
      return <ElementsProvider {...{isEdit}} />;
    case "settings":
      return <SettingsProvider {...{isEdit}}/>;
    // case "publish":
    //   return <PublishProvider />;
    default:
      <ElementsProvider />;
  }
};

export default TabsProvider;
