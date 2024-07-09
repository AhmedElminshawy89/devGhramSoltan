import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const SearchApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/search` }),
  reducerPath: "SearchApi",
  endpoints: (build) => ({
    searchSubCategory: build.query({
      query: (searchTerm) => `/SearchSubCategory?search=${searchTerm}`,
      transformResponse: (response) => response,
      providesTags: ["Category"],
    }),
    searchExpense: build.query({
      query: (searchTerm) => `/SearchExpense?search=${searchTerm}`,
    }),
    searchLoans: build.query({
      query: (searchTerm) => `/SearchLoans?search=${searchTerm}`,
    }),
    searchAdmin: build.query({
      query: (searchTerm) => `/SearchAdmin?search=${searchTerm}`,
    }),
    searchEmployee: build.query({
      query: (searchTerm) => `/SearchEmployee?search=${searchTerm}`,
    }),
    searchJob: build.query({
      query: (searchTerm) => `/SearchJob?search=${searchTerm}`,
    }),
    searchDiscount: build.query({
      query: (searchTerm) => `/SearchDiscount?search=${searchTerm}`,
    }),
    searchCategory: build.query({
      query: (searchTerm) => `/SearchCategory?search=${searchTerm}`,
    }),
  }),
});

export const {
  useSearchSubCategoryQuery,
  useSearchExpenseQuery,
  useSearchLoansQuery,
  useSearchAdminQuery,
  useSearchEmployeeQuery,
  useSearchJobQuery,
  useSearchDiscountQuery,
  useSearchCategoryQuery,
} = SearchApi;
