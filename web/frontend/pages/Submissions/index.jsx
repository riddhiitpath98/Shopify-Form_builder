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
  const location = useLocation();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const submissionData = useSelector(
    (state) => state.submission.submissionBypage.data
  );

  const total_count = useSelector(state => state.submission.submissionBypage.total_count);
  console.log('total_count: ', total_count, submissionData.length);
  const itemPrPage = 10;
  const submissionsLoading = useSelector(
    (state) => state.submission.submissionData
  );
  const formData = useSelector(
    (state) => state?.inputField?.finalFormData?.formData
  );

  const fetchMoreData = async () => {
    try {
      dispatch(loadMoreSubmission({ page: currentPage, per_page: itemPrPage }))
    } catch (error) {
      // Handle error
    }
  };
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState("-createdAt");
  const [status, setStatus] = useState([]);
  const [formStatus, setFormStatus] = useState([]);
  const [queryValue, setQueryValue] = useState("");
  const [editItem, setEditItem] = useState({});
  const [deleteFormArr, setDeleteFormArr] = useState([]);
  const [active, setActive] = useState(false);

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
    }).sort((a, b) => {
      if (sortValue === '-createdAt')
        return new Date(b.createdAt) - new Date(a.createdAt)
      else
        return new Date(a.createdAt) - new Date(b.createdAt)
    }
    );

    return data
  }, [submissionData, queryValue]);

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
            query: { isRead: true, formId: formStatus },
          })
        )
        : dispatch(
          sortNFilterSubmission({
            path: sortValue,
            query: { isRead: true, formId: formStatus },
          })
        );
      setStatus(value);
    } else if (value && value[0] === "unread") {
      location?.state?.id
        ? dispatch(
          sortNFilterSubmissionById({
            filterFormId: location?.state?.id,
            path: sortValue,
            query: { isRead: false, formId: formStatus },
          })
        )
        : dispatch(
          sortNFilterSubmission({
            path: sortValue,
            query: { isRead: false, formId: formStatus },
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
          query: { isRead: "", formId: formStatus },
        })
      )
      : dispatch(
        sortNFilterSubmission({
          path: sortValue,
          query: { isRead: "", formId: formStatus },
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
            },
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
          },
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
        ? getSubmissionByFormId({ id: location.state?.id, page: currentPage, per_page: itemPrPage })
        : loadMoreSubmission({ page: currentPage, per_page: itemPrPage }), setCurrentPage(currentPage + 1)
    );
  }, [dispatch, location?.state?.id]);

  useEffect(() => {
    dispatch(fetchFormData());
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
      label: `Form ${selectedFormTitles.join(", ")}`,
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
            },
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
            },
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
                <CSVLink data={csvData} filename={fileName}>
                  <Button>Export all Data</Button>
                </CSVLink>
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
          {console.log('submissionData.length === total_count', submissionData.length === total_count)}
          {submissionData.length !== total_count && <button onClick={fetchMoreData}>
            Load More
          </button>}
        </LegacyCard>
        <ToastContainer />
      </Page>
    </>
  );

  function renderItem(items, index) {
    return (
      <>
        <div
          className={`${submissionData?.[index]?.isRead ? "" : styles.isReadElement
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
          {/* <ResourceItem
            id={index}
            name={items?._id}
            onClick={() => handleOpen(items)}
            persistActions={true}
          >
            {console.log('Object.values(items?.submission)', Object.values(items?.submission))}
            {Object.values(items?.submission).map((value, index) => {
              if (Array.isArray(value)) {
                console.log('value', value)
                return false
              }
              else {
                (<div className={styles.resourceItem} key={index} >
                  {value}
                </div >)
              }
            })}
            <div className={styles.resourceItem}>
              {moment(items.createdAt).format("DD-MM-YYYY HH:MM ")}
            </div >
          </ResourceItem > */}
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
