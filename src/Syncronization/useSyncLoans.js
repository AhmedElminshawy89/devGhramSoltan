import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { OnlineStatusContext } from "../Provider/OnlineStatusProvider";
import { useSaveLoansMutation } from "../app/Feature/API/Loans";
import { useSaveExpenseMutation } from "../app/Feature/API/Expenses";
import { setOfflineLoans } from "../app/Feature/offlineSlice";
import { setOfflineExpenses } from "../app/Feature/offlineExpensesSlice";
import { useSaveRentsMutation } from "../app/Feature/API/Rents";
import { setOfflineRents } from "../app/Feature/offlineRentsSlice";

const useSyncLoans = (dispatch) => {
  const isOnline = useContext(OnlineStatusContext);

  const loansOffline = useSelector((state) => state.offlineLoans.loans) || [];
  const [saveLoan] = useSaveLoansMutation();

  const expensesOffline =
    useSelector((state) => state.offlineExpenses.expenses) || [];

    const rentsOffline =
    useSelector((state) => state.offlineRents.rents) || [];
  const [saveExpense] = useSaveExpenseMutation();

  const [saveRents] = useSaveRentsMutation();

  useEffect(() => {
    const syncOfflineData = async () => {
      try {
        // Sync Loans
        if (!isOnline && loansOffline.length === 0) {
          const offlineLoansData =
            JSON.parse(localStorage.getItem("backuploans")) || [];
          dispatch(setOfflineLoans(offlineLoansData));
        } else if (isOnline && loansOffline.length > 0) {
          const updatedLoans = [];
          for (const loan of loansOffline) {
            try {
              await saveLoan(loan).unwrap();
              updatedLoans.push(loan.id);
            } catch (error) {
              console.error("Failed to sync loan:", error);
            }
          }
          if (updatedLoans.length > 0) {
            const remainingLoans = loansOffline.filter(
              (item) => !updatedLoans.includes(item.id)
            );
            dispatch(setOfflineLoans(remainingLoans));
            localStorage.setItem("backuploans", JSON.stringify(remainingLoans));
            toast.success(
              "تم استعادة جميع بيانات السلف المخزنة دون اتصال ودمجها بنجاح مع قاعدة البيانات الأساسية الآن."
            );
          }
        }

        // Sync Expenses
        if (!isOnline && expensesOffline.length === 0) {
          const offlineExpensesData =
            JSON.parse(localStorage.getItem("backupexpenses")) || [];
          dispatch(setOfflineExpenses(offlineExpensesData));
        } else if (isOnline && expensesOffline.length > 0) {
          const updatedExpenses = [];
          for (const expense of expensesOffline) {
            try {
              await saveExpense(expense).unwrap();
              updatedExpenses.push(expense.id);
            } catch (error) {
              console.error("Failed to sync expense:", error);
            }
          }
          if (updatedExpenses.length > 0) {
            const remainingExpenses = expensesOffline.filter(
              (item) => !updatedExpenses.includes(item.id)
            );
            dispatch(setOfflineExpenses(remainingExpenses));
            localStorage.setItem(
              "backupexpenses",
              JSON.stringify(remainingExpenses)
            );
            toast.success(
              "تم استعادة جميع بيانات مصروفات المخزنة دون اتصال ودمجها بنجاح مع قاعدة البيانات الأساسية الآن."
            );
          }
        }

        // Sync Rents
        if (!isOnline && rentsOffline.length === 0) {
          const offlineExpensesData =
            JSON.parse(localStorage.getItem("backuprents")) || [];
          dispatch(setOfflineExpenses(offlineExpensesData));
        } else if (isOnline && rentsOffline.length > 0) {
          const updatedExpenses = [];
          for (const rents of rentsOffline) {
            try {
              await saveRents(rents).unwrap();
              updatedExpenses.push(rents.id);
            } catch (error) {
              console.error("Failed to sync expense:", error);
            }
          }
          if (updatedExpenses.length > 0) {
            const remainingExpenses = rentsOffline.filter(
              (item) => !updatedExpenses.includes(item.id)
            );
            dispatch(setOfflineRents(remainingExpenses));
            localStorage.setItem(
              "backuprents",
              JSON.stringify(remainingExpenses)
            );
            toast.success(
              "تم استعادة جميع بيانات الايجارات المخزنة دون اتصال ودمجها بنجاح مع قاعدة البيانات الأساسية الآن."
            );
          }
        }
      } catch (error) {
        console.error("Error syncing offline data:", error);
      }
    };

    syncOfflineData();
  }, [isOnline, dispatch, saveLoan, saveExpense]);

  // Note: Remember to return any cleanup function if necessary
};

export default useSyncLoans;
