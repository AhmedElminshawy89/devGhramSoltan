import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const WorkerApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/job` }),
  reducerPath: "WorkerApi",
  endpoints: (build) => ({
    getWorkers: build.query({
      query: () => `/show`,
      transformResponse: (response) => response.jobs.data,
      providesTags: ["Worker"],
    }),
    saveWorker: build.mutation({
      query: (workerData) => ({
        url: `/save`,
        method: "POST",
        body: workerData,
      }),
      invalidatesTags: ["Worker"],
    }),
    updateWorker: build.mutation({
      query: ({ id, workerData }) => ({
        url: `/update/${id}`,
        method: "POST",
        body: workerData,
      }),
      invalidatesTags: ["Worker"],
    }),
    deleteWorker: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Worker"],
    }),
  }),
});

export const {
  useGetWorkersQuery,
  useSaveWorkerMutation,
  useUpdateWorkerMutation,
  useDeleteWorkerMutation,
} = WorkerApi;
