import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavigationMenubar from "./NavigationMenubar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import PlanModal from "../../pages/Pricingplans/PlanModal";
import { useAppQuery } from "../../hooks";
import {
  addShopData,
  getAllSubscription,
  getUserByShopId,
} from "../../redux/actions/allActions";
import { addShopId, getAppName } from "../../redux/reducers/appIdSlice";
import { SUBSCRIPTION_TYPES, handleRecurringChargeVal } from "../../constant";
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCardPayment from "../../pages/StripeCardPayment";
import ElementListBanner from "../ElementListBanner";
import axios from "axios";

const Layout = ({ isShowFooter, isHideNavbar, ...props }) => {
  const location = useLocation();
  const [showCardElement, setShowCardElement] = useState(false);
  const hideFooter =
    location.pathname === "/form" ||
    location.pathname === "/plans" ||
    location.pathname === "/submissions";
  const [isShowPlan, setIsShowPlan] = useState(false);
  const navigate = useNavigate();
  const path = location?.pathname === "/" ? "/dashboard" : location?.pathname;
  const user = useSelector(state => state.user.userData?.user)
  const shop = useAppQuery({ url: "/api/shop" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (shop.isSuccess) {
      dispatch(getUserByShopId(shop?.data?.id)).then((data) => {
        if (data.payload) {
          const { userData } = data.payload;
          setIsShowPlan(!user?.loading && !userData?.subscriptionName);
          dispatch(addShopId(shop?.data?.id));
          if (!showCardElement && !isShowPlan)
            navigate(path, { replace: true });
        }
        else {
          setIsShowPlan(true);
        }
      });
    }
  }, [dispatch, shop?.isSuccess])

  const toggleModal = () => {
    setIsShowPlan(false);
  };
  return (
    <>
      <div>
        {isShowPlan ? (
          <PlanModal
            active={isShowPlan}
            toggleModal={toggleModal}
            shopData={shop?.data}
            {...{ showCardElement, setShowCardElement }}
          />
        ) : null
        }
        {!isShowPlan && !showCardElement ? <div {...props}>
          {!isHideNavbar ? <NavigationMenubar /> : null}<br />
          <>
            {user?.subscription?.isPlanExpiredIn3Days ? <ElementListBanner
              title={user?.subscription?.planStatusForExpriation}
            /> : null}
            <Outlet />
          </>
          {isShowFooter && !hideFooter ? <Footer /> : null}
        </div> : null}
      </div >
    </>
  );
};

export default Layout;
