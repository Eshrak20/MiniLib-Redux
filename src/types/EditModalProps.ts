export interface EditModalProps<T> {
  open: boolean;
  data?: Partial<T>;
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
  error?: string;
  onClose: () => void;
  onSubmit: (data: Partial<T>) => Promise<void> | void;
}
