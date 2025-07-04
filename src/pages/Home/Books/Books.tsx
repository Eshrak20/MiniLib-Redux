import Action from "@/components/Custom/Actions";
import BorrowModal from "@/components/Custom/CustomModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetAllBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "@/redux/api/bookApi";
import type { Book } from "@/types/Book";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { useCreateBorrowMutation } from "@/redux/api/borrowApi";
import type { Borrow } from "@/types/Borrow";

const Books = () => {
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined);

  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [borrowData] = useCreateBorrowMutation();

  const [books, setBooks] = useState<Book[]>([]);

  const [borrowModalOpen, setBorrowModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    if (data) {
      setBooks(data);
    }
  }, [data]);

  const handleDeleteConfirm = async (book: Book) => {
    try {
      await deleteBook(book._id).unwrap();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEditSubmit = async (updatedBook: Book) => {
    try {
      await updateBook(updatedBook).unwrap();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleBorrowClick = (book: Book) => {
    setSelectedBook(book);
    setBorrowModalOpen(true);
  };

  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Something went wrong!</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book: Book) => (
          <Card key={book._id} className="relative">
            {/* Borrow button in the top right */}
            <button
              onClick={() => handleBorrowClick(book)}
              className="absolute top-2 right-2 p-2 rounded-full bg-primary text-white hover:bg-primary/80 transition"
            >
              <BookOpen size={18} />
            </button>

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
                <strong>{book.available ? "available" : "unavailable"}</strong>
              </p>

              <Action
                data={book}
                onDeleteConfirm={handleDeleteConfirm}
                onEditSubmit={handleEditSubmit}
                actions={[
                  { label: "View", variant: "default", type: "view" },
                  {
                    label: "Edit",
                    variant: "outline",
                    type: "edit",
                    title: "Edit Book",
                  },
                  { label: "Delete", variant: "destructive", type: "delete" },
                ]}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedBook && (
        <BorrowModal
          open={borrowModalOpen}
          onClose={() => setBorrowModalOpen(false)}
          onSubmit={(borrowBook) => {
            // build your final payload with book id
            const borrowPayload: Borrow = {
              book: selectedBook._id,
              quantity: borrowBook.quantity,
              dueDate: borrowBook.dueDate,
            };
            try {
              borrowData(borrowPayload).unwrap();
            } catch (err) {
              console.error("Update failed", err);
            }

            setBorrowModalOpen(false);
          }}
          data={selectedBook}
          fields={[
            {
              name: "quantity",
              label: "Quantity",
              type: "number",
            },
            {
              name: "dueDate",
              label: "Due Date",
              type: "date",
            },
          ]}
          title={`Borrow: ${selectedBook.title}`}
        />
      )}
    </div>
  );
};

export default Books;
