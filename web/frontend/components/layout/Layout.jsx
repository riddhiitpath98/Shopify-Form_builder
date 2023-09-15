import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavigationMenubar from "./NavigationMenubar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import PlanModal from "../../pages/Pricingplans/PlanModal";
import { useAppQuery } from "../../hooks";
import { getAllSubscription, getUserByShopId } from "../../redux/actions/allActions";
import { Spinner } from "@shopify/polaris";

const Layout = ({ isShowFooter, isHideNavbar, ...props }) => {
  const location = useLocation();
  const hideFooter = location.pathname === "/form" || location.pathname === "/plans" || location.pathname === "/submissions"
  const [isShowPlan, setIsShowPlan] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.user.userData);
  console.log('user: ', user);

  const shop = useAppQuery({ url: "/api/shop" });
  const dispatch = useDispatch();

  console.log('shop', shop)

  useEffect(() => {
    if (shop.isSuccess) {
      dispatch(getUserByShopId(shop?.data?.id)).then((data) => {
        const { payload } = data
        setIsShowPlan(!user?.loading && !payload?.subscriptionName)
        if (payload?.subscriptionName) {
          setIsShowPlan(false)
          navigate('/dashboard')
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
