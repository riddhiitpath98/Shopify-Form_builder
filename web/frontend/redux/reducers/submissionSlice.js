import { createSlice } from "@reduxjs/toolkit";
import {
  createSubmissions,
  deleteSubmissionData,
  editisReadFlag,
  filterSubmissionByDate,
  getSubmission,
  getSubmissionByFormId,
  loadMoreSubmission,
  sortNFilterSubmission,
  sortNFilterSubmissionById,
} from "../actions/allActions";

const initialState = {

  submissionBypage: {
    total_count: 0,
    data: [],
    error: "",
    showMessage: false,
    formSubmitted: false,
    loading: false,
    success: false,
  },
  submissionData: {
    data: [],
    error: "",
    submissionItem: {},
    showMessage: false,
    formSubmitted: false,
    loading: false,
    success: false,
  },
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    updateCurrentPage: (state, action) => {
      return {
        ...state,
        currentPage: action.payload
      }
    },
    setShowMessage: (state, action) => {
      return {
        ...state,
        submissionData: {
          ...state.submissionData,
          showMessage: action.payload,
        },
      };
    },
    setFormSubmitted: (state, action) => {
      return {
        ...state,
        submissionData: {
          ...state.submissionData,
          formSubmitted: action.payload,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSubmissions.pending, (state) => {
        return {
          ...state,
          submissionData: {
            ...state?.submissionData,
            loading: true,
            success: false,
          },
        };
      })
      .addCase(createSubmissions.fulfilled, (state, action) => {
        return {
          ...state,
          submissionData: {
            loading: false,
            success: true,
            data: [...state.submissionData.data],
            submissionItem: action.payload,
            formSubmitted: true,
            showMessage: true,
          },
        };
      })
      .addCase(createSubmissions.rejected, (state, action) => {
        return {
          ...state,
          submissionData: {
            ...state?.submissionData,
            loading: false,
            success: false,
            error: action.payload,
          },
        };
      })
      .addCase(getSubmission.pending, (state, action) => {
        return {
          ...state,
          submissionData: {
            success: false,
            loading: true,
            data: [],
            error: "",
          },
        };
      })
      .addCase(getSubmission.fulfilled, (state, action) => {
        return {
          ...state,
          submissionData: {
            success: true,
            loading: false,
            data: action.payload,
            error: "",
          },
        };
      })
      .addCase(getSubmission.rejected, (state, action) => {
        return {
          ...state,
          submissionData: {
            success: false,
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      })
      .addCase(loadMoreSubmission.pending, (state, action) => {
        return {
          ...state,
          submissionBypage: {
            success: false,
            loading: true,
            data: [...state.submissionBypage.data],
            error: "",
          },
        };
      })
      .addCase(loadMoreSubmission.fulfilled, (state, action) => {
        return {
          ...state,
          submissionBypage: {
            success: true,
            loading: false,
            data: [...state.submissionBypage.data, ...action.payload.data],
            total_count: action.payload.total_count,
            error: "",
          },
        };
      })
      .addCase(loadMoreSubmission.rejected, (state, action) => {
        return {
          ...state,
          submissionBypage: {
            success: false,
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      })
      .addCase(getSubmissionByFormId.pending, (state, action) => {
        return {
          ...state,
          submissionBypage: {
            success: false,
            loading: true,
            data: [...state.submissionBypage.data],
            error: "",
          },
        };
      })
      .addCase(getSubmissionByFormId.fulfilled, (state, action) => {
        return {
          ...state,
          submissionBypage: {
            success: true,
            loading: false,
            data: [...state.submissionBypage.data, ...action.payload.data],
            total_count: action.payload.total_count,
            error: "",
          },
        };
      })
      .addCase(getSubmissionByFormId.rejected, (state, action) => {
        return {
          ...state,
          submissionBypage: {
            success: false,
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      })
      .addCase(sortNFilterSubmission.pending, (state, action) => {
        return {
          ...state,
          submissionData: {
            success: false,
            loading: true,
            data: [...state.submissionData.data],
            error: "",
          },
        };
      })
      .addCase(sortNFilterSubmission.fulfilled, (state, action) => {
        return {
          ...state,
          submissionData: {
            success: true,
            loading: false,
            data: action.payload,
            error: "",
          },
        };
      })
      .addCase(sortNFilterSubmission.rejected, (state, action) => {
        return {
          ...state,
          submissionData: {
            success: false,
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      })
      .addCase(sortNFilterSubmissionById.pending, (state, action) => {
        return {
          ...state,
          submissionData: {
            success: false,
            loading: true,
            data: [...state.submissionData.data],
            error: "",
          },
        };
      })
      .addCase(sortNFilterSubmissionById.fulfilled, (state, action) => {
        return {
          ...state,
          submissionData: {
            success: true,
            loading: false,
            data: action.payload,
            error: "",
          },
        };
      })
      .addCase(sortNFilterSubmissionById.rejected, (state, action) => {
        return {
          ...state,
          submissionData: {
            success: false,
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      })
      .addCase(filterSubmissionByDate.pending, (state, action) => {
        return {
          ...state,
          submissionData: {
            success: false,
            loading: true,
            data: [...state.submissionData.data],
            error: "",
          },
        };
      })
      .addCase(filterSubmissionByDate.fulfilled, (state, action) => {
        return {
          ...state,
          submissionData: {
            success: true,
            loading: false,
            data: action.payload,
            error: "",
          },
        };
      })
      .addCase(filterSubmissionByDate.rejected, (state, action) => {
        return {
          ...state,
          submissionData: {
            success: false,
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      })
      .addCase(editisReadFlag.pending, (state, action) => {
        return {
          ...state,
          submissionData: {
            ...state.submissionData,
            loading: true,
          },
        };
      })
      .addCase(editisReadFlag.fulfilled, (state, action) => {
        const cloneData = [...state.submissionBypage?.data];
        const index = cloneData.findIndex(
          (data) => data?._id === action.payload?._id
        );
        cloneData?.splice(index, 1, action.payload);
        return {
          ...state,
          submissionBypage: {
            success: true,
            loading: false,
            submissionItem: action.payload,
            data: cloneData,
            error: "",
          },
        };
      })
      .addCase(editisReadFlag.rejected, (state, action) => {
        return {
          ...state,
          submissionBypage: {
            ...state?.submissionData,
            loading: false,
            error: action.payload,
          },
        };
      })
      .addCase(deleteSubmissionData.pending, (state, action) => {
        return {
          ...state,
          submissionData: {
            ...state.submissionData,
            loading: true,
          },
        };
      })
      .addCase(deleteSubmissionData.fulfilled, (state, action) => {
        return {
          ...state,
          submissionData: {
            ...state.submissionData,
            success: true,
            loading: false,
            data: [...state.submissionData.data],
          },
        };
      })
      .addCase(deleteSubmissionData.rejected, (state, action) => {
        return {
          ...state,
          submissionData: {
            ...state.submissionData,
            success: false,
            loading: false,
            error: action.payload,
          },
        };
      });
  },
});

export const { setShowMessage, setFormSubmitted, updateCurrentPage } = submissionSlice.actions;
export default submissionSlice.reducer;
