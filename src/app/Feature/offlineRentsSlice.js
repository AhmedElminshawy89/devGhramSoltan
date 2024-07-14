import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rents: JSON.parse(localStorage.getItem("backuprents")) || [],
};

const offlineRentsSlice = createSlice({
  name: "offlineRents",
  initialState,
  reducers: {
    addOfflineRent: (state, action) => {
      state.rents.push(action.payload);
      localStorage.setItem("backuprents", JSON.stringify(state.rents));
    },
    updateOfflineRent: (state, action) => {
      const updatedRent = action.payload;
      const index = state.rents.findIndex((rent) => rent.id === updatedRent.id);
      if (index !== -1) {
        state.rents[index] = updatedRent;
      } else {
        state.rents.push(updatedRent);
      }
      localStorage.setItem("backuprents", JSON.stringify(state.rents));
    },
    setOfflineRents: (state, action) => {
      state.rents = action.payload;
      localStorage.setItem("backuprents", JSON.stringify(state.rents));
    },
    clearOfflineRents: (state) => {
      state.rents = [];
      localStorage.removeItem("backuprents");
    },
  },
});

export const {
  addOfflineRent,
  updateOfflineRent,
  setOfflineRents,
  clearOfflineRents,
} = offlineRentsSlice.actions;

export default offlineRentsSlice.reducer;
