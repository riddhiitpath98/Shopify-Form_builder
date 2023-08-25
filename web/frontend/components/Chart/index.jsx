import { Button, Card, Heading, Icon, OptionList, Popover } from '@shopify/polaris'
import React, { useEffect, useMemo, useState } from 'react'
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux';
import { NoteMajor } from "@shopify/polaris-icons";
import moment from 'moment';
import { fetchFormData, getSubmission } from '../../redux/actions/allActions';


const ChartDashboard = (props) => {
    const { chartTitle, submissionData, styles, popoverActive, setPopoverActive, toggleId, xaxisCategory } = props;
    const [series, setSeries] = useState([]);
    const [formStatus, setFormStatus] = useState([]);
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.inputField.finalFormData.formData);
    const appId = useSelector((state) => state.appId.appId);
    const submission = submissionData || useSelector(
        (state) => state.submission.submissionData.data
    );

    const togglePopover = (key) => {
        setPopoverActive({
            ...popoverActive, [key]: !popoverActive[key]
        });
    };

    useEffect(() => {
        dispatch(getSubmission(appId));
        dispatch(fetchFormData(appId));
    }, [dispatch])


    const activator = (
        <Button onClick={() => togglePopover(toggleId)} disclosure>
            Forms
        </Button>
    );
  
    const formTitleOption = useMemo(() => {
        const title = [];
        formData.map(formItem =>
            title.push({ label: formItem.customForm[0].formTitle, value: formItem._id })
        )
        return title;
    }, [formData])

    const [options, setOptions] = useState({
        xaxis: {
            categories: xaxisCategory,
        },
        chart: {
            id: 'form-chart',
            toolbar: {
                show: false,
            },
        },
        stroke: {
            width: new Array(formTitleOption.length).fill(3)
        },
        legend: {
            showForSingleSeries: true,
        },
    });

    const filterData = () => {
        const grouped = {}
        formStatus?.forEach((val) => {
            const data = submission && [...submission].filter(data => data.form === val)?.map((item) => moment(item.createdAt).format(`${toggleId === 'dailySubmission' ? "ddd" : 'MMM'}`))
            const dateCounts = {};
            xaxisCategory.map(val => dateCounts[val] = 0)
            data.map((item) => {
                if (dateCounts[item]) {
                    dateCounts[item]++;
                }
                else {
                    dateCounts[item] = 1;
                }
                grouped[val] = dateCounts;
            })
        })
        return grouped;
    }

    useEffect(() => {
        setFormStatus([formTitleOption[0]?.value])
    }, [submission]);

    useEffect(() => {
        setOptions({
            ...options,
            stroke: {
                width: new Array(formTitleOption.length).fill(3)
            },
            xaxis: {
                categories: xaxisCategory,
            },
        });

        const data = [];
        formStatus.map((item) => formTitleOption.find(formTitleItem => {
            if (item === formTitleItem.value) {
                data.push({
                    type: 'line',
                    name: formTitleItem.label,
                    data: [...Object.values(filterData()?.[item] || {})]
                })
            }
        }))

        setSeries(data);
    }, [formStatus])


    return (
        <Card sectioned>
            <div className={styles.submissions}>
                <div className={styles.submissionHeading}>
                    <Icon source={NoteMajor} color="base" />
                    <Heading>{chartTitle}</Heading>
                </div>
                <Popover
                    active={popoverActive[toggleId]}
                    activator={activator}
                    onClose={() => togglePopover(toggleId)}
                >
                    <OptionList
                        onChange={setFormStatus}
                        options={formTitleOption}
                        selected={formStatus}
                        allowMultiple
                    />
                </Popover>
            </div>

            <Chart
                options={options}
                series={series}
                width={500}
                height={400}
            />
        </Card>
    )
}

export default ChartDashboard