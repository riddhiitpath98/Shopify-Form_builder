import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Icon, Link, TextField } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import {
  addFormData,
  createNupdateAppearance,
  createNupdateValidation,
  createNupdateAfterSubmit,
  updateFormData,
} from "../../../redux/actions/allActions";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { useNavigate, useParams } from "react-router-dom";
import { clearForm } from "../../../redux/reducers/inputFieldSlice";
import { formatter } from "../../../utils/function";
import { Icons } from "../../../constant";
import { setSelectedViewport } from "../../../redux/reducers/viewPortSlice";
import {
  setFormSubmitted,
  setShowMessage,
} from "../../../redux/reducers/submissionSlice";
import styles from "../FormStyle.module.css";
import "../PolarisFormListStyles.css";

const Topbar = ({ handleRedirectToForm }) => {
  const dispatch = useDispatch();
  const [titleValue, setTitleValue] = useState({ title: "New Form" });
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  const navigate = useNavigate();
  const { editFormId } = useParams();


  const selectedViewPort = useSelector(
    (state) => state.viewPort?.selectedViewport
  );

  const validation = useSelector(
    (state) => state.formSetting.validationData.data.validation
  );
  const appearance = useSelector(
    (state) => state.formSetting.appearanceData.data.appearance
  );

  const afterSubmit = useSelector(
    (state) => state.formSetting.afterSubmitData.data.afterSubmit
  );

  const updatedErrorMsg = useSelector(
    (state) => state.formSetting.validationData?.updatedValidation
  );
  const updatedAppearance = useSelector(
    (state) => state.formSetting.appearanceData?.updatedAppearance
  );
  const updatedAfterSubmit = useSelector(
    (state) => state.formSetting.afterSubmitData?.updatedAfterSubmit
  );

  const inputFields = useSelector((state) => state?.inputField?.inputFields);

  const headerFieldData = useSelector(
    (state) => state?.inputField?.headerFieldData
  );

  const footerFieldData = useSelector(
    (state) => state?.inputField?.footerFieldData
  );

  const allElementData = useSelector(
    (state) => state?.inputField?.allElementData
  );

  const finalFormData = useSelector(
    (state) => state?.inputField?.finalFormData
  );

  const formDataById = useSelector(
    (state) => state?.inputField?.editFormData?.formData?.customForm
  );

  const googelRecaptcha = useSelector(state => state?.inputField?.googelRecaptcha);
  const formTitle = formatter(formDataById)?.formTitle;

  const handleChange = (name, value) => {
    setTitleValue({
      [name]: value,
    });
  };

  const handleViewPortClick = (viewPort) => {
    dispatch(setSelectedViewport(viewPort));
  };

  const handleSubmit = () => {
    const combinedObjectArr = {
      enableReCaptcha: googelRecaptcha?.enable || false,
      customForm: [{ formTitle: titleValue.title },
      { header: headerFieldData },
      { element: inputFields },
      { allElements: allElementData },
      { footer: footerFieldData },
      ]
    };
    dispatch(
      addFormData({
        combinedObjectArr,
        updatedErrorMsg,
        updatedAppearance,
        updatedAfterSubmit,
      })
    );
  };
  const handleUpdate = () => {
    const updatedFormData = [
      { formTitle: titleValue.title },
      { header: headerFieldData },
      { element: inputFields },
      { allElements: allElementData },
      { footer: footerFieldData },
    ];
    dispatch(
      updateFormData({ _id: editFormId, updatedFormData: updatedFormData })
    );
    dispatch(
      createNupdateValidation({
        formId: editFormId,
        validationData: updatedErrorMsg || validation,
      })
    );
    dispatch(
      createNupdateAppearance({
        formId: editFormId,
        appearanceData: updatedAppearance || appearance,
      })
    );
    dispatch(
      createNupdateAfterSubmit({
        formId: editFormId,
        afterSubmitData: updatedAfterSubmit || afterSubmit,
      })
    );
  };

  useEffect(() => {
    if (finalFormData?.success === true) {
      dispatch(clearForm());
      dispatch(setFormSubmitted(false));
      dispatch(setShowMessage(false));
      fullscreen.dispatch(Fullscreen.Action.EXIT);
      navigate("/form", { replace: true });
    }
  }, [finalFormData?.success]);
  useEffect(() => {
    if (formTitle) {
      setTitleValue({
        title: formTitle,
      });
    }
  }, [formTitle]);

  return (
    <div>
      <div className={styles.topBar}>
        <div className={styles.sideBar}>
          <div className={styles.logo} onClick={handleRedirectToForm}>
            <Link url="/form">
              <Icon source={Icons.backArrow} className={styles.leftIcon} />
            </Link>
          </div>
          <div className={styles.backTitle} onClick={handleRedirectToForm}>
            <Link url="/form">
              <span>Back to List</span>
            </Link>
          </div>
        </div>
        <div className={styles.rightContext}>
          <div className={styles.innerContext}>
            <div className={styles.formNameWrapper}>
              <TextField
                labelHidden
                name="title"
                placeholder="Name your Form"
                value={titleValue?.title}
                onChange={(value) => handleChange("title", value)}
              />
            </div>
            <div className={styles.itemViewPort}>
              <ul className={styles.viewPortSelector}>
                <li
                  className={`${styles.mobileView} ${selectedViewPort === "mobile" ? styles.active : ""
                    }`}
                  onClick={() => handleViewPortClick("mobile")}
                >
                  <Icon source={Icons.mobile} />
                </li>
                <li
                  className={`${styles.desktopView} ${selectedViewPort === "desktop" ? styles.active : ""
                    }`}
                  onClick={() => handleViewPortClick("desktop")}
                >
                  <Icon source={Icons.desktop} />
                </li>
              </ul>
            </div>
            <div className={styles.itemAction}>
              <ButtonGroup>
                <Button onClick={handleRedirectToForm}>Cancel</Button>
                {editFormId ? (
                  <Button
                    primary
                    onClick={handleUpdate}
                    loading={finalFormData?.loading}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    primary
                    onClick={handleSubmit}
                    loading={finalFormData?.loading}
                  >
                    Save
                  </Button>
                )}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Topbar);
