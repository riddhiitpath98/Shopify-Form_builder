import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavigationMenubar from "./NavigationMenubar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import PlanModal from "../../pages/Pricingplans/PlanModal";
import { useAppQuery } from "../../hooks";
import { addShopData, getAllSubscription, getUserByShopId } from "../../redux/actions/allActions";
import { addShopId } from "../../redux/reducers/appIdSlice";
import { SUBSCRIPTION_TYPES } from "../../constant";

const Layout = ({ isShowFooter, isHideNavbar, ...props }) => {
  const location = useLocation();
  const hideFooter = location.pathname === "/form" || location.pathname === "/plans" || location.pathname === "/submissions"
  const [isShowPlan, setIsShowPlan] = useState(true);
  const navigate = useNavigate();
  const user = useSelector(state => state.user.userData);
  const path = location?.pathname === "/" ? "/dashboard" : location?.pathname
  console.log('location: ', location);
  const param = new URLSearchParams(location.search)
  const chargeId = param.get('charge_id');
  const shop = useAppQuery({ url: "/api/shop" });
  const dispatch = useDispatch();
  const subscription = useAppQuery({ url: "/api/subscriptions" });
  console.log('subscription: ', subscription?.data?.hasActivePayment);
  const subscriptionData = useSelector(
    (state) => state.subscription?.subscriptionData?.data
  );


  useEffect(() => {
    if (shop.isSuccess) {
      if (chargeId) {
        console.log('shop', shop)
        const { id, name, email, domain, city, country, customer_email, shop_owner, myshopify_domain, phone } = shop.data;
        let user = { id, name, email, domain, city, country, customer_email, shop_owner, myshopify_domain, phone, chargeId };
        subscriptionData.filter(({ subscriptionName, _id }, index) => {
          if (subscriptionName === SUBSCRIPTION_TYPES.PREMIUM) {
            user = { ...user, subscriptionName, subscriptionId: _id }
          }
        })
        dispatch(addShopData(user));
        dispatch(addShopId(shop?.data?.id))
        setIsShowPlan(false);
        navigate(path, { replace: true })
      }
      else {
        dispatch(getUserByShopId(shop?.data?.id)).then((data) => {
          const { userData } = data.payload
          setIsShowPlan(!user.loading && !userData?.subscriptionName)
          if (userData?.subscriptionName) {
            setIsShowPlan(false)
            dispatch(addShopId(shop?.data?.id))
            navigate(path, { replace: true })
          }
        });
      }

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
