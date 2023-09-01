import { Routes as ReactRouterRoutes, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { withNavbarRoute, withoutNavbarRoute } from "./pages";
import NotFound from "./pages/NotFound";
import ExitIframe from "./pages/ExitIframe";

export default function Routing({ ...props }) {

  return (
    <Routes>
      <Route path="/exitiframe" element={<ExitIframe />} />
      <Route path="/" element={<Layout isShowFooter {...props} />} >
        {
          withNavbarRoute?.map(({ id, ...data }) => <Route index key={id} {...data} />)
        }
      </Route>
      <Route path="/" element={<Layout isHideNavbar isShowFooter={false} {...props} />} >
        {
          withoutNavbarRoute?.map(({ id, ...data }) => <Route index key={id} {...data} />)
        }
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
