import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const AdditionalRentsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin` }),
  reducerPath: "AdditionalRentsApi",
  tagTypes: ["rents"],
  endpoints: (build) => ({
    getRents: build.query({
      query: (page) => `/additionalRents/show?page=${page}`,
      transformResponse: (response) => response.rents,
      providesTags: ["rents"],
    }),
    getAllRentsWithoutPagination: build.query({
        query: () => `/additionalRents/showWithoutPag`,
        transformResponse: (response) => response.rents,
        providesTags: ["rents"],
      }),
    saveRents: build.mutation({
      query: (rentData) => ({
        url: `/additionalRents/save`,
        method: "POST",
        body: rentData,
      }),
      invalidatesTags: ["rents"],
    }),
    updateRents: build.mutation({
      query: ({ id, rentData }) => ({
        url: `/additionalRents/update/${id}`,
        method: "POST",
        body: rentData,
      }),
      invalidatesTags: ["rents"],
    }),
    deleteRents: build.mutation({
      query: (id) => ({
        url: `/additionalRents/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["rents"],
    }),
  }),
});

export const {
  useGetRentsQuery,
  useGetAllRentsWithoutPaginationQuery,
  useSaveRentsMutation,
  useUpdateRentsMutation,
  useDeleteRentsMutation,
} = AdditionalRentsApi;
