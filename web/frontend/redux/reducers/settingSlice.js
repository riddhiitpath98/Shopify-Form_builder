import { createSlice } from "@reduxjs/toolkit";
import {
  getSmtpSettingByAppId,
  createSMTPSettings,
  editSmtpSettings,
  getRecaptchaSettingsByAppId,
  createRecaptchaSettings
} from "../actions/allActions";

const initialState = {
  settingData: {
    data: {},
    error: "",
    loading: false,
    success: false,
    isEdit: false,
  },
  smtpSettingData: {
    data: {},
    error: "",
    loading: false,
    success: false,
    isEdit: false,
  },
  reCaptchaSettingData: {
    data: {},
    error: "",
    loading: false,
    success: false,
    isEdit: false,
  }
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSMTPSettings.pending, (state, action) => {
        return {
          ...state,
          settingData: {
            success: false,
            loading: true,
            data: {},
            error: "",
          },
        };
      })
      .addCase(createSMTPSettings.fulfilled, (state, action) => {
        return {
          ...state,
          settingData: {
            loading: false,
            data: action.payload,
            error: "",
            success: true,
            // isEdit: true,
          },
        };
      })
      .addCase(createSMTPSettings.rejected, (state, action) => {
        return {
          ...state,
          settingData: {
            loading: false,
            data: {},
            error: action.payload,
            success: false,
          },
        };
      })
      .addCase(getSmtpSettingByAppId.pending, (state) => {
        return {
          ...state,
          smtpSettingData: {
            success: false,
            loading: true,
            data: {},
            error: "",
            isEdit: false,
          },
        };
      })
      .addCase(getSmtpSettingByAppId.fulfilled, (state, action) => {
        return {
          ...state,
          smtpSettingData: {
            success: true,
            loading: false,
            data: action.payload,
            error: "",
            isEdit: true,
          },
        };
      })
      .addCase(getSmtpSettingByAppId.rejected, (state, action) => {
        return {
          ...state,
          smtpSettingData: {
            success: false,
            loading: false,
            data: {},
            error: action.payload,
            isEdit: false,
          },
        };
      })
      .addCase(editSmtpSettings.pending, (state, action) => {
        return {
          ...state,
          settingData: {
            success: false,
            loading: true,
            data: {},
            error: "",
          },
        };
      })
      .addCase(editSmtpSettings.fulfilled, (state, action) => {
        return {
          ...state,
          settingData: {
            loading: false,
            data: action.payload,
            error: "",
            success: true,
            isEdit: true,
          },
        };
      })
      .addCase(editSmtpSettings.rejected, (state, action) => {
        return {
          ...state,
          settingData: {
            loading: false,
            data: {},
            error: action.payload,
            success: false,
          },
        };
      }).addCase(getRecaptchaSettingsByAppId.pending, (state, action) => {
        return {
          ...state,
          reCaptchaSettingData: {
            data: {},
            error: "",
            loading: true,
            success: false,
          }
        };
      })
      .addCase(getRecaptchaSettingsByAppId.fulfilled, (state, action) => {
        return {
          ...state,
          reCaptchaSettingData: {
            data: action.payload,
            error: "",
            loading: false,
            success: true,
          }
        };
      })
      .addCase(getRecaptchaSettingsByAppId.rejected, (state, action) => {
        return {
          ...state,
          reCaptchaSettingData: {
            data: {},
            error: action.payload,
            loading: false,
            success: false,
          }
        };
      })
      .addCase(createRecaptchaSettings.pending, (state, action) => {
        return {
          ...state,
          reCaptchaSettingData: {
            data: {},
            error: "",
            loading: true,
            success: false,
            isEdit: false,
          }
        };
      })
      .addCase(createRecaptchaSettings.fulfilled, (state, action) => {
        return {
          ...state,
          reCaptchaSettingData: {
            data: action.payload,
            error: "",
            loading: false,
            success: true,
            isEdit: true,
          }
        };
      })
      .addCase(createRecaptchaSettings.rejected, (state, action) => {
        return {
          ...state,
          reCaptchaSettingData: {
            data: {},
            error: action.payload,
            loading: false,
            success: false,
            isEdit: false,
          }
        };
      });
  },
});

export default settingSlice.reducer;
