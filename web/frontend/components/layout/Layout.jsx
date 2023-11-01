import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavigationMenubar from "./NavigationMenubar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import PlanModal from "../../pages/Pricingplans/PlanModal";
import { useAppQuery } from "../../hooks";
import { getAllSubscription, getUserByShopId } from "../../redux/actions/allActions";
import { addShopId } from "../../redux/reducers/appIdSlice";

const Layout = ({ isShowFooter, isHideNavbar, ...props }) => {
  const location = useLocation();
  const hideFooter = location.pathname === "/form" || location.pathname === "/plans" || location.pathname === "/submissions"
  const [isShowPlan, setIsShowPlan] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.user.userData.user);
  const path = location?.pathname === "/" ? "/dashboard" : location?.pathname
  const shop = useAppQuery({ url: "/api/shop" });
  const dispatch = useDispatch();
  const subscription = useAppQuery({ url: "/api/subscriptions" });
  console.log('subscription: ', !subscription?.data?.data?.activeSubscriptions.length);

  useEffect(() => {
    if (shop.isSuccess) {
      dispatch(getUserByShopId(shop?.data?.id)).then((data) => {
        const { userData } = data.payload
        setIsShowPlan(!user?.loading && !userData?.subscriptionName && !subscription?.data?.data?.activeSubscriptions.length)
        if (userData?.subscriptionName) {
          setIsShowPlan(false)
          dispatch(addShopId(shop?.data?.id))
          navigate(path, { replace: true })
        }
      });
    }
  }, [dispatch, shop.isSuccess])


  const toggleModal = () => {
    setIsShowPlan(false)
  }

  return (
    <>
      <div>
        {
          isShowPlan ?
            <PlanModal active={isShowPlan} toggleModal={toggleModal} shopData={shop?.data} />
            : <div {...props}>
              {!isHideNavbar ? <NavigationMenubar /> : null}
              <Outlet />
              {isShowFooter && !hideFooter ? <Footer /> : null}
            </div>
        }
      </div >
    </>
  );
};

export default Layout;
