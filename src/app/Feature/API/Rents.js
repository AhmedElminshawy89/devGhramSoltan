import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const RentsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/rent` }),
  reducerPath: "RentsApi",
  tagTypes: ["rents"],
  endpoints: (build) => ({
    getRents: build.query({
      query: (page) => `/show?page=${page}`,
      transformResponse: (response) => response.rents,
      providesTags: ["rents"],
    }),
    saveRents: build.mutation({
      query: (rentData) => ({
        url: `/save`,
        method: "POST",
        body: rentData,
      }),
      invalidatesTags: ["rents"],
    }),
    updateRents: build.mutation({
      query: ({ id, rentData }) => ({
        url: `/update/${id}`,
        method: "POST",
        body: rentData,
      }),
      invalidatesTags: ["rents"],
    }),
    deleteRents: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["rents"],
    }),
    updateRentsStatus: build.mutation({
      query: (id) => ({
        url: `/updateStatus/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["rents"],
    }),
  }),
});

export const {
  useGetRentsQuery,
  useSaveRentsMutation,
  useUpdateRentsMutation,
  useDeleteRentsMutation,
  useUpdateRentsStatusMutation,
} = RentsApi;
