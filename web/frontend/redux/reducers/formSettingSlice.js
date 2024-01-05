import { createSlice } from "@reduxjs/toolkit";
import {
  createNupdateAfterSubmit,
  createNupdateAppearance,
  createNupdateValidation,
  getAfterSubmitByFormId,
  getAppearanceByFormId,
  getValidationByFormId,
} from "../actions/allActions";
import { handleAppereance } from "../../utils/function";

const initialState = {
  validationData: {
    data: [],
    updatedValidation: [],
    validationFields: {},
    error: "",
    loading: false,
    success: false,
  },
  appearanceData: {
    data: [],
    updatedAppearance: [],
    appearanceFields: {},
    error: "",
    loading: false,
    success: false,
  },
  afterSubmitData: {
    data: [],
    updatedAfterSubmit: [],
    afterSubmitFields: {},
    error: "",
    loading: false,
    success: false,
  },
};

const formSettingSlice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    updatedValidationPayload: (state, action) => {
      return {
        ...state,
        validationData: {
          ...state?.validationData,
          updatedValidation: action.payload,
          validationFields: handleAppereance(action.payload)
        },
      };
    },
    updatedAppearancePayload: (state, action) => {
      return {
        ...state,
        appearanceData: {
          ...state?.appearanceData,
          updatedAppearance: action.payload,
          appearanceFields: handleAppereance(action.payload),
        },
      };
    },
    updatedAfterSubmitPayload: (state, action) => {
      return {
        ...state,
        afterSubmitData: {
          ...state?.afterSubmitData,
          updatedAfterSubmit: action.payload,
          afterSubmitFields: handleAppereance(action.payload),
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getValidationByFormId.pending, (state) => {
        return {
          ...state,
          validationData: {
            ...state?.validationData,
            loading: true,
            success: false,
          },
        };
      })
      .addCase(getValidationByFormId.fulfilled, (state, action) => {
        return {
          ...state,
          validationData: {
            loading: false,
            success: true,
            data: action.payload,
            validationFields: handleAppereance(action.payload?.validation)
          },
        };
      })
      .addCase(getValidationByFormId.rejected, (state, action) => {
        return {
          ...state,
          validationData: {
            ...state?.validationData,
            loading: false,
            success: false,
            error: action.payload,
          },
        };
      })
      .addCase(createNupdateValidation.pending, (state) => {
        return {
          ...state,
          validationData: {
            ...state?.validationData,
            loading: true,
            success: false,

          },
        };
      })
      .addCase(createNupdateValidation.fulfilled, (state, action) => {
        return {
          ...state,
          validationData: {
            loading: false,
            success: true,
            data: action.payload,
            validationFields: handleAppereance(action.payload?.validation),
          },
        };
      })
      .addCase(createNupdateValidation.rejected, (state, action) => {
        return {
          ...state,
          validationData: {
            ...state?.validationData,
            loading: false,
            success: false,
            error: action.payload,
          },
        };
      })
      .addCase(getAppearanceByFormId.pending, (state) => {
        return {
          ...state,
          appearanceData: {
            ...state?.appearanceData,
            loading: true,
            success: false,
          },
        };
      })
      .addCase(getAppearanceByFormId.fulfilled, (state, action) => {
        return {
          ...state,
          appearanceData: {
            loading: false,
            success: true,
            data: action.payload,
            appearanceFields: handleAppereance(action.payload?.appearance),
          },
        };
      })
      .addCase(getAppearanceByFormId.rejected, (state, action) => {
        return {
          ...state,
          appearanceData: {
            ...state?.appearanceData,
            loading: false,
            success: false,
            error: action.payload,
          },
        };
      })
      .addCase(createNupdateAppearance.pending, (state) => {
        return {
          ...state,
          appearanceData: {
            ...state?.appearanceData,
            loading: true,
            success: false,
          },
        };
      })
      .addCase(createNupdateAppearance.fulfilled, (state, action) => {
        return {
          ...state,
          appearanceData: {
            loading: false,
            success: true,
            data: action.payload,
            appearanceFields: handleAppereance(action.payload?.appearance),
          },
        };
      })
      .addCase(createNupdateAppearance.rejected, (state, action) => {
        return {
          ...state,
          appearanceData: {
            ...state?.appearanceData,
            loading: false,
            success: false,
            error: action.payload,
          },
        };
      })
      .addCase(getAfterSubmitByFormId.pending, (state) => {
        return {
          ...state,
          afterSubmitData: {
            ...state?.afterSubmitData,
            loading: true,
            success: false,
          },
        };
      })
      .addCase(getAfterSubmitByFormId.fulfilled, (state, action) => {
        return {
          ...state,
          afterSubmitData: {
            loading: false,
            success: true,
            data: action.payload,
            afterSubmitFields: handleAppereance(action.payload?.afterSubmit)
          },
        };
      })
      .addCase(getAfterSubmitByFormId.rejected, (state, action) => {
        return {
          ...state,
          afterSubmitData: {
            ...state?.afterSubmitData,
            loading: false,
            success: false,
            error: action.payload,
          },
        };
      })
      .addCase(createNupdateAfterSubmit.pending, (state) => {
        return {
          ...state,
          afterSubmitData: {
            ...state?.afterSubmitData,
            loading: true,
            success: false,
          },
        };
      })
      .addCase(createNupdateAfterSubmit.fulfilled, (state, action) => {
        return {
          ...state,
          afterSubmitData: {
            loading: false,
            success: true,
            data: action.payload,
            afterSubmitFields: handleAppereance(action.payload?.afterSubmit),
          },
        };
      })
      .addCase(createNupdateAfterSubmit.rejected, (state, action) => {
        return {
          ...state,
          afterSubmitData: {
            ...state?.afterSubmitData,
            loading: false,
            success: false,
            error: action.payload,
          },
        };
      });
  },
});

export const {
  updatedValidationPayload,
  updatedAppearancePayload,
  updatedAfterSubmitPayload
} = formSettingSlice.actions;
export default formSettingSlice.reducer;
