import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const LandApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin` }),
  reducerPath: "LandApi",
  endpoints: (build) => ({
    getBanners: build.query({
      query: (page) => `/mainLand/show?page=${page}`,
      transformResponse: (response) => response.main,
      providesTags: ["land"],
    }),
    getImportantLand: build.query({
        query: (page) => `/importantLand/show?page=${page}`,
        transformResponse: (response) => response.important,
        providesTags: ["land"],
      }),
      getImportantLandUser: build.query({
        query: () => `/importantLand/showWithoutPag`,
        transformResponse: (response) => response.important,
        providesTags: ["land"],
      }),
      getAdvantageLand: build.query({
        query: (page) => `/advantageLand/show?page=${page}`,
        transformResponse: (response) => response.advantage,
        providesTags: ["land"],
      }),
      getAdvantageLandUser: build.query({
        query: () => `advantageLand/showWithoutPag`,
        transformResponse: (response) => response.advantage,
        providesTags: ["land"],
      }),
      getMainLandUser: build.query({
        query: () => `/land/showMainLand`,
        transformResponse: (response) => response.main,
        providesTags: ["land"],
      }),


    saveBanner: build.mutation({
      query: (bannerData) => ({
        url: `/mainLand/save`,
        method: "POST",
        body: bannerData,
      }),
      invalidatesTags: ["land"],
    }),
    saveImportantLand: build.mutation({
        query: (bannerData) => ({
          url: `/importantLand/save`,
          method: "POST",
          body: bannerData,
        }),
        invalidatesTags: ["land"],
      }),
      saveAdvantageLand: build.mutation({
        query: (bannerData) => ({
          url: `/advantageLand/save`,
          method: "POST",
          body: bannerData,
        }),
        invalidatesTags: ["land"],
      }),
    updateBanner: build.mutation({
      query: ({ id, bannerData }) => ({
        url: `/mainLand/update/${id}`,
        method: "POST",
        body: bannerData,
      }),
      invalidatesTags: ["land"],
    }),
    updateImportantLand: build.mutation({
        query: ({ id, bannerData }) => ({
          url: `/importantLand/update/${id}`,
          method: "POST",
          body: bannerData,
        }),
        invalidatesTags: ["land"],
      }),
      updateAdvantageLand: build.mutation({
        query: ({ id, bannerData }) => ({
          url: `/advantageLand/update/${id}`,
          method: "POST",
          body: bannerData,
        }),
        invalidatesTags: ["land"],
      }),
    deleteBanner: build.mutation({
      query: (id) => ({
        url: `/mainLand/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["land"],
    }),
    deleteImportantLand: build.mutation({
        query: (id) => ({
          url: `/importantLand/delete/${id}`,
          method: "GET",
        }),
        invalidatesTags: ["land"],
      }),
      deleteAdvantageLand: build.mutation({
        query: (id) => ({
          url: `/advantageLand/delete/${id}`,
          method: "GET",
        }),
        invalidatesTags: ["land"],
      }),
    updateBannerStatus: build.mutation({
      query: (id) => ({
        url: `/mainLand/updateStatus/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["land"],
    }),
  }),
});

export const {
    useGetBannersQuery,
    useGetImportantLandQuery,
    useGetImportantLandUserQuery,
    useGetAdvantageLandQuery,
    useGetMainLandUserQuery,
    useGetAdvantageLandUserQuery,
    useSaveBannerMutation,
    useSaveImportantLandMutation,
    useSaveAdvantageLandMutation,

    useUpdateBannerMutation,
    useUpdateImportantLandMutation,
    useUpdateAdvantageLandMutation,

    useDeleteBannerMutation,
    useDeleteImportantLandMutation,
    useDeleteAdvantageLandMutation,

    useUpdateBannerStatusMutation,
} = LandApi;
