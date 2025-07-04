import type { Borrow, BorrowListResponse, BorrowResponse } from "@/types/Borrow";
import { baseApi } from "./baseApi";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBorrow: builder.mutation<BorrowResponse, Borrow>({
      query: (borrow) => ({
        url: `borrow`, // correct path
        method: "POST",
        body: borrow,
      }),
      invalidatesTags: ["Boi"],
    }),
    getAllBorrowedBooks: builder.query<Borrow[], void>({
      query: () => "borrow",
      transformResponse: (response: BorrowListResponse) => response.data,
      providesTags: ["Boi"],
    }),
  }),
});

export const { useCreateBorrowMutation,useGetAllBorrowedBooksQuery } = borrowApi;
