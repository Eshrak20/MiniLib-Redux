export interface EditModalProps<T> {
  open: boolean;
  data: T | null;
  fields: {
    name: string;
    label: string;
    type: string;
    options?: [
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY"
    ];
  }[];

  title?: string;
  onClose: () => void;
  onSubmit: (updatedData: Partial<T>) => void;
}
