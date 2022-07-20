import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const productsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/products/' }), // Set the baseUrl for every endpoint below
  endpoints: (builder) => ({
    getProductsByCategory: builder.query({
      query: (category) => `/${category}`
    })
  })
})

export const { useGetCategoryQuery } = productsApi;