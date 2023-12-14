import { createSlice } from "@reduxjs/toolkit";
import {
  addShopData,
  cancelSubscription,
  getInvoice,
  getUserByShopId,
} from "../actions/allActions";

const initialState = {
  userData: {
    user: {},
    subscription: {},
    data: {},
    session: {},
    error: "",
    loading: false,
    success: false,
  },
  invoiceData: {
    data: [],
    loading: false,
    error: "",
    success: false
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addClientSecret: (state, action) => {
      state.clientSecret = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addShopData.pending, (state, action) => {
        return {
          ...state,
          userData: {
            user: {},
            subscription: {},
            error: "",
            loading: true,
          },
        };
      })
      .addCase(addShopData.fulfilled, (state, action) => {
        return {
          ...state,
          userData: {
            user: action.payload.userData,
            subscription: action.payload.subscriptionData,
            error: "",
            loading: false,
            success: true,
          },
        };
      })
      .addCase(addShopData.rejected, (state, action) => {
        return {
          ...state,
          userData: {
            user: {},
            subscription: {},
            error: action.payload,
            loading: false,
          },
        };
      })
      .addCase(getUserByShopId.pending, (state, action) => {
        return {
          ...state,
          userData: {
            error: "",
            loading: true,
          },
        };
      })
      .addCase(getUserByShopId.fulfilled, (state, action) => {
        return {
          ...state,
          userData: {
            user: action.payload.userData,
            subscription: action.payload.subscriptionData,
            error: "",
            loading: false,
            success: true,
          },
        };
      })
      .addCase(getUserByShopId.rejected, (state, action) => {
        return {
          ...state,
          userData: {
            user: {},
            subscription: {},
            error: action.payload,
            loading: false,
          },
        };
      })
      .addCase(getInvoice.pending, (state, action) => {
        return {
          ...state,
          invoiceData: {
            error: "",
            loading: true,
          },
        };
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        return {
          ...state,
          invoiceData: {
            data: action.payload,
            loading: false,
            success: true,
          },
        };
      })
      .addCase(getInvoice.rejected, (state, action) => {
        return {
          ...state,
          invoiceData: {
            error: action.payload,
            loading: false,
          },
        };
      }).addCase(cancelSubscription.pending, (state, action) => {
        return {
          ...state,
          userData: {
            error: "",
            loading: true,
          },
        };
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        return {
          ...state,
          userData: {
            user: action.payload,
            error: "",
            loading: false,
            success: true,
          },
        };
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        return {
          ...state,
          userData: {
            user: {},
            error: action.payload,
            loading: false,
          },
        };
      });
  },
});

export const { addClientSecret } = userSlice.actions;

export default userSlice.reducer;
