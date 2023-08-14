import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banner } from "@shopify/polaris";
import { setShowMessage } from "../../../redux/reducers/submissionSlice";

const BannerCard = () => {
  
  const dispatch = useDispatch();
  
  const afterSubmitFields = useSelector(
    (state) => state.formSetting?.afterSubmitData?.afterSubmitFields
  );
  const bannerMessage = afterSubmitFields?.submitMessage;

  return (
    <Banner
      title= {<div dangerouslySetInnerHTML={{ __html: bannerMessage }}></div>}
      status="success"
      onDismiss={()=>dispatch(setShowMessage(false))}
    />
  );
};

export default BannerCard;
