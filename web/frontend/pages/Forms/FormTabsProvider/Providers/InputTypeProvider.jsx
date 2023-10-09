import {
  Button,
  Checkbox,
  ChoiceList,
  Select,
  TextField,
} from "@shopify/polaris";
import { removeElement } from "../../../../redux/reducers/inputFieldSlice";
import { useDispatch, useSelector } from "react-redux";
import MultiSelectDropdown from "../../../../components/MultiSelectDropdown/MultiSelectDropdown";
import Editor from "../../../../components/CKEditor";
import styles from "../../FormStyle.module.css";

export const InputTypeProvider = ({
  type,
  name,
  handleChange,
  title,
  label,
  selected,
  id,
  tabId,
  radioOptions,
  selectedOptions,
  handleOptionSelect,
  toggleDrawer,
  handleTagChange,
  tagValue,
  radioTagValue,
  multiSelectOptions,
  value,
  dateFormatOptions,
  timeFormatOptions,
  dropdownTagValue,
  placeholder,
  handleHtmlInputChange,
  show,
  IsShowConfirmPassword,
  hiddenOptions,
  ...props
}) => {

  const dispatch = useDispatch();
  const handleRemoveElement = (tabId) => {
    dispatch(removeElement({ id: tabId?.inputId }));
    toggleDrawer();
  };

  switch (type) {
    case "text":
      return (
        <TextField
          {...{ type, label }}
          value={value}
          min={0}
          max={20}
          onChange={(value) => {
            handleChange(name, value);
          }}
          {...props}
        />
      );
    case "conditional_text":
      return (
        <div className={!IsShowConfirmPassword ? styles.hideLimit : ""}>
          <TextField
            type="text"
            {...{ label }}
            value={value}
            onChange={(value) => {
              handleChange(name, value);
            }}
            {...props}
          />
        </div>
      );
    case "number":
      return (
        <div className={!show ? styles.hideLimit : ""}>
          <TextField
            {...{ type, label }}
            value={value}
            min={0}
            max={20}
            onChange={(value) => {
              handleChange(name, value);
            }}
            {...props}
          />
        </div>
      );
    case "checkbox":
      return (
        <Checkbox
          {...{ type, label }}
          onChange={(check) => handleChange(name, check)}
          {...props}
        />
      );
    case "custom_select":
      return (
        <MultiSelectDropdown
          options={multiSelectOptions}
          selectedOptions={selectedOptions}
          handleOptionSelect={handleOptionSelect}
          title={title}
        />
      );
    case "textarea":
      return (
        <>
          <label>{label}</label>
          <br />
          <textarea
            value={
              String(tagValue)?.replace(/,/g, "\n") ||
              String(radioTagValue)?.replace(/,/g, "\n") ||
              String(dropdownTagValue)?.replace(/,/g, "\n")
            }
            id={id}
            name={name}
            onChange={(event) => handleTagChange(event)}
            style={{ width: "80%", resize: "none", maxHeight: "200px", minHeight: "80px" }}
            rows={3}
            placeholder="Type an option and press Enter"
          ></textarea>
        </>
      );
    case "select":
      let options;
      if (name === "dateFormat") {
        options = dateFormatOptions;
      } else if (name === "timeFormat") {
        options = timeFormatOptions;
      } else if (name === "dropdown_default_value") {
        options = selected;
      } else if (name === "dataType") {
        options = hiddenOptions;
      }
      return (
        <Select
          id={id}
          name={name}
          label={label}
          placeholder={placeholder}
          options={options || selected}
          value={value}
          onChange={(value) => handleChange(name, value)}
        />
      );
    case "editor":
      return (
        <Editor
          name={name}
          id={id}
          label={label}
          value={value}
          handleEditiorChange={(e, editor) => {
            handleChange(name, editor?.getData());
          }}
        />
      );
    case "date_time_format":
      return (
        <ChoiceList
          title={title}
          choices={[
            { label: "Date & time", value: "1" },
            { label: "Date", value: "2" },
            { label: "Time", value: "3" },
          ]}
          selected={selected}
          value={value}
          onChange={(value) => handleChange(name, value)}
        />
      );
    case "no_of_options":
      return (
        <ChoiceList
          title={title}
          choices={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
          ]}
          selected={selected}
          onChange={(value) => handleChange(name, value)}
        />
      );
    case "text_alignment":
      return (
        <ChoiceList
          title={title}
          choices={[
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ]}
          selected={selected}
          onChange={(value) => handleChange(name, value)}
        />
      );
    case "choice_list":
      return (
        <>
          <ChoiceList
            title={title}
            choices={[
              { label: "33%", value: "33%" },
              { label: "50%", value: "50%" },
              { label: "100%", value: "100%" },
            ]}
            selected={selected}
            onChange={(value) => handleChange(name, value)}
          />

          <Button
            plain
            destructive
            fullWidth
            onClick={() => handleRemoveElement(tabId)}
          >
            Remove this element
          </Button>
        </>
      );
    case "HTML":
      return (
        <>
          <label>{label}</label>
          <br />
          <textarea
            value={value}
            id={id}
            name={name}
            onChange={(event) => handleHtmlInputChange(event)}
            style={{ width: "80%" }}
            rows={3}
            placeholder="Type HTML code here"
          ></textarea>
        </>
      );
    case "button":
      return (
        <Button
          plain
          destructive
          fullWidth
          onClick={() => handleRemoveElement(tabId)}
        >
          Remove this element
        </Button>
      );
    default:
      return null;
  }
};
