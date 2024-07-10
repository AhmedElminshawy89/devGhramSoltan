import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: JSON.parse(localStorage.getItem("backupexpenses")) || [],
};

const offlineExpensesSlice = createSlice({
  name: "offlineExpenses",
  initialState,
  reducers: {
    addOfflineExpense: (state, action) => {
      state.expenses.push(action.payload);
      localStorage.setItem("backupexpenses", JSON.stringify(state.expenses));
    },
    updateOfflineExpense: (state, action) => {
      const updatedExpense = action.payload;
      const index = state.expenses.findIndex(
        (expense) => expense.id === updatedExpense.id
      );
      if (index !== -1) {
        state.expenses[index] = updatedExpense;
        localStorage.setItem("backupexpenses", JSON.stringify(state.expenses));
      }
    },
    setOfflineExpenses: (state, action) => {
      state.expenses = action.payload;
      localStorage.setItem("backupexpenses", JSON.stringify(state.expenses));
    },
    clearOfflineExpenses: (state) => {
      state.expenses = [];
      localStorage.removeItem("backupexpenses");
    },
  },
});

export const {
  addOfflineExpense,
  updateOfflineExpense,
  setOfflineExpenses,
  clearOfflineExpenses,
} = offlineExpensesSlice.actions;

export default offlineExpensesSlice.reducer;
