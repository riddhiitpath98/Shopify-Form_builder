import { createSlice } from "@reduxjs/toolkit";
import { addShopData } from "../actions/allActions";

const initialState = {
  userData: {
    user: {},
    subscription: {},
    error: "",
    loading: false,
    success: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
            user: action.payload.data.userData,
            subscription: action.payload.data.subscriptionData,
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
      });
  },
});

export default userSlice.reducer;
