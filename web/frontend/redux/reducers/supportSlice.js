import { createSlice } from "@reduxjs/toolkit";
import { addFeedback, contactUs } from "../actions/allActions";

const initialState = {
  contactUsData: {
    data: {},
    error: "",
    loading: false,
  },
  feedbackData: {
    data: {},
    error: "",
    loading: false,
  },
};

const supportSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(contactUs.pending, (state, action) => {
        return {
          ...state,
          contactUsData: {
            loading: true,
            data: {},
            error: "",
          },
        };
      })
      .addCase(contactUs.fulfilled, (state, action) => {
        return {
          ...state,
          contactUsData: {
            loading: false,
            data: action.payload,
            error: "",
          },
        };
      })
      .addCase(contactUs.rejected, (state, action) => {
        return {
          ...state,
          contactUsData: {
            loading: false,
            data: {},
            error: action.payload,
          },
        };
      })
      .addCase(addFeedback.pending, (state, action) => {
        return {
          ...state,
          feedbackData: {
            loading: true,
            data: {},
            error: "",
          },
        };
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        return {
          ...state,
          feedbackData: {
            loading: false,
            data: action.payload,
            error: "",
          },
        };
      })
      .addCase(addFeedback.rejected, (state, action) => {
        return {
          ...state,
          feedbackData: {
            loading: false,
            data: {},
            error: action.payload,
          },
        };
      });
  },
});

// export const { contactUsData } = supportSlice.actions;

export default supportSlice.reducer;
