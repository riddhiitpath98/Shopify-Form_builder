import { createSlice } from "@reduxjs/toolkit";
import {
  addFormData,
  deleteFormData,
  editVisibleFlag,
  fetchFormData,
  fetchFormDataById,
  updateFormData,
  updateReCaptchaSettings,
} from "../actions/allActions";
import { formatter, reverseFormate } from "../../utils/function";

const initialState = {
  inputFields: [],
  headerFieldData: {},
  footerFieldData: {},
  allElementData: {},
  formSubmissionData: {},
  googelRecaptcha: {},
  dateKeyName: "",
  finalFormData: {
    loading: false,
    error: "",
    success: false,
    formData: [],
  },
  editFormData: {
    loading: false,
    error: "",
    success: false,
    formData: {},
    isEdit: false,
  },
};

export const inputFieldsSlice = createSlice({
  name: "inputs",
  initialState,
  reducers: {
    addElement: (state, action) => {
      const { isEdit, ...payload } = action.payload;
      if (isEdit) {
        const formateData = {
          ...formatter(state?.editFormData?.formData?.customForm),
        };
        const cloneData = [...formateData.element];
        const index = cloneData.findIndex(
          (data) => data.inputId === payload.inputId
        );
        if (index === -1) {
          cloneData.push(payload);
        }
        formateData.element = cloneData;
        return {
          ...state,
          inputFields: [...state.inputFields, action.payload],
          editFormData: {
            ...state.editFormData,
            formData: {
              ...state?.editFormData?.formData,
              customForm: reverseFormate(formateData),
            },
          },
        };
      } else
        return {
          ...state,
          inputFields: [...state.inputFields, action.payload],
        };
    },
    handleDragDrop: (state, action) => {
      return {
        ...state,
        inputFields: action.payload
      }
    },
    addHeaderElement: (state, action) => {
      return {
        ...state,
        headerFieldData: action.payload,
      };
    },

    addFooterElement: (state, action) => {
      return {
        ...state,
        footerFieldData: action.payload,
      };
    },

    addAllElement: (state, action) => {
      return {
        ...state,
        allElementData: action.payload,
      };
    },
    updateEnableRecaptcha: (state, action) => {
      return {
        ...state,
        googelRecaptcha: action.payload
      }
    },
    addFormSubmission: (state, action) => {
      return {
        ...state, formSubmissionData: action.payload
      }
    },
    setDateKeyName: (state, action) => {
      return {
        ...state, dateKeyName: action.payload
      }
    },

    updatePayload: (state, action) => {
      const { attributes, inputId, isEdit } = action.payload;
      const cloneData = [...state.inputFields];
      const index = cloneData.findIndex((val) => val.inputId === inputId);
      cloneData[index] = { ...cloneData[index], attributes };
      return { ...state, inputFields: cloneData };
    },

    clearForm: () => {
      return initialState;
    },

    removeElement: (state, action) => {
      state.inputFields = state.inputFields.filter(
        (value) => value?.inputId !== action?.payload?.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormData.pending, (state) => {
        return {
          ...state,
          finalFormData: {
            loading: true,
            formData: [...state?.finalFormData?.formData],
          },
        };
      })
      .addCase(fetchFormData.fulfilled, (state, action) => {
        return {
          ...state,
          finalFormData: {
            loading: false,
            formData: action.payload,
          },
        };
      })
      .addCase(fetchFormData.rejected, (state, action) => {
        return {
          ...state,
          finalFormData: {
            loading: false,
            formData: [],
            error: action.payload,
          },
        };
      })
      .addCase(deleteFormData.pending, (state, action) => {
        return {
          ...state,
          finalFormData: {
            loading: true,
            success: false,
            formData: [...state?.finalFormData?.formData],
            error: "",
          },
        };
      })
      .addCase(deleteFormData.fulfilled, (state, action) => {
        return {
          ...state,
          finalFormData: {
            loading: false,
            formData: action.payload,
            error: "",
          },
        };
      })
      .addCase(deleteFormData.rejected, (state, action) => {
        return {
          ...state,
          finalFormData: {
            loading: false,
            formData: [],
            error: action.payload,
          },
        };
      })
      .addCase(addFormData.pending, (state, action) => {
        return {
          ...state,
          finalFormData: {
            loading: true,
            success: false,
            formData: [...state?.finalFormData?.formData],
            error: "",
          },
        };
      })
      .addCase(addFormData.fulfilled, (state, action) => {
        return {
          ...state,
          finalFormData: {
            loading: false,
            success: true,
            formData: [action.payload.data],
            error: "",
          },
        };
      })
      .addCase(addFormData.rejected, (state, action) => {
        return {
          ...state,
          finalFormData: {
            loading: false,
            success: false,
            formData: [],
            error: action.payload,
          },
        };
      })
      .addCase(editVisibleFlag.pending, (state, action) => {
        return {
          ...state,
          finalFormData: {
            loading: true,
            success: false,
            formData: [...state?.finalFormData?.formData],
            error: "",
          },
        };
      })
      .addCase(editVisibleFlag.fulfilled, (state, action) => {
        return {
          ...state,
          finalFormData: {
            loading: false,
            success: true,
            formData: action.payload,
            error: "",
          },
        };
      })
      .addCase(editVisibleFlag.rejected, (state, action) => {
        return {
          ...state,
          finalFormData: {
            loading: false,
            success: false,
            formData: [],
            error: action.payload,
          },
        };
      })
      .addCase(updateReCaptchaSettings.fulfilled, (state, action) => {
        return {
          ...state,
          finalFormData: {
            formData: [...state?.finalFormData?.formData],
          },
        };
      })
      .addCase(fetchFormDataById.pending, (state) => {
        return {
          ...state,
          editFormData: {
            ...state?.editFormData,
            loading: true,
          },
        };
      })
      .addCase(fetchFormDataById.fulfilled, (state, action) => {
        const formateData = {
          ...formatter(action.payload.customForm),
        };
        return {
          ...state,
          inputFields: [...formateData.element],
          headerFieldData: { ...formateData.header },
          footerFieldData: { ...formateData.footer },
          editFormData: {
            ...state?.editFormData,
            success: true,
            isEdit: true,
            loading: false,
            formData: action.payload,
          },
        };
      })
      .addCase(fetchFormDataById.rejected, (state, action) => {
        return {
          ...state,
          editFormData: {
            ...state?.editFormData,
            loading: false,
            success: false,
            error: action.payload,
          },
        };
      })
      .addCase(updateFormData.pending, (state) => {
        return {
          ...state,
          finalFormData: {
            ...state.finalFormData,
            loading: true,
          },
        };
      })
      .addCase(updateFormData.fulfilled, (state, action) => {
        return {
          ...state,
          finalFormData: {
            ...state.finalFormData,
            loading: false,
            success: true,
            formData: action.payload,
          },
        };
      })
      .addCase(updateFormData.rejected, (state, action) => {
        return {
          ...state,
          finalFormData: {
            ...state.finalFormData,
            loading: false,
            error: action.payload,
          },
        };
      });
  },
});

export const {
  addElement,
  addHeaderElement,
  addFooterElement,
  addAllElement,
  updatePayload,
  clearForm,
  removeElement,
  addFormSubmission,
  setDateKeyName,
  updateEnableRecaptcha,
  handleDragDrop
} = inputFieldsSlice.actions;
export default inputFieldsSlice.reducer;
