import { createSlice } from "@reduxjs/toolkit";
import {
  createFormToAPIsettings,
  deleteFormToAPISettings,
  editFormToAPISettings,
  getAPILogsData,
  getFormToAPIByFormId,
  getFormToAPIById,
  getFormToAPISettings,
  loadMoreLogs,
} from "../actions/allActions";

const initialState = {
  apiSettingData: {
    data: {},
    error: "",
    loading: false,
    success: false,
  },
  editAPISettingsData: {
    data: {},
    error: "",
    loading: false,
    success: false,
  },
  editAPISettingsDataByFormId: {
    data: {},
    error: "",
    loading: false,
    success: false,
  },
  allApiSettingData: {
    data: [],
    error: "",
    loading: false,
    success: false,
  },
  allApiLogsData: {
    data: [],
    error: "",
    loading: false,
    success: false,
  },
};

const anyAPISettingSlice = createSlice({
  name: "anyAPISetting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFormToAPIsettings.pending, (state, action) => {
        return {
          ...state,
          apiSettingData: {
            success: false,
            loading: true,
            data: {},
            error: "",
          },
        };
      })
      .addCase(createFormToAPIsettings.fulfilled, (state, action) => {
        return {
          ...state,
          apiSettingData: {
            loading: false,
            data: action.payload,
            error: "",
            success: true,
          },
        };
      })
      .addCase(createFormToAPIsettings.rejected, (state, action) => {
        return {
          ...state,
          apiSettingData: {
            loading: false,
            data: {},
            error: action.payload,
            success: false,
          },
        };
      })
      .addCase(getFormToAPISettings.pending, (state, action) => {
        return {
          ...state,
          allApiSettingData: {
            success: false,
            loading: true,
            data: [],
            error: "",
          },
        };
      })
      .addCase(getFormToAPISettings.fulfilled, (state, action) => {
        return {
          ...state,
          allApiSettingData: {
            loading: false,
            data: action.payload,
            error: "",
            success: true,
          },
        };
      })
      .addCase(getFormToAPISettings.rejected, (state, action) => {
        return {
          ...state,
          allApiSettingData: {
            loading: false,
            data: [],
            error: action.payload,
            success: false,
          },
        };
      })
      .addCase(deleteFormToAPISettings.pending, (state, action) => {
        return {
          ...state,
          allApiSettingData: {
            success: false,
            loading: true,
            data: [],
            error: "",
          },
        };
      })
      .addCase(deleteFormToAPISettings.fulfilled, (state, action) => {
        return {
          ...state,
          allApiSettingData: {
            loading: false,
            data: action.payload,
            error: "",
            success: true,
          },
        };
      })
      .addCase(deleteFormToAPISettings.rejected, (state, action) => {
        return {
          ...state,
          allApiSettingData: {
            loading: false,
            data: [],
            error: action.payload,
            success: false,
          },
        };
      })
      .addCase(getFormToAPIById.pending, (state, action) => {
        return {
          ...state,
          editAPISettingsData: {
            success: false,
            loading: true,
            data: {},
            error: "",
          },
        };
      })
      .addCase(getFormToAPIById.fulfilled, (state, action) => {
        return {
          ...state,
          editAPISettingsData: {
            loading: false,
            data: action.payload,
            error: "",
            success: true,
          },
        };
      })
      .addCase(getFormToAPIById.rejected, (state, action) => {
        return {
          ...state,
          editAPISettingsData: {
            loading: false,
            data: {},
            error: action.payload,
            success: false,
          },
        };
      })
      .addCase(getFormToAPIByFormId.pending, (state, action) => {
        return {
          ...state,
          editAPISettingsDataByFormId: {
            success: false,
            loading: true,
            data: {},
            error: "",
          },
        };
      })
      .addCase(getFormToAPIByFormId.fulfilled, (state, action) => {
        return {
          ...state,
          editAPISettingsDataByFormId: {
            loading: false,
            data: action.payload,
            error: "",
            success: true,
          },
        };
      })
      .addCase(getFormToAPIByFormId.rejected, (state, action) => {
        return {
          ...state,
          editAPISettingsDataByFormId: {
            loading: false,
            data: {},
            error: action.payload,
            success: false,
          },
        };
      })
      .addCase(editFormToAPISettings.pending, (state, action) => {
        return {
          ...state,
          allApiSettingData: {
            success: false,
            loading: true,
            data: [],
            error: "",
          },
        };
      })
      .addCase(editFormToAPISettings.fulfilled, (state, action) => {
        return {
          ...state,
          allApiSettingData: {
            loading: false,
            data: action.payload,
            error: "",
            success: true,
          },
        };
      })
      .addCase(editFormToAPISettings.rejected, (state, action) => {
        return {
          ...state,
          allApiSettingData: {
            loading: false,
            data: [],
            error: action.payload,
            success: false,
          },
        };
      })
      .addCase(getAPILogsData.pending, (state, action) => {
        return {
          ...state,
          allApiLogsData: {
            success: false,
            loading: true,
            data: [],
            error: "",
          },
        };
      })
      .addCase(getAPILogsData.fulfilled, (state, action) => {
        return {
          ...state,
          allApiLogsData: {
            loading: false,
            data: action.payload,
            error: "",
            success: true,
          },
        };
      })
      .addCase(getAPILogsData.rejected, (state, action) => {
        return {
          ...state,
          allApiLogsData: {
            loading: false,
            data: [],
            error: action.payload,
            success: false,
          },
        };
      })
      .addCase(loadMoreLogs.pending, (state, action) => {
        return {
          ...state,
          allApiLogsData: {
            success: false,
            loading: true,
            data: [],
            error: "",
          },
        };
      })
      .addCase(loadMoreLogs.fulfilled, (state, action) => {
        return {
          ...state,
          allApiLogsData: {
            success: true,
            loading: false,
            data: action.payload.data,
            total_count: action.payload.total_count,
            error: "",
          },
        };
      })
      .addCase(loadMoreLogs.rejected, (state, action) => {
        return {
          ...state,
          allApiLogsData: {
            success: false,
            loading: false,
            data: [],
            error: action.payload,
          },
        };
      });
  },
});

export default anyAPISettingSlice.reducer;
