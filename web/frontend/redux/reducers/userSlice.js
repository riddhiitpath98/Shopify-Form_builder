import { createSlice } from "@reduxjs/toolkit";
import {
  addShopData,
  createSessionCheckout,
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
  clientSecret: null,
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
            user: {},
            subscription: {},
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
      .addCase(createSessionCheckout.pending, (state, action) => {
        return {
          ...state,
          userData: {
            session: {},
            error: "",
            loading: true,
          },
        };
      })
      .addCase(createSessionCheckout.fulfilled, (state, action) => {
        return {
          ...state,
          userData: {
            session: action.payload,
            error: "",
            loading: false,
            success: true,
          },
        };
      })
      .addCase(createSessionCheckout.rejected, (state, action) => {
        return {
          ...state,
          userData: {
            session: {},
            error: action.payload,
            loading: false,
          },
        };
      });
  },
});

export const { addClientSecret } = userSlice.actions;

export default userSlice.reducer;
