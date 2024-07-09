import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const CategoryApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/category` }),
  reducerPath: "CategoryApi",
  endpoints: (build) => ({
    getCategories: build.query({
      query: (page) => `/show?page=${page}`,
      transformResponse: (response) => response.categories,
      providesTags: ["Category"],
    }),
    saveCategory: build.mutation({
      query: (categoryData) => ({
        url: `/save`,
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: build.mutation({
      query: ({ id, categoryData }) => ({
        url: `/update/${id}`,
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategoryStatus: build.mutation({
      query: (id) => ({
        url: `/updateStatus/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useSaveCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryStatusMutation,
} = CategoryApi;
