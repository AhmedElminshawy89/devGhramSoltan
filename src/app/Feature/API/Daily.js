import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import host from '../../../host/Host';

export const DailyApi = createApi({
  reducerPath: 'DailyApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${host}/api/superAdmin/daily` }),
  endpoints: (build) => ({
    getStudioDaily: build.query({
      query: (page) => `/showStudio?page=${page}`,
      transformResponse: (response) => response.studio,
      providesTags: ['Daily'],
    }),
    getMakeUpDaily: build.query({
      query: (page) => `/showMakeup?page=${page}`,
      transformResponse: (response) => response.makeup,
      providesTags: ['Daily'],
    }),
  }),
});

export const { useGetMakeUpDailyQuery, useGetStudioDailyQuery } = DailyApi;
