import React, { useEffect, useMemo, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import styles from "./FormPreview.module.css";
import { addFormSubmission } from "../../../redux/reducers/inputFieldSlice";
import { useDispatch, useSelector } from "react-redux";

const CustomDatePicker = ({
  id,
  name,
  option,
  placeholder,
  dateFormat,
  timeFormat,
  width,
  inputStyles,
  handleDateTimeChange,
  value
}) => {

  const handleDateChange = (selectedDates, dateStr, instance) => {
    handleDateTimeChange(dateStr, name, id);
  };

  const customInputOptions = {
    className: styles.classicInput,
    placeholder: placeholder,
    readOnly: true,
  };

  const timeFormatValue = timeFormat === "24h" ? 'H:i' : 'h:i K';
  const options = useMemo(() => {
    if (option === "1") {
      return {
        noCalendar: false,
        enableTime: true,
        dateFormat: `${dateFormat} ${timeFormatValue}`,
      };
    } else if (option === "2") {
      return {
        noCalendar: false,
        enableTime: false,
        dateFormat: dateFormat,
      };
    } else if (option === "3") {
      return {
        noCalendar: true,
        enableTime: true,
        time_24hr: timeFormat === "24h" ? true : false,
        dateFormat: timeFormatValue,
      };
    }
  }, [option, dateFormat, timeFormat]);

  return (
    <Flatpickr
      key={option}
      options={options}
      style={{ ...inputStyles, width: width }}
      onChange={handleDateChange}
      value={value}
      {...customInputOptions}
    />
  );
};
export default CustomDatePicker;