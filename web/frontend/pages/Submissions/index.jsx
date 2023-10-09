import {
  Button,
  ResourceList,
  ResourceItem,
  Card,
  Filters,
  Page,
  ChoiceList,
  Select,
  LegacyCard,
  Text,
} from "@shopify/polaris";
import React, { useEffect, useMemo } from "react";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteSubmissionData,
  editisReadFlag,
  fetchFormData,
  getSubmission,
  getSubmissionByFormId,
  sortNFilterSubmission,
  sortNFilterSubmissionById,
  loadMoreSubmission,
} from "../../redux/actions/allActions";
import { useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import ModalSubmission from "./ModalSubmission";
import styles from "./Submissions.module.css";
import "./Modal.css";
import { updateCurrentPage } from "../../redux/reducers/submissionSlice";

function Submissions() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState("-createdAt");
  const [status, setStatus] = useState([]);
  const [formStatus, setFormStatus] = useState([]);
  const [queryValue, setQueryValue] = useState("");
  const [editItem, setEditItem] = useState({});
  const [deleteFormArr, setDeleteFormArr] = useState([]);
  const [active, setActive] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const shopId = useSelector((state) => state.shopId.shopId);
  const submissionData = useSelector(
    (state) => state.submission.submissionData.data
  );

  const total_count = useSelector(
    (state) => state.submission.submissionData.total_count
  );
  const itemPrPage = 10;
  const submissionsLoading = useSelector(
    (state) => state.submission.submissionData
  );
  const formData = useSelector(
    (state) => state?.inputField?.finalFormData?.formData
  );

  const fetchMoreData = async () => {
    setCurrentPage(currentPage + 1)
  };

  const fileName = `export_submission_${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  const newSubmissionData = useMemo(() => {
    const data = submissionData?.filter((item, index) => {
      const submission = item?.submission[0];
      if (submission) {
        const entries = Object.entries(submission);
        for (const [key, value] of entries) {
          if (typeof value === "string" && value?.toLowerCase().includes(queryValue?.toLowerCase())) {
            return item;
          }
        }
      }
    }
    );

    return data
  }, [submissionData, queryValue]);

  const formTitleById = useMemo(() => {
    let titleById = {};
    const foundObject = formData.find((obj) => obj._id === location?.state?.id);
    if (foundObject) {
      titleById.id = foundObject._id;
      titleById.formTitle = foundObject.customForm[0].formTitle;
      setFormStatus([titleById.id]);
    }
    return titleById;
  }, []);

  const csvData = useMemo(() => {
    const data = [];
    if (newSubmissionData?.length) {
      let formData = {};
      newSubmissionData?.map((submissionItem, index) => {
        let submission = submissionItem.submission[0]
        for (const key in submission) {
          let term = key.split("_").pop().toUpperCase();
          let val = submission[key];
          if (Array.isArray(val)) {
            val = term === 'FILE' ? val.map(obj => obj.name).join(', ') : val.map(obj => obj.value).join(', ')
          }
          formData = { ...formData, [term]: val }
        }
        data.push({
          No: index + 1,
          ...formData
        })
      }
      );
    }
    return data;
  }, [newSubmissionData]);

  const formTitle = useMemo(() => {
    const formTitleData = [];
    formData?.map((data) => {
      data?.customForm?.forEach((formData) => {
        formData.formTitle &&
          formTitleData.push({ id: data._id, title: formData.formTitle });
      });
    });
    return formTitleData;
  }, [formData.length]);

  const handleOpen = (editItem) => {
    setEditItem(editItem);
    dispatch(editisReadFlag({ _id: editItem._id, isRead: true }));
    setActive(true);
  };

  const handleClose = useCallback(() => {
    setActive(false);
    setEditItem({});
  }, []);

  const handleIsReadStatus = useCallback((id) => {
    dispatch(editisReadFlag({ _id: id, isRead: false }));
    setEditItem({});
    handleClose();
  }, []);

  const handleStatusChange = (value) => {
    if (value && value[0] === "read") {
      location?.state?.id
        ? dispatch(
          sortNFilterSubmissionById({
            filterFormId: location?.state?.id,
            path: sortValue,
            query: { isRead: true, formId: formStatus, page: currentPage, per_page: itemPrPage },
          })
        )
        : dispatch(
          sortNFilterSubmission({
            path: sortValue,
            query: { isRead: true, formId: formStatus, page: currentPage, per_page: itemPrPage },
            shopId
          })
        );
      setStatus(value);
    } else if (value && value[0] === "unread") {
      location?.state?.id
        ? dispatch(
          sortNFilterSubmissionById({
            filterFormId: location?.state?.id,
            path: sortValue,
            query: { isRead: false, formId: formStatus, page: currentPage, per_page: itemPrPage },
          })
        )
        : dispatch(
          sortNFilterSubmission({
            path: sortValue,
            query: { isRead: false, formId: formStatus, page: currentPage, per_page: itemPrPage },
            shopId
          })
        );
      setStatus(value);
    }
  };

  const handleStatusRemove = () => {
    location?.state?.id
      ? dispatch(
        sortNFilterSubmissionById({
          filterFormId: location?.state?.id,
          path: sortValue,
          query: { isRead: "", formId: formStatus, page: currentPage, per_page: itemPrPage },
        })
      )
      : dispatch(
        sortNFilterSubmission({
          path: sortValue,
          query: { isRead: "", formId: formStatus, page: currentPage, per_page: itemPrPage },
          shopId
        })
      );
    setStatus([]);
  };

  const handleFormStatusChange = (value) => {
    if (value) {
      location?.state?.id
        ? dispatch(
          sortNFilterSubmissionById({
            filterFormId: location?.state?.id,
            path: sortValue,
            query: {
              isRead:
                status[0] === "read"
                  ? true
                  : status[0] === "unread"
                    ? false
                    : "",
              formId: value,
              page: currentPage,
              per_page: itemPrPage
            },
          })
        )
        : dispatch(
          sortNFilterSubmission({
            path: sortValue,
            query: {
              isRead:
                status[0] === "read"
                  ? true
                  : status[0] === "unread"
                    ? false
                    : "",
              formId: value,
              page: currentPage,
              per_page: itemPrPage
            },
            shopId
          })
        );
      setFormStatus(value);
    }
  };

  const handleFormStatusRemove = () => {
    location?.state?.id
      ? dispatch(
        sortNFilterSubmissionById({
          filterFormId: location?.state?.id,
          path: sortValue,
          query: {
            isRead:
              status[0] === "read"
                ? true
                : status[0] === "unread"
                  ? false
                  : "",
            formId: [],
            page: currentPage,
            per_page: itemPrPage
          },
        })
      )
      : dispatch(
        sortNFilterSubmission({
          path: sortValue,
          query: {
            isRead:
              status[0] === "read"
                ? true
                : status[0] === "unread"
                  ? false
                  : "",
            formId: [],
            page: currentPage,
            per_page: itemPrPage
          },
          shopId
        })
      );
    setFormStatus([]);
  };

  const handleQueryValueChange = useCallback(
    (value) => setQueryValue(value),
    []
  );

  const handleQueryValueRemove = useCallback(
    () => setQueryValue(""),
    []
  );

  const handleClearAll = useCallback(() => {
    handleStatusRemove();
    handleFormStatusRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleStatusRemove, handleFormStatusRemove]);

  const handleSelectedItems = (selectedItems) => {
    let fackArray = [];
    setSelectedItems(selectedItems);
    const mapData = submissionData
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

  useEffect(() => {
    dispatch(
      location.state?.id
        ? getSubmissionByFormId({ order: sortValue, id: location.state?.id, page: currentPage, per_page: itemPrPage })
        : loadMoreSubmission({ order: sortValue, shopId, page: currentPage, per_page: itemPrPage })
    );
  }, [dispatch, location?.state?.id, currentPage]);

  useEffect(() => {
    dispatch(fetchFormData(shopId));
  }, []);

  const resourceName = {
    singular: "submission",
    plural: "submissions",
  };

  const sortOptions = [
    { label: "Newest", value: "-createdAt" },
    { label: "Oldest", value: "createdAt" },
  ];


  const promotedBulkActions = [
    {
      content: "Delete submissions",
      onAction: () => {
        dispatch(
          deleteSubmissionData({
            filterFormId: location?.state?.id,
            submissionIdArr: deleteFormArr,
            path: sortValue,
            query: {
              isRead:
                status[0] === "read"
                  ? true
                  : status[0] === "unread"
                    ? false
                    : "",
              formId: formStatus,
            },
            shopId
          })
        );
        setDeleteFormArr([]);
        setSelectedItems([]);
      },
    },
  ];

  const choices = formTitle.map((title) => ({
    label: title.title,
    value: title.id,
  }));

  const filters = [
    {
      key: "status",
      label: "Status",
      filter: (
        <ChoiceList
          title="Status"
          titleHidden
          choices={[
            { label: "Read", value: "read" },
            { label: "Unread", value: "unread" },
          ]}
          selected={status || []}
          onChange={handleStatusChange}
        />
      ),
      shortcut: true,
    },
    {
      key: "form",
      label: "Form",
      filter: (
        <ChoiceList
          title="Form"
          titleHidden
          choices={choices}
          selected={formStatus || []}
          onChange={handleFormStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
  ];
  const formFilter = [];
  if (formStatus && formStatus.length > 0) {
    const selectedFormTitles = formStatus.map((val) => {
      const selectedFormTitle = formTitle.find((title) => title.id === val);
      return selectedFormTitle ? selectedFormTitle.title : "";
    });
    formFilter.push({
      key: "formStatus",
      label: `Form : ${selectedFormTitles.join(", ")}`,
      onRemove: handleFormStatusRemove,
    });
  }
  const appliedFilters = [];
  if (status && !isEmpty(status)) {
    appliedFilters.push({
      key: "status",
      label: `Status ${status}`,
      onRemove: handleStatusRemove,
    });
  }
  if (formStatus && formStatus.length > 0) {
    const selectedFormTitles = formStatus.map((val) => {
      const selectedFormTitle = formTitle.find((title) => title.id === val);
      return selectedFormTitle ? selectedFormTitle.title : "";
    });

    appliedFilters.push({
      key: "formStatus",
      label: `Form : ${selectedFormTitles.join(", ")}`,
      onRemove: handleFormStatusRemove,
    });
  }
  const onSortChange = (selected) => {
    if (selected === "createdAt") {
      location?.state?.id
        ? dispatch(
          sortNFilterSubmissionById({
            filterFormId: location?.state?.id,
            path: "createdAt",
            query: {
              isRead:
                status[0] === "read"
                  ? true
                  : status[0] === "unread"
                    ? false
                    : "",
              formId: formStatus,
              page: currentPage,
              per_page: itemPrPage
            },
          })
        )
        : dispatch(
          sortNFilterSubmission({
            path: "createdAt",
            query: {
              isRead:
                status[0] === "read"
                  ? true
                  : status[0] === "unread"
                    ? false
                    : "",
              formId: formStatus,
              page: currentPage,
              per_page: itemPrPage
            },
            shopId
          })
        );
      setSortValue(selected);
    } else {
      location?.state?.id
        ? dispatch(
          sortNFilterSubmissionById({
            filterFormId: location?.state?.id,
            path: "-createdAt",
            query: {
              isRead:
                status[0] === "read"
                  ? true
                  : status[0] === "unread"
                    ? false
                    : "",
              formId: formStatus,
              page: currentPage,
              per_page: itemPrPage
            },
          })
        )
        : dispatch(
          sortNFilterSubmission({
            path: "-createdAt",
            query: {
              isRead:
                status[0] === "read"
                  ? true
                  : status[0] === "unread"
                    ? false
                    : "",
              formId: formStatus,
              page: currentPage,
              per_page: itemPrPage
            },
            shopId
          })
        );
      setSortValue(selected);
    }
  };

  const filterControl = (
    <Filters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    ></Filters>
  );

  return (
    <>
      <Page fullWidth title="Submissions">
        {formFilter.length > 0 ? (
          <Text variant="headingSm" as="h6">
            <div style={{ marginBottom: "6px" }}>
              {formFilter[0]?.label}
            </div>
          </Text>
        ) : null}
        <LegacyCard>
          <ResourceList
            resourceName={resourceName}
            items={
              newSubmissionData.length > 0 ? newSubmissionData : []
            }
            renderItem={renderItem}
            sortValue={sortValue}
            selectedItems={selectedItems}
            onSelectionChange={handleSelectedItems}
            promotedBulkActions={promotedBulkActions}
            loading={submissionsLoading.loading}
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
            filterControl={filterControl}
          />
          {submissionData.length < total_count ? <div className={styles.pagination_button}>
            <Button primary onClick={fetchMoreData}>
              Load More
            </Button>
          </div> : null}

        </LegacyCard>
        <ToastContainer />
      </Page>
    </>
  );

  function renderItem(items, index) {
    return (
      <>
        <div
          className={`${items?.isRead ? "" : styles.isReadElement
            }`}
        >
          <ResourceItem
            id={index}
            name={items?._id}
            onClick={() => handleOpen(items)}
            persistActions={true}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {Object.entries(items?.submission[0])
                .filter(([key]) =>
                  ["text", "email", "name", "textarea", "phone"].includes(
                    key.split("_").pop()
                  )
                )
                .map(([key, value]) => (
                  <div className={styles.resourceItem} key={key}>
                    {value}
                  </div>
                ))}
              <div className={styles.dateTimeItem}>
                {moment(items?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </div>
          </ResourceItem>
        </div >

        {
          active && (
            <ModalSubmission
              item={editItem && editItem}
              open={active}
              formData={formData}
              handleClose={handleClose}
              handleIsReadStatus={handleIsReadStatus}
            />
          )
        }
      </>
    );
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === "" || value == null;
    }
  }
}
export default React.memo(Submissions);
