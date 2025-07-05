import type { ReactElement } from "react";
import type { Book } from "./Book";

export interface ActionProps {
  actions: {
    title?: string;
    label: string;
    onClick?: () => void;
    type?: "edit" | "delete" | "view";
    icon?: ReactElement;
  }[];
  data: Book;
  onDeleteConfirm?: (data: Book) => void;
  onEditSubmit?: (updatedData: Book) => void;
}