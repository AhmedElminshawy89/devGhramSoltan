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
import offlineReducer from "../app/Feature/offlineSlice";
import offlineExpensesReducer from "../app/Feature/offlineExpensesSlice";
import { RentsApi } from "./Feature/API/Rents";
import offlineRentsSlice from "./Feature/offlineRentsSlice";
import { QuickworksApi } from "./Feature/API/QuickWorks";
import { StudioApi } from "./Feature/API/Studio";
import LoginSlice from "./Feature/API/LoginSlice";
import { MakeupApi } from "./Feature/API/MakeUp";
import { ReportApi } from "./Feature/API/Reports";
import { DailyApi } from "./Feature/API/Daily";
import { LandApi } from "./Feature/API/Land";
import { AdditionalRentsApi } from "./Feature/API/AdditionalRents";

const store = configureStore({
  reducer: {
    tab: tabReducer,
    offlineLoans: offlineReducer,
    offlineExpenses: offlineExpensesReducer,
    offlineRents: offlineRentsSlice,
    login: LoginSlice,
    [AdminApi.reducerPath]: AdminApi.reducer,
    [EmployeeApi.reducerPath]: EmployeeApi.reducer,
    [WorkerApi.reducerPath]: WorkerApi.reducer,
    [DiscountApi.reducerPath]: DiscountApi.reducer,
    [CategoryApi.reducerPath]: CategoryApi.reducer,
    [SubCategoryApi.reducerPath]: SubCategoryApi.reducer,
    [LoanEmployeeApi.reducerPath]: LoanEmployeeApi.reducer,
    [ExpenseApi.reducerPath]: ExpenseApi.reducer,
    [SearchApi.reducerPath]: SearchApi.reducer,
    [RentsApi.reducerPath]: RentsApi.reducer,
    [QuickworksApi.reducerPath]: QuickworksApi.reducer,
    [StudioApi.reducerPath]: StudioApi.reducer,
    [MakeupApi.reducerPath]: MakeupApi.reducer,
    [ReportApi.reducerPath]: ReportApi.reducer,
    [DailyApi.reducerPath]: DailyApi.reducer,
    [LandApi.reducerPath]: LandApi.reducer,
    [AdditionalRentsApi.reducerPath]: AdditionalRentsApi.reducer,
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
      RentsApi.middleware,
      QuickworksApi.middleware,
      StudioApi.middleware,
      MakeupApi.middleware,
      ReportApi.middleware,
      DailyApi.middleware,
      LandApi.middleware,
      AdditionalRentsApi.middleware
    ),
});

export default store;
