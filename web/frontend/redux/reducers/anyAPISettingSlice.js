import { createSlice } from "@reduxjs/toolkit";
import { createFormToAPIsettings, deleteFormToAPISettings, getFormToAPISettings } from "../actions/allActions";

const initialState = {
  apiSettingData: {
    data: {},
    error: "",
    loading: false,
    success: false,
    isEdit: false,
  },
};

export const anyAPISettingSlice = createSlice({
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
            isEdit: true,
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
      .addCase(deleteFormToAPISettings.pending, (state, action) => {
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
      .addCase(deleteFormToAPISettings.fulfilled, (state, action) => {
        return {
          ...state,
          apiSettingData: {
            loading: false,
            data: action.payload,
            error: "",
            success: true,
            isEdit: true,
          },
        };
      })
      .addCase(deleteFormToAPISettings.rejected, (state, action) => {
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
          apiSettingData: {
            success: false,
            loading: true,
            data: {},
            error: "",
          },
        };
      })
      .addCase(getFormToAPISettings.fulfilled, (state, action) => {
        return {
          ...state,
          apiSettingData: {
            loading: false,
            data: action.payload,
            error: "",
            success: true,
            isEdit: true,
          },
        };
      })
      .addCase(getFormToAPISettings.rejected, (state, action) => {
        return {
          ...state,
          apiSettingData: {
            loading: false,
            data: {},
            error: action.payload,
            success: false,
          },
        };
      });
  },
});
