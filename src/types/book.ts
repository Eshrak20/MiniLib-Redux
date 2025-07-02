export interface Book {
  _id: string;
  title: string;
  genre: string;
  author: string;
  isbn: string;
  copies?: number;
  available?: boolean;
}
export interface ApiResponse {
  success: boolean;
  message: string;
  data: BookWithDates[];
}

interface BookWithDates extends Book {
  createdAt: string;
  updatedAt: string;
}