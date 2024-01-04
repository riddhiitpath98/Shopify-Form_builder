import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { withNavbarRoute, withoutNavbarRoute } from "./pages";
import NotFound from "./pages/NotFound";
import ExitIframe from "./pages/ExitIframe";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubscription } from "./redux/actions/allActions";
import { useAppQuery } from "./hooks";

export default function Routing({ ...props }) {
  const shop = useAppQuery({ url: '/api/shop' })
  const dispatch = useDispatch();
  useEffect(() => {
    if (shop?.isSuccess)
      dispatch(getAllSubscription({ country: shop?.data?.country, countryCode: shop?.data?.country_code, shopId: shop?.data?.id }))
    // dispatch(getAllTestSubscription())
  }, [dispatch, shop.isSuccess])

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
