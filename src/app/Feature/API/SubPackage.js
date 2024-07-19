import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const SubCategoryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/subCategory` }),
  reducerPath: "SubCategoryApi",
  endpoints: (build) => ({
    getSubCategories: build.query({
      query: (page) => `/show?page=${page}`,
      transformResponse: (response) => response.subCategory,
      providesTags: ["SubCategory"],
    }),
    getSubCategoriesBasedOnCategory: build.query({
      query: (id) => `/getCategory/${id}`,
      transformResponse: (response) => response.category,
      providesTags: ["SubCategory"],
    }),
    saveSubCategory: build.mutation({
      query: (subCategoryData) => ({
        url: `/save`,
        method: "POST",
        body: subCategoryData,
      }),
      invalidatesTags: ["SubCategory"],
    }),
    updateSubCategory: build.mutation({
      query: ({ id, subCategoryData }) => ({
        url: `/update/${id}`,
        method: "POST",
        body: subCategoryData,
      }),
      invalidatesTags: ["SubCategory"],
    }),
    deleteSubCategory: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useGetSubCategoriesBasedOnCategoryQuery,
  useSaveSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = SubCategoryApi;
