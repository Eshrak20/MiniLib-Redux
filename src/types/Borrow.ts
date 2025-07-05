import type { ApiResponse } from "./ApiResponse";
interface Book {
  title: string;
  isbn: string;
}
export type BorrowPayload = {
  book: Book | string;
  quantity: number;
  dueDate: string | Date;
  totalQuantity: number;
  // onSubmit: () => void;
};

export type BorrowResponse = ApiResponse<BorrowPayload>;
export type BorrowListResponse = ApiResponse<BorrowPayload[]>;
