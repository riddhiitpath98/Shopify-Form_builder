import React, { useEffect, useState } from "react";
import { Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { Icons } from "../../../constant";
import { SettingsInputTypeProvider } from "./SettingsInputTypeProvider";
import { updatedAppearancePayload } from "../../../redux/reducers/formSettingSlice";
import styles from "../FormStyle.module.css";

const AppearanceFields = ({ isEdit, tabId, toggleDrawer }) => {
  const { title, attributes } = tabId;
  const dispatch = useDispatch();

  const appearanceData = useSelector(
    (state) => state.formSetting.appearanceData?.data?.appearance
  );
  const updatedAppearance = useSelector(
    (state) => state.formSetting.appearanceData?.updatedAppearance
  );
  const appearanceFields = useSelector(
    (state) => state.formSetting?.appearanceData?.appearanceFields
  );

  const [appearance, setAppearance] = useState(
    updatedAppearance?.length > 0
      ? updatedAppearance
      : appearanceData
  );
  const [selectedColor, setSelectedColor] = useState("");
  const [showColorPicker, setShowColorPicker] = useState({});
  const [conditionalValue, setConditionalValue] = useState({});

  const handleColorPickerToggle = (name) => {
    setShowColorPicker((prevShowColorPicker) => ({
      [name]: !prevShowColorPicker[name],
    }));
  };
  const handleChange = (name, value) => {
    if (value === "image") {
      setConditionalValue({ [value]: true });
    } else if (value === "none" || value === "color") {
      if (value === "color") {
        setConditionalValue({ [value]: true });
      }
      else {
        setConditionalValue({ [value]: false })
      }

    }
    const updatedValue = name === "appearanceWidth" ? value + "px" : value;
    const newArray = appearance.map((item, i) => {
      if (item.name === name) {
        return { ...item, value: updatedValue };
      } else {
        return item;
      }
    });
    setAppearance(newArray);
    dispatch(updatedAppearancePayload(newArray));
  };

  useEffect(() => {
    setConditionalValue({
      [appearanceFields?.appearanceBackground]: true
    })
  }, [])

  return (
    <div>
      <div className={`${styles.nested} ${styles.toggle}`}>
        <div className={styles.nestedHeader}>
          <div className={styles.backIcon} onClick={toggleDrawer}>
            <Icon source={Icons.backArrow} />
          </div>
          <div className={styles.nestedTitle}>{title}</div>
        </div>
        <div className={styles.nestedContent}>
          <div>
            <div>
              {appearance &&
                appearance?.map(
                  ({
                    id,
                    type,
                    label,
                    name,
                    value,
                    options,
                    defaultColor,
                    ...otherData
                  }) => (

                    <div className={styles.formFields} key={id} onClick={() => showColorPicker[name] && handleColorPickerToggle(name)}>
                      <div className={styles.textWrapper}>
                        <SettingsInputTypeProvider
                          key={id}
                          {...{
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
                            conditionalValue,
                            setShowColorPicker,
                            ...otherData,
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AppearanceFields;
