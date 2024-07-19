import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const ReportApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/reports` }),
  reducerPath: "DailyApi",
  endpoints: (build) => ({
    getStudioReports: build.query({
      query: (page) => `/studioReports?page=${page}`,
      transformResponse: (response) => response.studio,
      providesTags: ["Reports"],
    }),
    getMakeUpReports: build.query({
      query: (page) => `/makeupReports?page=${page}`,
      transformResponse: (response) => response.makeup,
      providesTags: ["Reports"],
    }),
  }),
});

export const { useGetMakeUpReportsQuery, useGetStudioReportsQuery, useGetMakeupSearchReportsQuery } = ReportApi;
