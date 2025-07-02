import type { ApiResponse } from "@/types/book";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/books",
      transformResponse: (response: ApiResponse) =>
        response.data.map(
          ({ createdAt: _createdAt, updatedAt: _updatedAt, ...rest }) => rest
        ),
    }),
  }),
});

export const { useGetAllBooksQuery } = baseApi;
