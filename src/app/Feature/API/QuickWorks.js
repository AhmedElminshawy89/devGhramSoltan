import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host"; // تأكد من استيراد المتغير host بشكل صحيح

export const QuickworksApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/work` }),
  reducerPath: "QuickworksApi",
  endpoints: (build) => ({
    getQuickworks: build.query({
      query: () => `/show`,
      transformResponse: (response) => response.works,
      providesTags: ["Quickworks"],
    }),
    saveQuickwork: build.mutation({
      query: (workData) => ({
        url: `/save`,
        method: "POST",
        body: workData,
      }),
      invalidatesTags: ["Quickworks"],
    }),
    updateQuickwork: build.mutation({
      query: ({ id, workData }) => ({
        url: `/update/${id}`,
        method: "POST",
        body: workData,
      }),
      invalidatesTags: ["Quickworks"],
    }),
    deleteQuickwork: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Quickworks"],
    }),
  }),
});

export const {
  useGetQuickworksQuery,
  useSaveQuickworkMutation,
  useUpdateQuickworkMutation,
  useDeleteQuickworkMutation,
} = QuickworksApi;
