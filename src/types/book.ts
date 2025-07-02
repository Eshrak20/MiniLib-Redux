export interface Book {
  _id: string;
  title: string;
  genre: string;
  author: string;
  isbn: string;
  copies?: number;
  availability?: string;
}
