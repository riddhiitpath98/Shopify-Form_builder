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

const Layout = ({ isShowFooter, isHideNavbar, ...props }) => {
  const location = useLocation();
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
  const appBridge = useAppBridge();


  const subscriptionData = useSelector(
    (state) => state.subscription?.subscriptionData?.data
  );

  const getStoreNameAndAppName = async () => {
    appBridge.getState().then((response) => {
      dispatch(getAppName(response?.titleBar?.appInfo?.name));
    });
  };

  useEffect(() => {
    if (shop.isSuccess) {
      dispatch(addShopId(shop?.data?.id));
      navigate(path, { replace: true });
    } else {
      dispatch(getUserByShopId(shop?.data?.id)).then((data) => {
        const { userData } = data.payload;
        setIsShowPlan(!user.loading && !userData?.subscriptionName);
        if (userData?.subscriptionName) {
          setIsShowPlan(false);
          dispatch(addShopId(shop?.data?.id));
          navigate(path, { replace: true });
        }
      });
    }
  }, [dispatch, shop?.isSuccess])


  // const handleSubscription = (id) => {
  //   getSessionToken(appBridge).then((token) => {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}` || "",
  //       },
  //     };
  //     fetch(`/api/retrive-payment-intent/${paymentIntent}`, options)
  //       .then((res) => res.json())
  //       .then((res) => console.log("res", res))
  //       .catch((err) => console.log("err", err));
  //   });
  // };
  useEffect(() => {
    getStoreNameAndAppName();
    // if (shop.isSuccess) {
    //   if (paymentIntent) {
    // handleSubscription(chargeId);
    //     const {
    //       id,
    //       name,
    //       email,
    //       domain,
    //       city,
    //       country,
    //       customer_email,
    //       shop_owner,
    //       myshopify_domain,
    //       phone,
    //     } = shop.data;
    //     let user = {
    //       shopId: id,
    //       shopName: name,
    //       email,
    //       domain: myshopify_domain,
    //       city,
    //       country,
    //       customer_email,
    //       shop_owner,
    //       myshopify_domain,
    //       phone,
    //       subscription: {},
    //     };
    //     subscriptionData.filter(({ subscriptionName, _id }, index) => {
    //       if (subscriptionName === SUBSCRIPTION_TYPES.PREMIUM) {
    //         user = { ...user, subscriptionName, subscriptionId: _id };
    //       }
    //     });
    //     dispatch(addShopData(user));
    //     dispatch(addShopId(shop?.data?.id));
    //     setIsShowPlan(false);
    //     navigate(path, { replace: true });
    //   } else {
    //     dispatch(getUserByShopId(shop?.data?.id)).then((data) => {
    //       const { userData } = data.payload;
    //       setIsShowPlan(!user.loading && !userData?.subscriptionName);
    //       if (userData?.subscriptionName) {
    //         setIsShowPlan(false);
    //         dispatch(addShopId(shop?.data?.id));
    //         navigate(path, { replace: true });
    //       }
    //     });
    //   }
    // }
  }, [dispatch, shop.isSuccess]);

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
          />
        ) : (
          <div {...props}>
            {!isHideNavbar ? <NavigationMenubar /> : null}
            <Outlet />
            {isShowFooter && !hideFooter ? <Footer /> : null}
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
