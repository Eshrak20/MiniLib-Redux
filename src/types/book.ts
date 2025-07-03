export interface Book {
  _id: string;
  title: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  author: string;
  isbn: string;
  copies?: number;
  available?: boolean;
}
