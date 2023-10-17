import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  IndexTable,
  LegacyCard,
  useIndexResourceState,
  Text,
  Badge,
  Page,
} from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { deleteFormToAPISettings, getFormToAPISettings } from "../../redux/actions/allActions";

function APISettingsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shopId = useSelector((state) => state?.shopId?.shopId);
  const apiSettingData = useSelector((state) => state?.anyAPISetting?.allApiSettingData);
  
  const orders = [
    {
      id: "1020",
      order: "#1020",
      date: "Jul 20 at 4:34pm",
      customer: "Jaydon Stanton",
      total: "$969.44",
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: "1019",
      order: "#1019",
      date: "Jul 20 at 3:46pm",
      customer: "Ruben Westerfelt",
      total: "$701.19",
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: "1018",
      order: "#1018",
      date: "Jul 20 at 3.44pm",
      customer: "Leo Carder",
      total: "$798.24",
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
  ];
  const resourceName = {
    singular: "log",
    plural: "logs",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  useEffect(() => {
    dispatch(getFormToAPISettings(shopId));
  }, [dispatch,shopId]);

  const handleAddAPIData = () => {
    navigate("/add-api");
  };
  const rowMarkup = orders.map(
    (
      { id, order, date, customer, total, paymentStatus, fulfillmentStatus },
      index
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>{total}</IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  const promotedBulkActions = [
    {
      content: "Delete Log",
      onAction: () => {dispatch(deleteFormToAPISettings(formId))},
    },
  ];

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
          itemCount={orders.length}
          selectedItemsCount={
            allResourcesSelected ? "All" : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: "Form Name" },
            { title: "API Name" },
            { title: "Log" },
            { title: "Created Date", alignment: "end" },
          ]}
          promotedBulkActions={promotedBulkActions}
        >
          {rowMarkup}
        </IndexTable>
      </LegacyCard>
    </Page>
  );
}
export default APISettingsList;
