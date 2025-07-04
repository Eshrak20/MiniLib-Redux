import type { ApiResponse } from "./ApiResponse";

export type Borrow = {
  book: string;
  quantity: number;
  dueDate: string;
  onSubmit: () => void;
  
};

export type BorrowResponse = ApiResponse<Borrow>;
export type BorrowListResponse = ApiResponse<Borrow[]>;
