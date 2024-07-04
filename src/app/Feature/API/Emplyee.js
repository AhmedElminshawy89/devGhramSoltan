import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import host from "../../../host/Host";

export const EmployeeApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/employee` }),
  reducerPath: "EmployeeApi",
  endpoints: (build) => ({
    getEmployees: build.query({
      query: () => `/show`,
      transformResponse: (response) => response.employee.data,
      providesTags: ["Employee"],
    }),
    saveEmployee: build.mutation({
      query: (employeeData) => ({
        url: `/save`,
        method: "POST",
        body: employeeData,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: build.mutation({
        query: ({ id, employeeData }) => ({
          url: `/update/${id}`,
          method: "POST",
          body: employeeData,
        }),
        invalidatesTags: ["Employee"],
      }),
    
    deleteEmployee: build.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useSaveEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = EmployeeApi;
