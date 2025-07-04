import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import Action from "@/components/Custom/Actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetAllBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} from "@/redux/api/bookApi";
import type { Book } from "@/types/Book";
import BorrowModalWrapper from "./BorrowModalWrapper";
import Loading from "@/components/Custom/Loading";

const defaultCover = `data:image/svg+xml;utf8,
<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400'>
  <defs>
    <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' stop-color='%234F46E5'/>
      <stop offset='100%' stop-color='%2386A8E7'/>
    </linearGradient>
  </defs>
  <rect width='300' height='400' fill='url(%23grad)'/>
  <text x='50%' y='50%' fill='white' font-family='Arial' font-size='36' font-weight='bold' dominant-baseline='middle' text-anchor='middle'>
    Book Cover
  </text>
</svg>`;


const Books = () => {
  // API Hooks
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined);
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();

  // State
  const [books, setBooks] = useState<Book[]>([]);
  const [borrowModalOpen, setBorrowModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [parent] = useAutoAnimate();

  useEffect(() => {
    if (data) setBooks(data);
  }, [data]);

  const handleBorrowClick = (book: Book) => {
    setSelectedBook(book);
    setBorrowModalOpen(true);
  };

  const handleDeleteConfirm = async (book: Book) => {
    try {
      await deleteBook(book._id).unwrap();
      toast.warn(`Book "${book.title}" deleted successfully`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the book");
    }
  };

  const handleEditSubmit = async (updatedBook: Book) => {
    try {
      await updateBook(updatedBook).unwrap();
      toast.success(`Book "${updatedBook.title}" updated successfully`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update the book");
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-red-500 text-center py-8">
        Failed to load books. Please try again later.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4"
      >
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800">Our Book Collection</h1>
          <p className="text-gray-600 mt-2">Browse and manage all available books</p>
        </header>

        <div
          ref={parent}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {books.map((book) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
                layout
              >
                <Card className="relative h-full flex flex-col shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border border-gray-200">
                  {/* Animated borrow button like bulb effect */}
                  <motion.button
                    onClick={() => handleBorrowClick(book)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-blue-600 text-white shadow hover:scale-110"
                    aria-label="Borrow book"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <BookOpen size={18} />
                  </motion.button>

                  <img
                    src={defaultCover}
                    alt="Book cover"
                    className="w-full h-48 -mt-7 object-cover"
                  />

                  <CardHeader className="pb-2 px-4 mt-2">
                    <CardTitle className="text-lg truncate">{book.title}</CardTitle>
                    <span className="text-xs text-blue-600 font-medium">{book.genre}</span>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col gap-2 px-4 pb-4">
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-semibold">Author:</span> {book.author}
                      </p>
                      <p>
                        <span className="font-semibold">ISBN:</span> {book.isbn}
                      </p>
                      <p>
                        <span className="font-semibold">Copies:</span> {book.copies ?? "N/A"}
                      </p>
                    </div>

                    <div className="mt-auto pt-2 text-center">
                      <span
                        className={`font-semibold px-2 py-1 rounded-full text-xs ${
                          book.available ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {book.available ? "Available" : "Not Available"}
                      </span>
                    </div>

                    <div className="mt-4">
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
                          {
                            label: "Delete",
                            variant: "destructive",
                            type: "delete",
                            confirmText:
                              "Are you sure you want to delete this book?",
                          },
                        ]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {books.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">No books available yet</p>
          </motion.div>
        )}
      </motion.div>

      <BorrowModalWrapper
        open={borrowModalOpen}
        onClose={() => setBorrowModalOpen(false)}
        selectedBook={selectedBook}
      />
    </div>
  );
};

export default Books;
