import type { Book } from "./Book";

export interface Props {
  open: boolean;
  onClose: () => void;
  selectedBook: Book | null;
}