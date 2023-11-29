import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  Modal,
} from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFormToAPISettings,
  fetchFormData,
  getFormToAPISettings,
} from "../../redux/actions/allActions";
import { ToastContainer } from "react-toastify";
import { Icons } from "../../constant";
import CommonModal from "../../components/CommonModal";

function APISettingsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const shopId = useSelector((state) => state?.shopId?.shopId);

  const apiSettingData = useSelector(
    (state) => state?.anyAPISetting?.allApiSettingData
    );
    console.log('apiSettingData: ', apiSettingData);
  const formData = useSelector(
    (state) => state?.inputField?.finalFormData?.formData
  );

  const resourceName = {  
    singular: "apiList",
    plural: "apiLists",
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

  const handleOpen = (id) => {
    setSelectedItemId(id);
    setActive(true);
  };

  const handleClose = useCallback(() => {
    setActive(false);
  }, []);

  const handleDelete = () => {
    dispatch(
      deleteFormToAPISettings({
        deleteLogArr: selectedItemId,
        shopId: shopId,
      })
    );
    setActive(false);
  };

  const rowMarkup =
    apiSettingData?.data &&
    apiSettingData?.data?.map(
      ({ _id, apiTitle, apiUrl, createdAt, updatedAt, form }, index) => (
        <IndexTable.Row
          id={_id}
          key={_id}
          selected={selectedResources.includes(_id)}
          position={index}
        >
          <IndexTable.Cell>{findFormNameById(form)}</IndexTable.Cell>
          <IndexTable.Cell>{apiTitle}</IndexTable.Cell>
          <IndexTable.Cell>{apiUrl}</IndexTable.Cell>
          <IndexTable.Cell>
            {moment(createdAt).format("YYYY-MM-DD")}
          </IndexTable.Cell>
          <IndexTable.Cell>
            {moment(updatedAt).format("YYYY-MM-DD")}
          </IndexTable.Cell>
          <IndexTable.Cell>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ marginRight: "12px" }}>
                <Button
                  plain
                  icon={Icons.edit}
                  onClick={() => navigate(`/edit-api/${_id}`)}
                />
              </div>
              <div>
                <Button
                  plain
                  icon={Icons.delete}
                  onClick={() => handleOpen(_id)}
                />
              </div>
            </div>
          </IndexTable.Cell>
        </IndexTable.Row>
      )
    );

  const loading = !shopId || apiSettingData?.loading;
  const emptyStateMarkup = (
    <>
      {!loading ? (
        <EmptySearchResult
          title={"No APIs found"}
          // description={"Try changing the filters or search term"}
          withIllustration
        />
      ) : null}
    </>
  );

  return (
    <Page
      fullWidth
      title="All API"
      primaryAction={{
        content: "Add new API",
        onAction: () => handleAddAPIData(),
      }}
    >
      <>
        <LegacyCard>
          <IndexTable
            resourceName={resourceName}
            loading={loading}
            itemCount={apiSettingData?.data?.length || 0}
            emptyState={emptyStateMarkup}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            selectable={false}
            headings={[
              { title: "Form Name" },
              { title: "API Name" },
              { title: "API URL" },
              { title: "Created Date" },
              { title: "Updated Date" },
              { title: "Action", alignment: "center" },
            ]}
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
        <ToastContainer />
      </>
      {active && (
        <CommonModal
          {...{ active, handleClose, handleDelete }}
          title="Are you sure to delete selected API data?"
          description="<p><strong>Note:</strong> Deleting this API will also remove the logs created for this API</p>"
        />
      )}
    </Page>
  );
}
export default APISettingsList;
