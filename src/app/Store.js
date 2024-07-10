import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./Feature/TabSlice";
import { AdminApi } from "./Feature/API/Admin";
import { EmployeeApi } from "./Feature/API/Emplyee";
import { WorkerApi } from "./Feature/API/Workers";
import { DiscountApi } from "./Feature/API/Discount";
import { CategoryApi } from "./Feature/API/Package";
import { SubCategoryApi } from "./Feature/API/SubPackage";
import { LoanEmployeeApi } from "./Feature/API/Loans";
import { ExpenseApi } from "./Feature/API/Expenses";
import { SearchApi } from "./Feature/API/Search";
import offlineReducer from '../app/Feature/offlineSlice';
import offlineExpensesReducer from '../app/Feature/offlineExpensesSlice';

const store = configureStore({
  reducer: {
    tab: tabReducer,
    offlineLoans: offlineReducer,
    offlineExpenses: offlineExpensesReducer,
    [AdminApi.reducerPath]: AdminApi.reducer,
    [EmployeeApi.reducerPath]: EmployeeApi.reducer,
    [WorkerApi.reducerPath]: WorkerApi.reducer,
    [DiscountApi.reducerPath]: DiscountApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [SubCategoryApi.reducerPath]: SubCategoryApi.reducer,
    [LoanEmployeeApi.reducerPath]: LoanEmployeeApi.reducer,
    [ExpenseApi.reducerPath]: ExpenseApi.reducer,
    [SearchApi.reducerPath]: SearchApi.reducer,
  },
  middleware: (gDM) =>
    gDM().concat(
      AdminApi.middleware,
      EmployeeApi.middleware,
      WorkerApi.middleware,
      DiscountApi.middleware,
      CategoryApi.middleware,
      SubCategoryApi.middleware,
      LoanEmployeeApi.middleware,
      ExpenseApi.middleware,
      SearchApi.middleware,
    ),
});

export default store;
