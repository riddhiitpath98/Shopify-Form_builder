import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavigationMenubar from "./NavigationMenubar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import PlanModal from "../../pages/Pricingplans/PlanModal";
import { useAppQuery } from "../../hooks";
import { getAllSubscription, getUserByShopId } from "../../redux/actions/allActions";

const Layout = ({ isShowFooter, isHideNavbar, ...props }) => {
  const location = useLocation();
  const hideFooter = location.pathname === "/form" || location.pathname === "/plans" || location.pathname === "/submissions"
  const [isShowPlan, setIsShowPlan] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.user.userData.data);
  console.log('user: ', user);

  const shop = useAppQuery({ url: "/api/shop" });
  const dispatch = useDispatch();
  console.log('isShowPlan: ', isShowPlan);
  useEffect(() => {
    if (shop.isSuccess) {
      dispatch(getUserByShopId(shop?.data?.id));
    }
  }, [dispatch, shop.isSuccess])


  const toggleModal = () => {
    setIsShowPlan(false)
  }
  useEffect(() => {
    if (!user.subscriptionName) {
      console.log('!user.subscriptionName', !user.subscriptionName)
      setIsShowPlan(true);
    } else {
      setIsShowPlan(false);
      navigate("/dashboard", { replace: true })
    }
  }, [!user.subscriptionName])

  return (
    <div>
      {isShowPlan ?
        <PlanModal active={isShowPlan} toggleModal={toggleModal} shopData={shop?.data} />
        : <div {...props}>
          {!isHideNavbar ? <NavigationMenubar /> : null}
          <Outlet />
          {isShowFooter && !hideFooter ? <Footer /> : null}
        </div>}
    </div>
  );
};

export default Layout;
