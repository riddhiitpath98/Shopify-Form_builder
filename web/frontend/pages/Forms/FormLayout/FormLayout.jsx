import React, { useEffect, useMemo } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../FormTopBar/Topbar";
import FormSidebar from "../FormSidebar/FormSidebar";
import { useDispatch, useSelector } from "react-redux";
import FormPreview from "../FormPreview";
import { clearForm } from "../../../redux/reducers/inputFieldSlice";
import {
  fetchFormDataById,
  getAfterSubmitByFormId,
  getAppearanceByFormId,
  getValidationByFormId,
} from "../../../redux/actions/allActions";
import {
  appearanceAttributes,
  formSubmittAttributes,
  validationAttributes,
} from "../../../constant";
import {
  updatedAfterSubmitPayload,
  updatedAppearancePayload,
  updatedValidationPayload,
} from "../../../redux/reducers/formSettingSlice";
import "../PolarisFormListStyles.css";
import { setSelectedViewport } from "../../../redux/reducers/viewPortSlice";
import { setFormSubmitted, setShowMessage } from "../../../redux/reducers/submissionSlice";

const FormLayout = ({ isEdit }) => {
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  const user = useSelector(state => state.user.userData.user);
  const { editFormId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationFeild = useMemo(() => {
    let data = [];
    validationAttributes.map((validateItem, index) => {
      data = [
        ...data,
        {
          id: validateItem.id,
          label: validateItem.label,
          type: "text",
          name: validateItem.name,
          value: validateItem.message,
        },
      ];
    });
    return data;
  }, []);

  const appearanceFields = useMemo(() => {
    let data = [];
    appearanceAttributes.map((appearanceItem) => {
      data = [
        ...data,
        {
          id: appearanceItem.id,
          label: appearanceItem.label,
          type: appearanceItem.type,
          name: appearanceItem.name,
          placeholder: appearanceItem.placeholder || "",
          value: appearanceItem.value,
          options: appearanceItem.options || [],
        },
      ];
    });
    return data;
  }, []);

  const afterSubmitFeild = useMemo(() => {
    let data = [];
    formSubmittAttributes.map((submitItem) => {
      data = [
        ...data,
        {
          id: submitItem.id,
          label: submitItem.label,
          type: submitItem.type,
          name: submitItem.name,
          value: submitItem.value,
          options: submitItem.options || "",
        },
      ];
    });
    return data;
  }, []);

  useEffect(() => {
    if (isEdit && editFormId) {
      fullscreen.dispatch(Fullscreen.Action.ENTER);
      dispatch(fetchFormDataById(editFormId));
      dispatch(getValidationByFormId(editFormId));
      dispatch(getAppearanceByFormId(editFormId));
      dispatch(getAfterSubmitByFormId(editFormId));
    }
  }, [dispatch, isEdit, editFormId]);

  useEffect(() => {
    if (!isEdit) {
      fullscreen.dispatch(Fullscreen.Action.ENTER);
      dispatch(updatedValidationPayload(validationFeild));
      dispatch(updatedAppearancePayload(appearanceFields));
      dispatch(updatedAfterSubmitPayload(afterSubmitFeild));
    }
  }, [dispatch]);

  const handleRedirectToForm = () => {
    dispatch(clearForm());
    dispatch(setSelectedViewport("desktop"))
    dispatch(updatedValidationPayload([]));
    dispatch(updatedAppearancePayload([]));
    dispatch(updatedAfterSubmitPayload([]));
    dispatch(setFormSubmitted(false))
    dispatch(setShowMessage(false))
    fullscreen.dispatch(Fullscreen.Action.EXIT);
    navigate("/form", { replace: true });
  };

  return (
    <div>
      <Topbar handleRedirectToForm={handleRedirectToForm} />
      <FormSidebar {...{ isEdit }} />
      <FormPreview {...{ isEdit }} />
    </div>
  );
};
export default React.memo(FormLayout);
