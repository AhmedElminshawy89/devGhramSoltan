import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loans: JSON.parse(localStorage.getItem("backuploans")) || [],
};

const offlineSlice = createSlice({
  name: "offlineLoans",
  initialState,
  reducers: {
    addOfflineLoan: (state, action) => {
      state.loans.push(action.payload);
      localStorage.setItem("backuploans", JSON.stringify(state.loans));
    },
    updateOfflineLoan: (state, action) => {
      const updatedLoan = action.payload;
      const index = state.loans.findIndex((loan) => loan.id === updatedLoan.id);
      if (index !== -1) {
        state.loans[index] = updatedLoan;
        localStorage.setItem("backuploans", JSON.stringify(state.loans));
      }
    },
    setOfflineLoans: (state, action) => {
      state.loans = action.payload;
      localStorage.setItem("backuploans", JSON.stringify(state.loans));
    },
    clearOfflineLoans: (state) => {
      state.loans = [];
      localStorage.removeItem("backuploans");
    },
  },
});

export const {
  addOfflineLoan,
  updateOfflineLoan,
  setOfflineLoans,
  clearOfflineLoans,
} = offlineSlice.actions;

export default offlineSlice.reducer;
