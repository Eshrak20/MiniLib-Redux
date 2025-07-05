export const BookFieldsConfig = [
  { name: "title", label: "Title", type: "text" },
  { name: "author", label: "Author", type: "text" },
  {
    name: "genre",
    label: "Genre",
    type: "select",
    options: [
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ] as [
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY"
    ],
  },

  { name: "isbn", label: "ISBN", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "copies", label: "Copies", type: "number" },
  { name: "available", label: "Available", type: "checkbox" },
];

