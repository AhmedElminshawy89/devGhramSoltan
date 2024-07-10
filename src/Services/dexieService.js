// dexieService.js
import Dexie from "dexie";

const db = new Dexie("LoanDatabase");
db.version(1).stores({
  loans: "++id, employee_name, reason, price, created_at, updated_at",
});

export const saveData = async (data) => {
  await db.loans.bulkPut(data);
};

export const getData = async () => {
  return await db.loans.toArray();
};
