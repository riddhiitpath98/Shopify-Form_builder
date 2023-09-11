import { useCallback, useState } from "react";
import {
  Button,
  Layout,
  Page,
} from "@shopify/polaris";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchFormData,
  filterSubmissionByDate,
  getSubmission,
} from "../../redux/actions/allActions";
import { useEffect } from "react";
import styles from "./Dashboard.module.css";
import ChartDashboard from "../../components/Chart";
import PlanModal from "../Pricingplans/PlanModal";

function Dashboard() {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  console.log('active: ', active);

  const toggleModal = useCallback(() => setActive((active) => !active), []);

  const activator = <Button onClick={toggleModal}>Open</Button>;
  const [selected, setSelected] = useState("Select an option");
  const [popoverActive, setPopoverActive] = useState({
    dailySubmission: false,
    monthlySubmission: false,
  });
  const submissionData = useSelector(
    (state) => state.submission.submissionData.data
  );
  const [date, setDate] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    if (date.startDate && date.endDate) {
      dispatch(filterSubmissionByDate({ date, filterBy: selected }));
    }
  }, [date]);

  useEffect(() => {
    dispatch(getSubmission());
    dispatch(fetchFormData());
  }, [dispatch]);

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
                  <Button onClick={toggleModal}>Open</Button>
            {active && <PlanModal {...{active,setActive,activator,toggleModal}}/>}
        </div>
      </Page>
    </>
  );
}

export default Dashboard;
