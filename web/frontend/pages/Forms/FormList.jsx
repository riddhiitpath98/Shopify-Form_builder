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
  TextField,
  Link,
} from "@shopify/polaris";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFormData, fetchFormData } from "../../redux/actions/allActions";
import ToggleSwitch from "../../components/ToggleSwitch";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import Nodatafound from "../../components/NodataFound";
import { useNavigate } from "react-router-dom";
import { Icons, SUBSCRIPTION_TYPES, toastConfig } from "../../constant";
import styles from "./FormStyle.module.css";
import "./PolarisFormListStyles.css";
import ElementListBanner from "../../components/ElementListBanner";

function FormList() {
  const [sortValue, setSortValue] = useState("DATE_MODIFIED_DESC");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [deleteFormArr, setDeleteFormArr] = useState([]);
  const app = useAppBridge();
  const dispatch = useDispatch();
  const fullscreen = Fullscreen.create(app);
  const navigate = useNavigate();

  const shopId = useSelector((state) => state.shopId.shopId);

  const formData = useSelector((state) => state?.inputField?.finalFormData);
  const handleSubmission = (id) => {
    navigate("/submissions", { state: { id: id } });
  };

  const handleCopyCode = (id) => {
    const filter = formData.formData?.filter?.((item) => item._id === id);
    const textToCopy = `<div class="form-builder-ips" data-ap-key='${shopId}' data-key='${filter[0].isVisible ? id : ""
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

  const subscription = useSelector(state => state.user.userData.subscription);
  const user = useSelector(state => state.user.userData.user);

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
        dispatch(deleteFormData({ deleteFormArr, shopId }));
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
    dispatch(fetchFormData(shopId));
    fullscreen.dispatch(Fullscreen.Action.EXIT);
  }, [dispatch]);
  const isShowPremium = formData.formData.length >= subscription?.features?.form?.number_of_forms && user.subscriptionName === SUBSCRIPTION_TYPES.FREE;
  console.log('isShowPremium: ', isShowPremium);
  return (
    <>
      {isShowPremium ? (
        <div className={styles.elementBanner}>
          <ElementListBanner
            title={"You are in Free plan. You've created 1 form allowed in your plan. Upgrade to premium to create more forms."}
          />
        </div>
      ) : null}
      {/* {isShowPremium ?
        <BannerPremium
          title="Current Plan"
          text={<><p style={{ fontSize: "1.125em", marginTop: "0.5rem", fontWeight: 500 }}>You are in Free plan. You've created 1 form allowed in your plan. Upgrade to premium to create more forms. <Link url="/plans"><span className={styles.premiumPlanLink}>Try Premium</span></Link></p></>}
          url="/plans"
          status="info"
          buttonText="Upgrade plan"
        />
        : null} */}
      <Page
        fullWidth
        title="Form"
        primaryAction={{
          content: "Create new Form",
          onAction: () => handleCreateForm(),
          disabled: isShowPremium ? true : false
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
