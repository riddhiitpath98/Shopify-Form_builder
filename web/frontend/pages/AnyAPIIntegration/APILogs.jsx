import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFormData,
  getFormToAPISettings,
  loadMoreLogs,
} from "../../redux/actions/allActions";
import {
  Button,
  EmptySearchResult,
  IndexTable,
  LegacyCard,
  Modal,
  Page,
  Text,
  TextContainer,
  useIndexResourceState,
} from "@shopify/polaris";
import moment from "moment";
import ModalLogs from "./ModalLogs";

const APILogs = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [logsData, setLogsData] = useState({});
  const shopId = useSelector((state) => state?.shopId?.shopId);

  const allApiLogsDataArr = useSelector(
    (state) => state?.anyAPISetting?.allApiLogsData?.data
  );
  const total_count = useSelector(
    (state) => state?.anyAPISetting?.allApiLogsData?.total_count
  );
  const itemPrPage = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const allApiLogsData = useSelector(
    (state) => state?.anyAPISetting?.allApiLogsData
  );

  const formData = useSelector(
    (state) => state?.inputField?.finalFormData?.formData
  );

  const apiSettingData = useSelector(
    (state) => state?.anyAPISetting?.allApiSettingData
  );

  const resourceName = {
    singular: "log",
    plural: "logs",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(allApiLogsData?.data);

  useEffect(() => {
    dispatch(fetchFormData(shopId));
  }, [dispatch, shopId]);

  useEffect(() => {
    dispatch(
      loadMoreLogs({
        shopId,
        page: currentPage,
        per_page: itemPrPage,
      })
    );
  }, [dispatch, currentPage, shopId]);

  function findFormNameById(formId) {
    const matchingForm = formData?.find((form) => form._id === formId);
    if (matchingForm) {
      return matchingForm?.customForm[0]?.formTitle;
    }
    return "Form not found";
  }

  function findAPINameById(apiId) {
    const matchingForm = apiSettingData?.data?.find(
      (apiData) => apiData._id === apiId
    );
    if (matchingForm) {
      return matchingForm?.apiTitle;
    }
    return "API Title not found";
  }

  const handleOpen = (data) => {
    setLogsData(data);
    setActive(true);
  };

  const handleClose = useCallback(() => {
    setActive(false);
    setLogsData({});
  }, []);

  const fetchMoreData = async () => {
    setCurrentPage(currentPage + 1);
  };

  const loading = !shopId || allApiLogsData?.loading;
  const emptyStateMarkup = (
    <>
      {!loading ? (
        <EmptySearchResult
          title={"No logs found"}
          description={"Try changing the filters or search term"}
          withIllustration
        />
      ) : null}
    </>
  );

  const rowMarkup =
    allApiLogsData?.data &&
    allApiLogsData?.data?.map((items, index) => (
      <IndexTable.Row
        id={items?._id}
        key={items?._id}
        selected={selectedResources.includes(items?._id)}
        onClick={() => handleOpen(items)}
        position={index}
      >
        <IndexTable.Cell>
          <a
            className={
              "Polaris-Link Polaris-Link--monochrome Polaris-Link--removeUnderline"
            }
            href="#"
            data-primary-link={true}
            data-polaris-unstyled={true}
          >
            <Text variation="strong">{findFormNameById(items?.formId)}</Text>
          </a>
        </IndexTable.Cell>
        <IndexTable.Cell>{findAPINameById(items?.apiId)}</IndexTable.Cell>
        <IndexTable.Cell className="ips-custom-cell">{JSON.stringify(items?.log)}</IndexTable.Cell>
        <IndexTable.Cell>
          {moment(items?.createdAt).format("YYYY-MM-DD")}
        </IndexTable.Cell>
      </IndexTable.Row>
    ));
  return (
    <Page fullWidth title="Logs">
      <>
        <LegacyCard>
          <IndexTable
            resourceName={resourceName}
            loading={loading}
            itemCount={allApiLogsData?.data?.length || 0}
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
            ]}
          >
            {rowMarkup}
          </IndexTable>
          {allApiLogsDataArr.length < total_count ? (
            <div className="ips-pagination_button">
              <Button primary onClick={fetchMoreData}>
                Load More
              </Button>
            </div>
          ) : null}
        </LegacyCard>
      </>
      {active && (
        <ModalLogs
          item={logsData && logsData}
          open={active}
          formData={formData}
          handleClose={handleClose}
          findAPINameById={findAPINameById}
          findFormNameById={findFormNameById}
        />
      )}
    </Page>
  );
};

export default APILogs;
