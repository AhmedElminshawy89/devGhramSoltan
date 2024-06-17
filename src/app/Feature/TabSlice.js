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
  },
});

export const { setActiveTab } = tabsliceDashboard.actions;
export default tabsliceDashboard.reducer;
