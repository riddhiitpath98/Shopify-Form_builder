import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import {
  ResourceList,
  ResourceItem,
  Page,
  Button,
  Icon,
  Tooltip,
  Select,
  SkeletonDisplayText,
  SkeletonThumbnail,
  LegacyCard,
} from "@shopify/polaris";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFormData, fetchFormData } from "../../redux/actions/allActions";
import ToggleSwitch from "../../components/ToggleSwitch";
import { ToastContainer } from "react-toastify";
import Nodatafound from "../../components/NodataFound";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../constant";
import styles from "./FormStyle.module.css";
import "./PolarisFormListStyles.css";

function FormList() {
  const [sortValue, setSortValue] = useState("DATE_MODIFIED_DESC");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [deleteFormArr, setDeleteFormArr] = useState([]);

  const app = useAppBridge();
  const dispatch = useDispatch();
  const fullscreen = Fullscreen.create(app);
  const navigate = useNavigate();

  const appId = useSelector((state) => state.appId.appId);

  const formData = useSelector((state) => state?.inputField?.finalFormData);
  const handleSubmission = (id) => {
    navigate("/submissions", { state: { id: id } });
  };

  const handleCopyCode = (id) => {

    const filter = formData.formData?.filter?.(item => item._id === id)
    const textToCopy = `<div id="form-builder-ips" data-ap-key='${appId}' data-key='${filter[0].isVisible ? id : ""}'></div>`;
    navigator.clipboard.writeText(textToCopy)
  }

  const sortedItems = useMemo(() => {
    switch (sortValue) {
      case "DATE_MODIFIED_DESC":
        return [...formData?.formData].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "DATE_MODIFIED_ASC":
        return [...formData?.formData].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      default:
        return formData?.formData;
    }
  }, [formData?.formData, sortValue]);

  const handleSelectedItems = (selectedItems) => {
    let fackArray = [];
    setSelectedItems(selectedItems);
    const mapData = sortedItems
      .filter((val, formIndex) => {
        return (
          selectedItems.filter((val, itemIndex) => formIndex == val).length ===
          1
        );
      })
      .map((val) => {
        return fackArray.push(val?._id);
      });
    setDeleteFormArr(fackArray);
  };

  const onSortChange = (selected) => {
    setSortValue(selected);
  };

  const resourceName = {
    singular: "form",
    plural: "forms",
  };

  const sortOptions = [
    { label: "Newest update", value: "DATE_MODIFIED_DESC" },
    { label: "Oldest update", value: "DATE_MODIFIED_ASC" },
  ];

  const promotedBulkActions = [
    {
      content: "Delete form",
      onAction: () => {
        dispatch(deleteFormData(deleteFormArr));
        setDeleteFormArr([]);
        setSelectedItems([]);
      },
    },
  ];
  const handleCreateForm = () => {
    fullscreen.dispatch(Fullscreen.Action.ENTER);
    setIsFullScreen(true);
    navigate("/form/new");
  };

  useEffect(() => {
    dispatch(fetchFormData());
    fullscreen.dispatch(Fullscreen.Action.EXIT);
  }, [dispatch]);

  return (
    <>
      <Page
        fullWidth
        title="Form"
        primaryAction={{
          content: "Create new Form",
          onAction: () => handleCreateForm(),
        }}
      >
        <LegacyCard>
          {formData?.formData?.length > 0 ? (
            <ResourceList
              resourceName={resourceName}
              items={sortedItems}
              renderItem={renderItem}
              sortValue={sortValue}
              selectedItems={selectedItems}
              onSelectionChange={handleSelectedItems}
              promotedBulkActions={promotedBulkActions}
              loading={formData?.loading}
              onSortChange={(selected) => setSortValue(selected)}
              selectable
              alternateTool={
                <>
                  <Select
                    label="Sort by"
                    labelInline
                    options={sortOptions}
                    onChange={onSortChange}
                    value={sortValue}
                  />
                </>
              }
            />
          ) : (
            <Nodatafound />
          )}
        </LegacyCard>
      </Page>
      <ToastContainer />
    </>
  );

  function renderItem(items, index) {
    return (
      <ResourceItem id={index} name={items?._id} persistActions={true}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            className={styles.resouceItemTd}
            onClick={() => navigate(`/form/${items?._id}`)}
          >
            {formData?.loading ? (
              <SkeletonDisplayText size="medium" />
            ) : (
              <div>
                {items?.customForm?.map((item, idx) => (
                  <div>{item.formTitle}</div>
                ))}
              </div>
            )}
          </div>

          <div>
            {formData?.loading ? (
              <SkeletonThumbnail size="small" />
            ) : (
              <ToggleSwitch items={items} />
            )}
          </div>

          <div
            className={styles.submissionBtn}
            onClick={() => handleSubmission(items?._id)}
          >
            {formData?.loading ? (
              <SkeletonThumbnail size="small" />
            ) : (
              <Button type="button">
                {" "}
                <Tooltip content="View Submissions">
                  <Icon source={Icons.submission} />
                </Tooltip>
              </Button>
            )}
          </div>
          <div
            className={styles.submissionBtn}
            onClick={() => handleCopyCode(items?._id)}
          >
            {formData?.loading ? (
              <SkeletonThumbnail size="small" />
            ) : (
              <Button type="button">
                {" "}
                <Tooltip content="Copy code ">
                  <Icon source={Icons.copy} />
                </Tooltip>
              </Button>
            )}
          </div>
        </div>
      </ResourceItem>

    );
  }
}
export default React.memo(FormList);

// import {
//   Button,
//   Card,
//   Heading,
//   Icon,
//   IndexTable,
//   Layout,
//   Link,
//   Page,
//   Select,
//   Stack,
//   TextStyle,
//   Thumbnail,
//   useIndexResourceState,
// } from "@shopify/polaris";
// import { CategoriesMajor } from "@shopify/polaris-icons";
// import { DeleteMajor } from "@shopify/polaris-icons";
// import { useCallback, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ToggleSwitch from "../../components/ToggleSwitch";
// import SubmissionSVG from "../../utils/SubmissionSVG";
// import { useAppBridge } from "@shopify/app-bridge-react";
// import { Fullscreen } from "@shopify/app-bridge/actions";
// import { fetchFormData } from "../../redux/actions/allActions";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";

// export default function Forms() {
//   const [sortValue, setSortValue] = useState("");
//   const app = useAppBridge();
//   const dispatch = useDispatch();
//   const fullscreen = Fullscreen.create(app);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const formData = useSelector((state) => state?.inputField?.finalFormData);

//   const sortOptions = [
//     { label: "Newest", value: "newest" },
//     { label: "Yesterday", value: "yesterday" },
//     { label: "Last 7 days", value: "lastWeek" },
//   ];

//   const customers = [
//     {
//       id: "1",
//       url: "#",
//       shortCode: "MTA3OTE4",
//       title: "Contact Form",
//       createdOn: "2023-02-28 05:58:25",
//     },
//     {
//       id: "2",
//       url: "#",
//       shortCode: "MTA3Nzg3",
//       title: "Registration Form",
//       createdOn: "2023-02-28 06:48:18",
//     },
//   ];

//   const resourceName = {
//     singular: "Forms",
//     plural: "forms",
//   };

//   const navigate = useNavigate();
//   const { selectedResources, allResourcesSelected, handleSelectionChange } =
//     useIndexResourceState(customers);

//   const rowMarkup =
//     formData?.formData &&
//     formData?.formData.map(
//       ({ _id, url, short_code, createdAt, isVisible }, index) => (
//         <IndexTable.Row
//           id={_id}
//           key={_id}
//           selected={selectedResources.includes(_id)}
//           position={index}
//         >
//           <IndexTable.Cell>
//             <Link
//               // dataPrimaryLink
//               // url={url}
//               onClick={() => navigate("/form/new")}
//             >
//               <span>
//                 <b>{short_code}</b>
//               </span>
//             </Link>
//           </IndexTable.Cell>
//           <IndexTable.Cell>{isVisible}</IndexTable.Cell>

//           <IndexTable.Cell>
//             <Stack alignment="center">
//               <ToggleSwitch items={{ _id, isVisible }} />
//             </Stack>
//           </IndexTable.Cell>
//           <IndexTable.Cell>
//             <Link
//               // url={url} 
//               onClick={() => navigate("/submissions")}>
//               <Stack alignment="center">
//                 <Thumbnail source={SubmissionSVG} alt={"title"} size="medium" />
//               </Stack>
//             </Link>
//           </IndexTable.Cell>
//           <IndexTable.Cell>
//             <span>{createdAt}</span>
//           </IndexTable.Cell>
//         </IndexTable.Row>
//       )
//     );

//   const handleSortChange = useCallback((value) => setSortValue(value), []);
//   const handleCreateForm = () => {
//     fullscreen.dispatch(Fullscreen.Action.ENTER);
//     setIsFullScreen(true);
//     navigate("/form/new");
//   };

//   useEffect(() => {
//     dispatch(fetchFormData("2976c6111934ce218e6a854d3a881822"));
//   }, []);

//   return (
//     <Page fullWidth>
//       <Layout>
//         <Layout.Section>
//           <Stack>
//             <Stack.Item fill>
//               <Heading>Form</Heading>
//             </Stack.Item>
//             <Stack.Item>
//               <Button primary onClick={handleCreateForm}>
//                 Create Form
//               </Button>
//             </Stack.Item>
//           </Stack>
//         </Layout.Section>
//         <Layout.Section>
//           <Card>
//             <div
//               style={{
//                 padding: "16px",
//                 display: "flex",
//                 justifyContent: "space-between",
//               }}
//             >
//               <div>
//                 <TextStyle variation="strong">2 Forms</TextStyle>
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   flexWrap: "wrap",
//                   width: "200px",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <Button
//                   plain
//                   icon={<Icon source={CategoriesMajor} color="base" />}
//                 />
//                 <Button
//                   plain
//                   icon={<Icon source={DeleteMajor} color="base" />}
//                 />
//                 <Select
//                   labelInline
//                   label="Sort by"
//                   options={sortOptions}
//                   value={sortValue}
//                   onChange={handleSortChange}
//                 />
//               </div>
//             </div>
//             <IndexTable
//               resourceName={resourceName}
//               itemCount={customers.length}
//               selectedItemsCount={
//                 allResourcesSelected ? "All" : selectedResources.length
//               }
//               onSelectionChange={handleSelectionChange}
//               headings={[
//                 { title: "Short Code" },
//                 { title: "Title" },
//                 { title: "Status" },
//                 { title: "Submission" },
//                 { title: "Created On" },
//               ]}
//               loading={formData?.loading}
//             >
//               {rowMarkup}
//             </IndexTable>
//           </Card>
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }
