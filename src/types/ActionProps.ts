import type { Book } from "./book";

export interface ActionProps {
  actions: {
    title?: string;
    label: string;
    variant: "default" | "destructive" | "outline";
    onClick?: () => void;
    type?: "edit" | "delete" | "custom";
  }[];
  data: Book;
  onDeleteConfirm?: (data: Book) => void;
  onEditSubmit?: (updatedData: Book) => void;
}