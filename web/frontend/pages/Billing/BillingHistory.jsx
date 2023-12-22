import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFormData,
  getApplicationCharge,
  getFormToAPISettings,
  getInvoice,
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
import { PLAN_DETAILS } from "../../constant";
// import ModalLogs from "./ModalLogs";

const BillingHistory = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [logsData, setLogsData] = useState({});
  const shopId = useSelector((state) => state?.shopId?.shopId);
  const user = useSelector(state => state.user.userData?.user)
  const invoiceData = useSelector(state => state.user.invoiceData)

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

  // useEffect(() => {
  //   dispatch(getInvoice({ id: user?.subscription?.customerId, priceId: PLAN_DETAILS.PREMIUM, shopId }))
  // }, [dispatch]);

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
    invoiceData?.data &&
    invoiceData?.data?.map((items, index) => (
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
            <Text variation="strong">${items?.amount_paid / 100}</Text>
          </a>
        </IndexTable.Cell>
        <IndexTable.Cell>{items?.currency.toUpperCase()}</IndexTable.Cell>
        <IndexTable.Cell>{items?.status}</IndexTable.Cell>
        <IndexTable.Cell>{items?.status === 'paid' ? "-" : items?.amount_due}</IndexTable.Cell>
        <IndexTable.Cell>
          {moment(new Date(items?.lines?.data[0]?.period?.start * 1000)).format('YYYY-MM-DD HH:mm:ss')}
        </IndexTable.Cell>
        <IndexTable.Cell>
          {moment(new Date(items?.lines?.data[0]?.period?.end * 1000)).format('YYYY-MM-DD HH:mm:ss')}
        </IndexTable.Cell>
      </IndexTable.Row>
    ));
  return (
    <Page fullWidth title="Logs">
      <>
        <LegacyCard>
          <IndexTable
            resourceName={resourceName}
            loading={invoiceData?.loading}
            itemCount={invoiceData?.data?.length || 0}
            emptyState={emptyStateMarkup}
            selectedItemsCount={
              allResourcesSelected ? "All" : selectedResources.length
            }
            onSelectionChange={handleSelectionChange}
            selectable={false}
            headings={[
              { title: "AMOUNT" },
              { title: "CURRENCY" },
              { title: "STATUS" },
              { title: "DUE AMOUNT" },
              { title: "START DATE" },
              { title: "END DATE" }
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
