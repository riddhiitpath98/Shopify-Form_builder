import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    shopId: "",
    hostOrigin: ""
}

const storeAppId = createSlice({
    name: 'shopId',
    initialState,
    reducers: {
        addShopId: (state, action) => {
            console.log('action: ', action);
            state.shopId = action.payload
        },
        getHostOrigin: (state, action) => {
            state.hostOrigin = action.payload
        }
    }
})

export const { addShopId, getHostOrigin } = storeAppId.actions;
export default storeAppId.reducer;