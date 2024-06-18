import { createSlice } from "@reduxjs/toolkit";

export const tabsliceDashboard = createSlice({
  name: "tabSlice",
  initialState: {
    activeTab: false,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setActiveFalse: (state) => {
      state.activeTab = false;
    },
    setActiveTrue: (state) => {
      state.activeTab = true;
    },
  },
});

export const { setActiveTab, setActiveFalse, setActiveTrue } =
  tabsliceDashboard.actions;
export default tabsliceDashboard.reducer;
