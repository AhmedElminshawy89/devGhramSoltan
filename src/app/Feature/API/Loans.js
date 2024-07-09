import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const LoanEmployeeApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/loans` }),
  reducerPath: "LoanEmployeeApi",
  endpoints: (build) => ({
    getLoans: build.query({
      query: (page) => `/show?page=${page}`,
      transformResponse: (response) => response.loan,
      providesTags: ["Loan"],
    }),
    saveLoans: build.mutation({
      query: (expenseData) => ({
        url: `/save`,
        method: "POST",
        body: expenseData,
      }),
      invalidatesTags: ["Loan"],
    }),
    updateLoan: build.mutation({
      query: ({ id, loanData }) => ({
        url: `/update/${id}`,
        method: "POST",
        body: loanData,
      }),
      invalidatesTags: ["Loan"],
    }),
    deleteLoan: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Loan"],
    }),
  }),
});

export const {
  useGetLoansQuery,
  useSaveLoansMutation,
  useUpdateLoanMutation,
  useDeleteLoanMutation,
} = LoanEmployeeApi;
