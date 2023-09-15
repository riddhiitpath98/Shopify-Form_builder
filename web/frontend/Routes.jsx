import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { withNavbarRoute, withoutNavbarRoute } from "./pages";
import NotFound from "./pages/NotFound";
import ExitIframe from "./pages/ExitIframe";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllSubscription } from "./redux/actions/allActions";

export default function Routing({ ...props }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSubscription())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/exitiframe" element={<ExitIframe />} />
      <Route path="/" element={<Layout isShowFooter {...props} />}>
        {withNavbarRoute?.map(({ id, ...data }) => <Route index key={id} {...data} />)}
      </Route>
      <Route path="/" element={<Layout isHideNavbar isShowFooter={false} {...props} />} >
        {withoutNavbarRoute?.map(({ id, ...data }) => <Route index key={id} {...data} />)}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
