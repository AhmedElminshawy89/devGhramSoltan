import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const MakeupApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/makeup` }),
  reducerPath: "MakeupApi",
  endpoints: (build) => ({
    getMakeups: build.query({
      query: (page) => `/show?page=${page}`,
      transformResponse: (response) => response.makeups,
      providesTags: ["Makeup"],
    }),
    saveMakeup: build.mutation({
      query: (makeupData) => ({
        url: `/save`,
        method: "POST",
        body: makeupData,
      }),
      invalidatesTags: ["Makeup"],
    }),
    updateMakeup: build.mutation({
      query: ({ id, makeupData }) => ({
        url: `/update/${id}`,
        method: "POST",
        body: makeupData,
      }),
      invalidatesTags: ["Makeup"],
    }),
    deleteMakeup: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Makeup"],
    }),
  }),
});

export const {
  useGetMakeupsQuery,
  useSaveMakeupMutation,
  useUpdateMakeupMutation,
  useDeleteMakeupMutation,
} = MakeupApi;
