import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const StudioApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/studio` }),
  reducerPath: "StudioApi",
  endpoints: (build) => ({
    getStudios: build.query({
      query: (page) => `/show?page=${page}`,
      transformResponse: (response) => response.studio,
      providesTags: ["Studio"],
    }),
    saveStudio: build.mutation({
      query: (studioData) => ({
        url: `/save`,
        method: "POST",
        body: studioData,
      }),
      invalidatesTags: ["Studio"],
    }),
    updateStudio: build.mutation({
      query: ({ id, studioData }) => ({
        url: `/update/${id}`,
        method: "POST",
        body: studioData,
      }),
      invalidatesTags: ["Studio"],
    }),
    deleteStudio: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Studio"],
    }),
  }),
});

export const {
  useGetStudiosQuery,
  useSaveStudioMutation,
  useUpdateStudioMutation,
  useDeleteStudioMutation,
} = StudioApi;
