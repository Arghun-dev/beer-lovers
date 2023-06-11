import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TagTypeEnums } from 'types/TagTypeEnums';

export const beersService = createApi({
  reducerPath: 'beersService',
  tagTypes: [TagTypeEnums.BEERS],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_API,
  }),

  endpoints: (builder) => ({
    // GET
    getBeers: builder.query({
      query: () => 'beers',
      providesTags: [TagTypeEnums.BEERS],
    }),
  }),
});

export const { useGetBeersQuery } = beersService;
export const { getBeers } = beersService.endpoints;
