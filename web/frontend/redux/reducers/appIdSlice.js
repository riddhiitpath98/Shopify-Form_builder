import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    appId: "",
    hostOrigin: ""
}

const storeAppId = createSlice({
    name: 'appId',
    initialState,
    reducers: {
        addAppId: (state, action) => {
            state.appId = action.payload
        },
        getHostOrigin: (state, action) => {
            state.hostOrigin = action.payload
        }
    }
})

export const { addAppId,getHostOrigin } = storeAppId.actions;
export default storeAppId.reducer;