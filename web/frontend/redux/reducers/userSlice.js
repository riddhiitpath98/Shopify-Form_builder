import { createSlice } from "@reduxjs/toolkit";
import { addShopData } from '../actions/allActions';

const initialState = {
    userData: {
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
                    success: false
                }
            };
        })
            .addCase(addShopData.fulfilled, (state, action) => {
                return {
                    ...state,
                    userData: {
                        data: action.payload,
                        error: "",
                        loading: false,
                        success: true,
                    }
                };
            })
            .addCase(addShopData.rejected, (state, action) => {
                return {
                    ...state,
                    userData: {
                        data: {},
                        error: action.payload,
                        loading: false,
                        success: false
                    }
                };
            })
    }
})

export default userSlice