import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const AdminApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/admin` }),
  reducerPath: "AdminApi",
  endpoints: (build) => ({
    getAdmins: build.query({
      query: (page) => `/show?page=${page}`,
      transformResponse: (response) => response.users,
      providesTags: ["Admin"],
    }),
    saveAdmin: build.mutation({
      query: (adminData) => ({
        url: `/save`,
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["Admin"],
    }),
    updatePasswordAdmin: build.mutation({
      query: (updatePassadmin) => ({
        url: `/forgetPassword`,
        method: "POST",
        body: updatePassadmin,
      }),
      invalidatesTags: ["Admin"],
    }),
    updateAdmin: build.mutation({
      query: ({ id, adminData }) => ({
        url: `/update/${id}`,
        method: "POST",
        body: adminData,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useSaveAdminMutation,
  useUpdateAdminMutation,
  useUpdatePasswordAdminMutation,
  useDeleteAdminMutation,
} = AdminApi;
