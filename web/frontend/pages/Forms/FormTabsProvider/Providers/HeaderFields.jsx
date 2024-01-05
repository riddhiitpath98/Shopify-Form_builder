import { useEffect, useState } from "react";
import { Icon } from "@shopify/polaris";
import { InputTypeProvider } from "./InputTypeProvider";
import { useDispatch, useSelector } from "react-redux";
import { addHeaderElement } from "../../../../redux/reducers/inputFieldSlice";
import { Icons } from "../../../../constant";
import styles from "../../FormStyle.module.css";

const HeaderFields = ({ isEdit, tabId, toggleDrawer }) => {
  const { id, title, attributes } = tabId;
  const dispatch = useDispatch();

  const headerFieldData = useSelector(
    (state) => state?.inputField?.headerFieldData
  );

  const [headerData, setHeaderData] = useState({
    showHeader: headerFieldData?.attributes
      ? headerFieldData?.attributes?.showHeader
      : attributes.showHeader,
    title: headerFieldData?.attributes?.title
      ? headerFieldData?.attributes?.title
      : attributes.title,
    description: headerFieldData?.attributes
      ? headerFieldData?.attributes?.description
      : attributes.description,
  });
  
  useEffect(() => {
    setHeaderData({
      showHeader: headerFieldData?.attributes
        ? headerFieldData?.attributes?.showHeader
        : attributes.showHeader,
      title: headerFieldData?.attributes?.title
        ? headerFieldData?.attributes?.title
        : attributes.title,
      description: headerFieldData?.attributes
        ? headerFieldData?.attributes?.description
        : attributes.description,
    });
  }, []);

  const handleChange = (name, value) => {
    const updatedCommonFormInputs = { ...headerData, [name]: value };
    setHeaderData(updatedCommonFormInputs);
    dispatch(
      addHeaderElement({
        id,
        title,
        attributes: updatedCommonFormInputs,
        formTitleData: updatedCommonFormInputs,
      })
    );
  };

  const customHeaderFields = [
    {
      id: "header_show_element",
      label: "Show Header",
      type: "checkbox",
      name: "showHeader",
      checked: headerData.showHeader,
      handleChange,
    },
    {
      id: "header_title_element",
      label: "Title",
      type: "text",
      name: "title",
      value: headerData.title,
      handleChange,
    },
    {
      id: "header_desc_element",
      label: "Description",
      type: "text",
      name: "description",
      value: headerData.description,
      handleChange,
    },
  ];

  return (
    <>
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
                {customHeaderFields?.map(({ id, type, ...otherData }) => (
                  <div className={styles.formFields}>
                    <div className={styles.textWrapper}>
                      <InputTypeProvider key={id} {...{ type, ...otherData }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeaderFields;
