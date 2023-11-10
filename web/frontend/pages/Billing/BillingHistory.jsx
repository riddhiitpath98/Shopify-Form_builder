import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFormData,
  getApplicationCharge,
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
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge/utilities";
// import ModalLogs from "./ModalLogs";

const BillingHistory = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [logsData, setLogsData] = useState({});
  const shopId = useSelector((state) => state?.shopId?.shopId);

  const app = useAppBridge();
  const recurringCharges = useSelector(
      (state) => state?.recurringCharge?.recurringCharges
      );
//   const total_count = useSelector(
//     (state) => state?.anyAPISetting?.allApiLogsData?.total_count
//   );
//   const itemPrPage = 10;

//   const [currentPage, setCurrentPage] = useState(1);

  const resourceName = {
    singular: "bill",
    plural: "bills history",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(recurringCharges?.data);

  useEffect(() => {
    getSessionToken(app).then(response => {
        if (response) {
          dispatch(getApplicationCharge({ shopId, session: response }))
        }
      })
  }, [dispatch, shopId]);

//   useEffect(() => {
//     dispatch(
//       loadMoreLogs({
//         shopId,
//         page: currentPage,
//         per_page: itemPrPage,
//       })
//     );
//   }, [dispatch, currentPage, shopId]);

  const handleOpen = (data) => {
    setLogsData(data);
    setActive(true);
  };

  const handleClose = useCallback(() => {
    setActive(false);
    setLogsData({});
  }, []);

//   const fetchMoreData = async () => {
//     setCurrentPage(currentPage + 1);
//   };

  const loading = !shopId || recurringCharges?.loading;
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
    recurringCharges?.data &&
    recurringCharges?.data?.map((items, index) => (
      <IndexTable.Row
        id={items?.id}
        key={items?.id}
        selected={selectedResources.includes(items?.id)}
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
            <Text variation="strong">{items?.name}</Text>
          </a>
        </IndexTable.Cell>
        <IndexTable.Cell>{items?.price}</IndexTable.Cell>
        <IndexTable.Cell>{items?.status}</IndexTable.Cell>
        <IndexTable.Cell>
          {moment(items?.created_at).format("YYYY-MM-DD")}
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
            itemCount={recurringCharges?.data?.length || 0}
            emptyState={emptyStateMarkup}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            selectable={false}
            headings={[
              { title: "Subscription Name" },
              { title: "Price" },
              { title: "Status" },
              { title: "Created Date" },
            ]}
          >
            {rowMarkup}
          </IndexTable>
          {/* {allApiLogsDataArr.length < total_count ? (
            <div className="pagination_button">
              <Button primary onClick={fetchMoreData}>
                Load More
              </Button>
            </div>
          ) : null} */}
        </LegacyCard>
      </>
      {/* {active && (
        <ModalLogs
          item={logsData && logsData}
          open={active}
          formData={formData}
          handleClose={handleClose}
          findAPINameById={findAPINameById}
          findFormNameById={findFormNameById}
        />
      )} */}
    </Page>
  );
};

export default BillingHistory;
