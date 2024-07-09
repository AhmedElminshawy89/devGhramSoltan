import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

// export const WorkerApi = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/job` }),
//   reducerPath: "WorkerApi",
//   endpoints: (build) => ({
//     getWorkers: build.query({
//       query: () => `/show`,
//       transformResponse: (response) => response.jobs.data,
//       providesTags: ["Worker"],
//     }),
//     saveWorker: build.mutation({
//       query: (workerData) => ({
//         url: `/save`,
//         method: "POST",
//         body: workerData,
//       }),
//       invalidatesTags: ["Worker"],
//     }),
//     updateWorker: build.mutation({
//       query: ({ id, workerData }) => ({
//         url: `/update/${id}`,
//         method: "POST",
//         body: workerData,
//       }),
//       invalidatesTags: ["Worker"],
//     }),
//     deleteWorker: build.mutation({
//       query: (id) => ({
//         url: `/delete/${id}`,
//         method: "GET",
//       }),
//       invalidatesTags: ["Worker"],
//     }),
//   }),
// });

export const DiscountApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/discount` }),
  reducerPath: "DiscountApi",
  endpoints: (build) => ({
    getDiscounts: build.query({
      query: (page) => `/show?page=${page}`,
      transformResponse: (response) => response.discounts,
      providesTags: ["Discount"],
    }),
    saveDiscount: build.mutation({
      query: (discountData) => ({
        url: `/save`,
        method: "POST",
        body: discountData,
      }),
      invalidatesTags: ["Discount"],
    }),
    updateDiscount: build.mutation({
      query: ({ id, discountData }) => ({
        url: `/update/${id}`,
        method: "POST",
        body: discountData,
      }),
      invalidatesTags: ["Discount"],
    }),
    deleteDiscount: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Discount"],
    }),
  }),
});

// export const {
//   useGetWorkersQuery,
//   useSaveWorkerMutation,
//   useUpdateWorkerMutation,
//   useDeleteWorkerMutation,
// } = WorkerApi;

export const {
  useGetDiscountsQuery,
  useSaveDiscountMutation,
  useUpdateDiscountMutation,
  useDeleteDiscountMutation,
} = DiscountApi;
