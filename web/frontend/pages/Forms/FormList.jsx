import { useAppBridge } from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import {
  ResourceList,
  ResourceItem,
  Page,
  Card,
  Button,
  Icon,
  Tooltip,
  Select,
  EmptyState,
  SkeletonPage,
  Layout,
  SkeletonBodyText,
  TextContainer,
  SkeletonDisplayText,
  SkeletonThumbnail,
  LegacyCard,
  Text,
} from "@shopify/polaris";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFormData, fetchFormData } from "../../redux/actions/allActions";
import ToggleSwitch from "../../components/ToggleSwitch";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Nodatafound from "../../components/NodataFound";
import { useNavigate } from "react-router-dom";
import { Icons, toastConfig } from "../../constant";
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
    const filter = formData.formData?.filter?.((item) => item._id === id);
    const textToCopy = `<div class="form-builder-ips" data-ap-key='${appId}' data-key='${
      filter[0].isVisible ? id : ""
    }'></div>`;
    navigator.clipboard.writeText(textToCopy).then(
      function () {
        toast.success("Code Coiped", toastConfig);
      },
      function (error) {
        toast.error(error, toastConfig);
      }
    );
  };

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
        dispatch(deleteFormData({ deleteFormArr, appId }));
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
    dispatch(fetchFormData(appId));
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
              <>
                <Button plain icon={Icons.submission}></Button>
                <div style={{ marginTop: "4px" }}>
                  <Text variant="headingXs" as="h6" color="subdued">
                    View Submission
                  </Text>
                </div>
              </>
            )}
          </div>

          <div
            className={styles.submissionBtn}
            onClick={() => handleCopyCode(items?._id)}
          >
            {formData?.loading ? (
              <SkeletonThumbnail size="small" />
            ) : (
              <>
                <Button plain icon={Icons.copy}></Button>
                <div style={{ marginTop: "5px" }}>
                  <Text variant="headingXs" as="h6" color="subdued">
                    Copy HTML code
                  </Text>
                </div>
              </>
            )}
          </div>
        </div>
      </ResourceItem>
    );
  }
}
export default React.memo(FormList);
