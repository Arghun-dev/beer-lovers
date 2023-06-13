import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { TagTypeEnums } from 'types/TagTypeEnums';

interface IGetBeersQuery {
  currentPage: number;
  pageSize: number;
  beerName: string;
  abvGt: string;
  abvLt: string;
}

export const beersService = createApi({
  reducerPath: 'beersService',
  tagTypes: [TagTypeEnums.BEERS],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.punkapi.com/v2/',
  }),

  endpoints: (builder) => ({
    getBeers: builder.query({
      query: ({
        currentPage,
        pageSize,
        beerName,
        abvGt,
        abvLt,
      }: IGetBeersQuery) =>
        beerName.length
          ? `beers?page=${currentPage}&per_page=${pageSize}&beer_name=${beerName}&abv_gt=${abvGt}&abv_lt=${abvLt}`
          : `beers?page=${currentPage}&per_page=${pageSize}&abv_gt=${abvGt}&abv_lt=${abvLt}`,
      providesTags: [TagTypeEnums.BEERS],
    }),

    getSingleBeer: builder.query({
      query: (id: string) => `beers/${id}`,
    }),
  }),
});

export const { useGetBeersQuery, useGetSingleBeerQuery } = beersService;
export const { getBeers } = beersService.endpoints;
