import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    shopId: "",
    hostOrigin: "",
    appName: "",
}

const storeAppId = createSlice({
    name: 'shopId',
    initialState,
    reducers: {
        addShopId: (state, action) => {
            state.shopId = action.payload
        },
        getHostOrigin: (state, action) => {
            state.hostOrigin = action.payload
        },
        getAppName: (state, action) => {
            state.appName = action.payload
        }
    }
})

export const { addShopId, getHostOrigin, getAppName } = storeAppId.actions;
export default storeAppId.reducer;