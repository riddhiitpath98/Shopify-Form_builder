import {
  Button,
  Checkbox,
  ChoiceList,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import Editor from "../../../components/CKEditor";
import { SketchPicker } from "react-color";
import styles from "../FormStyle.module.css";
import { useEffect } from "react";

export const SettingsInputTypeProvider = ({
  id,
  type,
  label,
  name,
  value,
  options,
  appearance,
  defaultColor,
  selectedColor,
  showColorPicker,
  tabId,
  toggleDrawer,
  handleChange,
  // handleColorChange,
  handleColorPickerToggle,
  setShowColorPicker = () => { },
  conditionalValue,
  isRedirect,
  description,
  ...props
}) => {
  const handleClickOutside = (event) => {
    if (!event.target.closest(".color-picker")) {
      setShowColorPicker({});
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  switch (type) {
    case "text":
      return (
        <TextField
          {...{ type, label }}
          value={value}
          onChange={(value) => {
            handleChange(name, value);
          }}
          {...props}
        />
      );
    case "conditional_text":
      return (
        <div>
          {conditionalValue.image ? (
            <TextField
              type="text"
              {...{ label }}
              value={value}
              helpText={
                <>
                  <span>
                    Upload your background image to Shopify then use it's URL to
                    fill in.
                  </span>
                  <br />
                  <a
                    className={styles.helperLink}
                    href="https://help.shopify.com/en/manual/shopify-admin/productivity-tools/file-uploads"
                    target="_blank"
                  >
                    Learn more
                  </a>
                </>
              }
              onChange={(value) => {
                handleChange(name, value);
              }}
              {...props}
            />
          ) : null}
        </div>
      );
    case "number":
      return (
        <TextField
          {...{ type, label }}
          value={name === "appearanceWidth" && String(value)?.replace("%", "")}
          prefix="%"
          max={100}
          onChange={(value) => {
            handleChange(name, value);
          }}
          helpText="The form has a maximum width of 100%."
          {...props}
        />
      );
    case "select":
      return (
        <Select
          id={id}
          name={name}
          label={label}
          options={options}
          value={value}
          onChange={(value) => handleChange(name, value)}
        />
      );
    case "conditional_select":
      return (
        <div>
          {conditionalValue.image ? (
            <Select
              id={id}
              name={name}
              label={label}
              options={options}
              value={value}
              onChange={(value) => handleChange(name, value)}
            />
          ) : null}
        </div>
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
    case "color_panel":
      return (
        <div className={styles.colorBox}>
          <button
            id={id}
            className={styles.previewColor}
            style={{ background: value }}
            onClick={() => handleColorPickerToggle(name)}
          ></button>
          <div className={styles.colorLabel}>{label}</div>
          <div className={styles.pickerWrapper}>
            {showColorPicker[name] && (
              <>
                <div onClick={() => handleColorPickerToggle(name)}>
                  <SketchPicker
                    className="color-picker"
                    color={value}
                    onChange={(color) => handleChange(name, color.hex)}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      );
    case "conditional_color_panel":
      return (
        <div>
          {conditionalValue?.color ? (
            <div className={styles.colorBox}>
              <button
                id={id}
                className={styles.previewColor}
                style={{ background: value }}
                onClick={() => handleColorPickerToggle(name)}
              ></button>
              <div className={styles.colorLabel}>{label}</div>
              <div className={styles.pickerWrapper}>
                {showColorPicker[name] && (
                  <>
                    <div onClick={() => handleColorPickerToggle(name)}>
                      <SketchPicker
                        color={value}
                        className="color-picker"
                        onChange={(color) => handleChange(name, color.hex)}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </div>
      );
    case "conditional_url":
      return (
        <div>
          {isRedirect?.pageRedirect ? (
            <TextField
              {...{ type, label }}
              name={name}
              value={value}
              onChange={(value) => {
                handleChange(name, value);
              }}
              {...props}
            />
          ) : null}
        </div>
      );
    default:
      return null;
  }
};
