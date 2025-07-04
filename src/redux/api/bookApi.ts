import type {
  Book,
  BookListApiResponse,
  SingleBookApiResponse,
} from "@/types/Book";
import { baseApi } from "./baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], void>({
      query: () => "books",
      transformResponse: (response: BookListApiResponse) => response.data,
      providesTags: ["Boi"],
    }),

    getSingleBook: builder.query<Book, string>({
      query: (id) => `books/${id}`,
      transformResponse: (response: SingleBookApiResponse) => response.data,
    }),

    createBook: builder.mutation<SingleBookApiResponse, Book>({
      query: (book) => ({
        url: `books`, // correct path
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Boi"], // consistent with tagTypes
    }),

    updateBook: builder.mutation<SingleBookApiResponse, Book>({
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
  useGetSingleBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBookMutation,
} = bookApi;
