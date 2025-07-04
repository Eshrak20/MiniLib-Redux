import type { Book } from "./Book";

export interface ActionProps {
  actions: {
    title?: string;
    label: string;
    variant: "default" | "destructive" | "outline";
    onClick?: () => void;
    type?: "edit" | "delete" | "view";
  }[];
  data: Book;
  onDeleteConfirm?: (data: Book) => void;
  onEditSubmit?: (updatedData: Book) => void;
}