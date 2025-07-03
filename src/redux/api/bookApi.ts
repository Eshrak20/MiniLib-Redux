import type { ApiResponse } from "@/types/ApiResponse";
import type { Book } from "@/types/book";
import { baseApi } from "./baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], void>({
      query: () => "books",
      transformResponse: (response: ApiResponse) =>
        response.data.map(
          ({ createdAt: _createdAt, updatedAt: _updatedAt, ...rest }) => rest
        ),
      providesTags: ["Boi"],
    }),
    createBook: builder.mutation<Book, Book>({
      query: (book) => ({
        url: `/books`, // correct path
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Boi"], // consistent with tagTypes
    }),

    updateBook: builder.mutation<Book, Book>({
      query: (book) => ({
        url: `books/${book._id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: ["Boi"],
    }),
    deleteBook: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Boi"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBookMutation,
} = bookApi;
