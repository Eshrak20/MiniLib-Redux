import type { Book } from "./book";

export interface ApiResponse {
  success: boolean;
  message: string;
  data: BookWithDates[];
}

interface BookWithDates extends Book {
  createdAt: string;
  updatedAt: string;
}