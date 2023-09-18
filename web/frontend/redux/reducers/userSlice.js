import { createSlice } from "@reduxjs/toolkit";
import { addShopData, getUserByShopId } from '../actions/allActions';

const initialState = {
    userData: {
        user: {},
        subscription: {},
        data: {},
        error: "",
        loading: false,
        success: false
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addShopData.pending, (state, action) => {
            return {
                ...state,
                userData: {
                    data: {},
                    error: "",
                    loading: true,
                }
            };
        }).addCase(addShopData.fulfilled, (state, action) => {
            return {
                ...state,
                userData: {
                    data: action.payload,
                    error: "",
                    loading: false,
                    success: true,
                }
            };
        }).addCase(addShopData.rejected, (state, action) => {
            return {
                ...state,
                userData: {
                    data: {},
                    error: action.payload,
                    loading: false,
                }
            };
        }).addCase(getUserByShopId.pending, (state, action) => {
            return {
                ...state,
                userData: {
                    user: {},
                    subscription: {},
                    error: "",
                    loading: true,
                }
            };
        }).addCase(getUserByShopId.fulfilled, (state, action) => {
            return {
                ...state,
                userData: {
                    user: action.payload.userData,
                    subscription: action.payload.subscriptionData,
                    error: "",
                    loading: false,
                    success: true,
                }
            };
        }).addCase(getUserByShopId.rejected, (state, action) => {
            return {
                ...state,
                userData: {
                    user: {},
                    subscription: {},
                    error: action.payload,
                    loading: false,
                }
            };
        });
    }
})

export default userSlice.reducer