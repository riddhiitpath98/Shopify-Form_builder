import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedViewport: "desktop",
};

const viewPortSlice = createSlice({
  name: "viewPort",
  initialState,
  reducers: {
    setSelectedViewport: (state, action) => {
      return {
        ...state,
        selectedViewport: action.payload,
      };
    },
  },
});

export const { setSelectedViewport } = viewPortSlice.actions;
export default viewPortSlice.reducer;
