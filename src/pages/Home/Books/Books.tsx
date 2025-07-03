import Action from "@/components/Custom/Actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import deleteModel from "@/models/deleteModel";
import updateModel from "@/models/updateModel";
import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import type { Book } from "@/types/book";
import { useEffect, useState } from "react";

const Books = () => {
  const { data, isLoading, isError} = useGetAllBooksQuery(undefined);
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    if (data) {
      setBooks(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Something went wrong!</div>;

  const handleDeleteConfirm = async (deleteBook: Book) => {
    try {
      await deleteModel(deleteBook);
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== deleteBook._id)
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleEditSubmit = async (updatedBook: Book) => {
    try {
      const getUpdatedBook = await updateModel(updatedBook);
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === getUpdatedBook._id ? getUpdatedBook : book
        )
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

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
