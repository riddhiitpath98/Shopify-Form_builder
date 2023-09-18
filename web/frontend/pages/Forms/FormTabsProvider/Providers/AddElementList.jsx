import React from "react";
import { Icon } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addElement } from "../../../../redux/reducers/inputFieldSlice";
import { Icons } from "../../../../constant";
import styles from "../../FormStyle.module.css";
import useElements from "../../../../hooks/useElements";

const AddElementList = ({ isEdit, tabId, toggleDrawer }) => {
  const user = useSelector(state => state.user.userData.data)
  const { elements } = useElements()

  const { title } = tabId;
  const dispatch = useDispatch();

  const handleRedirectToFields = (data) => {
    const id = uuidv4();
    const inputId = id.slice(0, 8);
    dispatch(addElement({ ...data, inputId, isEdit }));
    toggleDrawer();
  };

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
                {elements(user.subscriptionName)?.map(({ label, fields }, index) => (
                  <div className={styles.contentWrapper} key={index}>
                    <div>
                      <div className={styles.subHeading}>{label}</div>
                      <div>
                        {fields?.map((data, index) => (
                          <div className={styles.contentWrapper} key={index}>
                            <div className={styles.listItem}>
                              <div
                                className={styles.row}
                                onClick={() => handleRedirectToFields(data)}
                              >
                                <div className={styles.elementIcon}>
                                  <Icon source={data?.icon} />
                                </div>
                                <div className={styles.elementTitle}>
                                  <div>
                                    <div>{data?.title}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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

export default AddElementList;
