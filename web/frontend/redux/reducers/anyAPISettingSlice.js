import { createSlice } from "@reduxjs/toolkit";
import { createFormToAPIsettings, deleteFormToAPISettings, editFormToAPISettings, getFormToAPIById, getFormToAPISettings } from "../actions/allActions";

const initialState = {
  apiSettingData: {
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
      }).addCase(getFormToAPISettings.pending, (state, action) => {
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
      }).addCase(deleteFormToAPISettings.pending, (state, action) => {
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
      }).addCase(editFormToAPISettings.pending, (state, action) => {
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
      .addCase(getFormToAPIById.pending, (state, action) => {
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
      .addCase(getFormToAPIById.fulfilled, (state, action) => {
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
      .addCase(getFormToAPIById.rejected, (state, action) => {
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
  },
});

export default anyAPISettingSlice.reducer;