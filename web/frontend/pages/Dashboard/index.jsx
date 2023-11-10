import { useCallback, useState } from "react";
import {
  Layout,
  Page,
} from "@shopify/polaris";
import { useSelector, useDispatch } from "react-redux";
import {
  addShopData,
  fetchFormData,
  filterSubmissionByDate,
  getAllSubscription,
  getSubmission,
} from "../../redux/actions/allActions";
import { useEffect } from "react";
import styles from "./Dashboard.module.css";
import ChartDashboard from "../../components/Chart";
import { ToastContainer } from "react-toastify";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useLocation } from "react-router-dom";
import { useAppQuery } from "../../hooks";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import moment from "moment";
import axios from "axios";
import { SUBSCRIPTION_TYPES } from "../../constant";

function Dashboard() {
  const dispatch = useDispatch();
  const app = useAppBridge();
  const location = useLocation();
  const param = new URLSearchParams(location.search)
  const chargeId = param.get('charge_id');
  const fullscreen = Fullscreen.create(app);
  const shop = useAppQuery({ url: "/api/shop" });

  const [selected, setSelected] = useState("Select an option");
  const [popoverActive, setPopoverActive] = useState({
    dailySubmission: false,
    monthlySubmission: false,
  });

  // const data = useAppQuery({ url: "/api/cancelSubscription" });
  // console.log('data: ', data);
  // const fetchSubscriptions = async (token) => {
  //   try {
  //     const options = {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${token}` || ''
  //       }
  //     }
  //     const response = await fetch(`/api/recurring-application-charge/${chargeId}`, options)
  //     const data = await response.json();
  //     return data
  //   } catch (error) {
  //     console.log('error', error)
  //   }
  // }


  const shopId = useSelector((state) => state.shopId.shopId);
  const submissionData = useSelector(
    (state) => state.submission.submissions.data
  );
  const [date, setDate] = useState({ startDate: "", endDate: "" });
  const recurringCharge = useSelector(state => state.recurringCharge.recurringCharges.data)
  console.log('recurringCharge: ', recurringCharge);

  useEffect(() => {
    if (date.startDate && date.endDate) {
      dispatch(filterSubmissionByDate({ date, filterBy: selected }));
    }
  }, [date]);

  useEffect(() => {
    // if (chargeId && shop.isSuccess) {
    //   console.log('shop', shop)
    //   const { id, name, email, domain, city, country, customer_email, shop_owner, myshopify_domain, phone } = shop.data;
    //   let user = { id, name, email, domain, city, country, customer_email, shop_owner, myshopify_domain, phone, chargeId };
    //   subscriptionData.filter(({ subscriptionName, _id }, index) => {
    //     if (subscriptionName === SUBSCRIPTION_TYPES.PREMIUM) {
    //       user = { ...user, subscriptionName, subscriptionId: _id }
    //     }
    //   })
    //   console.log('user', user)
    //   dispatch(addShopData(user));
    // }
  }, [chargeId, shop.isSuccess])

  useEffect(() => {
    dispatch(getSubmission(shopId));
    dispatch(fetchFormData(shopId));
  }, [shopId, dispatch]);

  return (
    <>
      <Page fullWidth>
        <div className={styles.layoutContainer}>
          <Layout>
            <div className={styles.card}>
              <Layout.Section>
                <ChartDashboard
                  toggleId="dailySubmission"
                  chartTitle="Daily Submissions"
                  submissionData={submissionData}
                  styles={styles}
                  popoverActive={popoverActive}
                  setPopoverActive={setPopoverActive}
                  xaxisCategory={[
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                  ]}
                />
              </Layout.Section>
            </div>
            <div>
              <Layout.Section secondary>
                <ChartDashboard
                  toggleId="monthlySubmission"
                  chartTitle="Monthly Submissions"
                  submissionData={submissionData}
                  styles={styles}
                  popoverActive={popoverActive}
                  setPopoverActive={setPopoverActive}
                  xaxisCategory={[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ]}
                />
              </Layout.Section>
            </div>
          </Layout>
        </div>
        <ToastContainer />
      </Page>
    </>
  );
}

export default Dashboard;
