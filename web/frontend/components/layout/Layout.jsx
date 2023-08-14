import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavigationMenubar from "./NavigationMenubar";
import Footer from "./Footer";

const Layout = ({ isShowFooter, isHideNavbar, ...props }) => {
  const location = useLocation();
  const hideFooter = location.pathname === "/form" || location.pathname === "/plans" || location.pathname === "/submissions"
  return (
    <div {...props}>
      {!isHideNavbar ? <NavigationMenubar /> : null}
      <Outlet />
      {isShowFooter && !hideFooter ? <Footer /> : null}
    </div>
  );
};

export default Layout;
