// dexieService.js
import Dexie from "dexie";

const db = new Dexie("ExpenseDatabase");

db.version(1).stores({
  expenses: "++id, employeeName, expenseReason, amount, createdAt, updatedAt",
});

export const saveExpenseData = async (expenseData) => {
  try {
    await db.expenses.add(expenseData);
    console.log("Expense saved to IndexedDB:", expenseData);
  } catch (error) {
    console.error("Error saving expense to IndexedDB:", error);
    throw error;
  }
};

export const getAllExpenses = async () => {
  try {
    const expenses = await db.expenses.toArray();
    console.log("Retrieved expenses from IndexedDB:", expenses);
    return expenses;
  } catch (error) {
    console.error("Error retrieving expenses from IndexedDB:", error);
    throw error;
  }
};
