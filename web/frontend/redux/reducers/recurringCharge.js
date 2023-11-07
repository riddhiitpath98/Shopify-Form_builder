import { createSlice } from "@reduxjs/toolkit";
import { createApplicationCharge, getApplicationCharge } from "../actions/allActions";

const initialState = {
    newRecurringCharge: {
        data: {},
        error: "",
        loading: false,
        success: false,
    },
    recurringCharges: {
        data: [],
        error: "",
        loading: false,
        success: false,
    },
};

const recurringApplicationCharge = createSlice({
    name: "recurringCharge",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getApplicationCharge.pending, (state, action) => {
                return {
                    ...state,
                    recurringCharges: {
                        success: false,
                        loading: true,
                        data: [],
                        error: "",
                    },
                };
            })
            .addCase(getApplicationCharge.fulfilled, (state, action) => {
                return {
                    ...state,
                    recurringCharges: {
                        loading: false,
                        data: action.payload,
                        error: "",
                        success: true,
                    },
                };
            })
            .addCase(getApplicationCharge.rejected, (state, action) => {
                return {
                    ...state,
                    recurringCharges: {
                        loading: false,
                        data: [],
                        error: action.payload,
                        success: false,
                    },
                };
            })
            .addCase(createApplicationCharge.pending, (state, action) => {
                return {
                    ...state,
                    newRecurringCharge: {
                        success: false,
                        loading: true,
                        data: {},
                        error: "",
                    },
                };
            })
            .addCase(createApplicationCharge.fulfilled, (state, action) => {
                return {
                    ...state,
                    newRecurringCharge: {
                        loading: false,
                        data: action.payload,
                        error: "",
                        success: true,
                    },
                };
            })
            .addCase(createApplicationCharge.rejected, (state, action) => {
                return {
                    ...state,
                    newRecurringCharge: {
                        loading: false,
                        data: {},
                        error: action.payload,
                        success: false,
                    },
                };
            })
    },
});

export default recurringApplicationCharge.reducer;