import { useCallback, useMemo, useState } from "react";
import { NoteMajor } from "@shopify/polaris-icons";
import {
    Button,
    Card,
    FooterHelp,
    Heading,
    Icon,
    Layout,
    OptionList,
    Page,
    Popover,
    Select,
    TextContainer,
} from "@shopify/polaris";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchFormData,
    filterSubmissionByDate,
    getSubmission,
} from "../../redux/actions/allActions";
import { useEffect } from "react";
import moment from "moment";
import { Icons } from "../../constant";
import styles from "./Dashboard.module.css";
import ChartDashboard from "../../components/Chart";
import { useAppQuery } from '../../hooks'

function Dashboard() {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState("Select an option");
    const [popoverActive, setPopoverActive] = useState({ dailySubmission: false, monthlySubmission: false });
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
    }, [dispatch])

    const filterOptions = [
        { label: "Last 7 day", value: "last_seven_day" },
        { label: "Monthly", value: "monthly" },
        { label: "Custom Date", value: "custom_date" },
    ];


    // const combineObjArr = useSelector((state) => state.combinedObjects);
    const handleSelectChange = useCallback((value) => {
        if (value !== "custom_date") {
            dispatch(filterSubmissionByDate({ filterBy: value, date }));
        }
        setSelected(value);
    }, []);

    // const handleDateChange = useCallback(
    //   (event) => {
    //     const { name, value } = event.target;
    //     setDate({ ...date, [name]: value });
    //   },
    //   [date]
    // );
    // const data = useAppQuery({ url: '/api/products/count' })



    // const { data } = useAppQuery({
    //   url: "/api/checkDatavalues",
    //   fetchInit: {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       firstName: "Krima",
    //       lastName: "Shah",
    //       email: "jackJonaOff@gmail.com",
    //       subjectLine: "Testing Contact Form",
    //       contactNumber: "9904757571",
    //       message: "test",
    //     }),
    //   },
    // });

    // const { customFormData } = useAppQuery({
    //   url: "/api/createCustomForm",
    //   fetchInit: {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({formPayload:combineObjArr}),
    //   },
    // });
    // console.log("data", customFormData);
    // const { data } = useAppQuery({
    //   url: "/api/feedback",
    //   fetchInit: {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       name:"deepti",
    //       email:"dk@gmail.com",
    //       websiteName:"www.google.com",
    //       subjectLine:"feedback",
    //       contactNumber:"9904757571",
    //       message:"great service",
    //       rating:4
    //   }),
    //   },
    // });
    // console.log("data", data);
    return (
        <>
            <Page fullWidth>
                {/* <div>
          <div className={styles.dropdownSection}>
            <Heading>Dashboard</Heading>
            <Select
              options={filterOptions}
              onChange={handleSelectChange}
              value={selected}
            />
          </div>
          {selected === "custom_date" && (
            <>
              <input
                type="date"
                className={styles.classicInput}
                name="startDate"
                onChange={(event) => handleDateChange(event)}
              />
              <input
                type="date"
                className={styles.classicInput}
                name="endDate"
                onChange={(event) => handleDateChange(event)}
              />
            </>
          )}
        </div> */}
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
                                    xaxisCategory={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
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
                                    xaxisCategory={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                                />
                            </Layout.Section>
                        </div>
                    </Layout>
                </div>
            </Page>
        </>
    );
}

export default Dashboard;
