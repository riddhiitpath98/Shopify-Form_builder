import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
  Page,
  EmptySearchResult,
  Button,
} from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFormToAPISettings,
  fetchFormData,
  getFormToAPISettings,
} from "../../redux/actions/allActions";
import { ToastContainer } from "react-toastify";
import { Icons } from "../../constant";

function APISettingsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shopId = useSelector((state) => state?.shopId?.shopId);
  const apiSettingData = useSelector(
    (state) => state?.anyAPISetting?.allApiSettingData
  );

  const formData = useSelector(
    (state) => state?.inputField?.finalFormData?.formData
  );

  const resourceName = {
    singular: "log",
    plural: "logs",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(apiSettingData?.data);

  useEffect(() => {
    dispatch(fetchFormData(shopId));
    dispatch(getFormToAPISettings(shopId));
  }, [dispatch, shopId]);

  function findFormNameById(formId) {
    const matchingForm = formData?.find((form) => form._id === formId);
    if (matchingForm) {
      return matchingForm?.customForm[0]?.formTitle;
    }
    return "Form not found";
  }

  const handleAddAPIData = () => {
    navigate("/add-api");
  };

  const rowMarkup =
    apiSettingData?.data &&
    apiSettingData?.data?.map(
      ({ _id, apiTitle, elementKey, createdAt, form }, index) => (
        <IndexTable.Row
          id={_id}
          key={_id}
          selected={selectedResources.includes(_id)}
          position={index}
        >
          <IndexTable.Cell>
            {findFormNameById(form)}
          </IndexTable.Cell>
          <IndexTable.Cell>{apiTitle}</IndexTable.Cell>
          <IndexTable.Cell>{JSON.stringify(elementKey)}</IndexTable.Cell>
          <IndexTable.Cell>
            {moment(createdAt).format("YYYY-MM-DD")}
          </IndexTable.Cell>
          <IndexTable.Cell>
            <div style={{display: "flex",justifyContent: "center"}}>
            <div style={{marginRight: "12px"}}>
            <Button plain icon={Icons.delete} onClick={() => dispatch(deleteFormToAPISettings({ deleteLogArr: _id, shopId: shopId }))}></Button>
            </div>
            <div>
            <Button plain icon={Icons.edit} onClick={() => navigate(`/add-api/${_id}`)}></Button></div>
          </div>
          </IndexTable.Cell>
        </IndexTable.Row>
      )
    );

  const loading = !shopId || apiSettingData?.loading;
  const emptyStateMarkup = (
    <>
      {!loading ? <EmptySearchResult
        title={'No logs found'}
        description={'Try changing the filters or search term'}
        withIllustration
      /> : null}
    </>
  );

  return (
    <Page
      fullWidth
      title="Logs"
      primaryAction={{
        content: "Add new API",
        onAction: () => handleAddAPIData(),
      }}
    >
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          loading={loading}
          itemCount={apiSettingData?.data?.length}
          emptyState={emptyStateMarkup}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          selectable={false}
          headings={[
            { title: "Form Name" },
            { title: "API Name" },
            { title: "Log" },
            { title: "Created Date" },
            { title: "Action", alignment: "center" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
      <ToastContainer />
    </Page>
  );
}
export default APISettingsList;
