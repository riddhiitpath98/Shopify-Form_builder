import { createSlice } from "@reduxjs/toolkit";
import { getAllSubscription, getSubscriptionById } from "../actions/allActions";

const initialState = {
    subscriptionData: {
        data: {},
        error: "",
        loading: false,
    },
};

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllSubscription.pending, (state, action) => {
                return {
                    ...state,
                    subscriptionData: {
                        loading: true,
                        data: {},
                        error: "",
                    },
                };
            })
            .addCase(getAllSubscription.fulfilled, (state, action) => {
                return {
                    ...state,
                    subscriptionData: {
                        loading: false,
                        data: action.payload,
                        error: "",
                    },
                };
            })
            .addCase(getAllSubscription.rejected, (state, action) => {
                return {
                    ...state,
                    subscriptionData: {
                        loading: false,
                        data: {},
                        error: action.payload,
                    },
                };
            })
            .addCase(getSubscriptionById.pending, (state, action) => {
                return {
                    ...state,
                    subscriptionData: {
                        loading: true,
                        data: {},
                        error: "",
                    },
                };
            })
            .addCase(getSubscriptionById.fulfilled, (state, action) => {
                return {
                    ...state,
                    subscriptionData: {
                        loading: false,
                        data: action.payload,
                        error: "",
                    },
                };
            })
            .addCase(getSubscriptionById.rejected, (state, action) => {
                return {
                    ...state,
                    subscriptionData: {
                        loading: false,
                        data: {},
                        error: action.payload,
                    },
                };
            });
    },
});

export default subscriptionSlice.reducer;
