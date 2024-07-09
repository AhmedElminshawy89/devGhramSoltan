import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const ExpenseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/expense` }),
  reducerPath: "ExpenseApi",
  endpoints: (build) => ({
    getExpenses: build.query({
      query: (page) => `/show?page=${page}`,
      transformResponse: (response) => response.expense,
      providesTags: ["Expense"],
    }),
    saveExpense: build.mutation({
      query: (expenseData) => ({
        url: `/save`,
        method: "POST",
        body: expenseData,
      }),
      invalidatesTags: ["Expense"],
    }),
    updateExpense: build.mutation({
      query: ({ id, expenseData }) => ({
        url: `/update/${id}`,
        method: "POST",
        body: expenseData,
      }),
      invalidatesTags: ["Expense"],
    }),
    deleteExpense: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Expense"],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useSaveExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = ExpenseApi;
