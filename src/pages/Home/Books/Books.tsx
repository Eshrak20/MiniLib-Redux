import Action from "@/components/Custom/Actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetAllBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "@/redux/api/bookApi";
import type { Book } from "@/types/book";
import { useEffect, useState } from "react";

const Books = () => {
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined);

  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    if (data) {
      setBooks(data);
    }
  }, [data]);

  const handleDeleteConfirm = async (book: Book) => {
    try {
      await deleteBook(book._id).unwrap();
      // setBooks((prevBooks) =>
      //   prevBooks.filter((b) => b._id !== book._id)
      // );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleEditSubmit = async (updatedBook: Book) => {
    try {
      await updateBook(updatedBook).unwrap();
      //   setBooks((prev) =>
      //     prev.map((b) => (b._id === result._id ? result : b))
      // );
    } catch (err) {
      console.error("Update failed", err);
    }
  };
  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Something went wrong!</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book: Book) => {
          return (
            <Card key={book._id}>
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
                <p className="text-muted-foreground text-sm">{book.genre}</p>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>ISBN:</strong> {book.isbn}
                </p>
                <p>
                  <strong>Copies:</strong> {book.copies ?? "N/A"}
                </p>
                <p>
                  <strong>
                    {book.available ? "available" : "unavailable"}
                  </strong>
                </p>

                <Action
                  data={book} // pass without createdAt/updatedAt
                  onDeleteConfirm={handleDeleteConfirm}
                  onEditSubmit={handleEditSubmit}
                  actions={[
                    {
                      label: "View",
                      variant: "default",
                      onClick: () => console.log("View", book),
                    },
                    {
                      label: "Edit",
                      variant: "outline",
                      type: "edit",
                      title: "Edit Book", //* modal title
                    },
                    { label: "Delete", variant: "destructive", type: "delete" },
                  ]}
                />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Books;
