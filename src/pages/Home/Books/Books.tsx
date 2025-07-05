import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  Barcode,
  Bookmark,
  BookOpen,
  Calendar,
  CheckCircle,
  Eye,
  Pencil,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
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
import { Link } from "react-router";

// const defaultCover = `data:image/svg+xml;utf8,
// <svg xmlns='http://www.w3.org/2000/svg' width='300' height='400'>
//   <defs>
//     <linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'>
//       <stop offset='0%' stop-color='%234F46E5'/>
//       <stop offset='100%' stop-color='%2386A8E7'/>
//     </linearGradient>
//   </defs>
//   <rect width='300' height='400' fill='url(%23grad)'/>
//   <text x='50%' y='50%' fill='white' font-family='Arial' font-size='36' font-weight='bold' dominant-baseline='middle' text-anchor='middle'>
//     Book Cover
//   </text>
// </svg>`;

const Books = ({ isHome }: { isHome: boolean }) => {
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined);
  const [updateBook] = useUpdateBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  useEffect(() => {
    if (!isHome) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [isHome]);

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
    <div className={`min-h-screen py-8 ${isHome ? "mt-20" : "mt-28"}`}>
      <ToastContainer position="top-right" autoClose={3000} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4"
      >
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            {isHome ? "Our Latest Books" : "Our Book Collection"}
          </h1>
          <p className="text-gray-600 dark:text-gray-200 mt-2">
            {isHome
              ? "Check out our newest arrivals"
              : "Browse and manage all available books"}
          </p>
        </header>

        <div
          ref={parent}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {(isHome ? books.slice(0, 8) : books).map((book) => (
              <motion.div
                key={book._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -5 }}
                layout
              >
                <Card className="relative h-full flex flex-col shadow-lg hover:shadow-xl transition-all rounded-xl overflow-hidden border bg-[#F7F7F7] dark:bg-black  group">
                  {/* Top status ribbon */}
                  <div className="absolute top-0 right-0 z-10">
                    <div
                      className={`px-3 py-1 text-xs font-semibold rounded-bl-lg ${
                        book.available
                          ? "bg-green-500 text-white"
                          : "bg-rose-500 text-white"
                      }`}
                    >
                      {book.available ? (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Available
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          Checked Out
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Book cover with gradient overlay */}
                  <Link to={`/single-book/${book._id}`}>
                    <div className="relative overflow-hidden h-56 ">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-300
    bg-[url('/Pics/whiteMode.png')] dark:bg-[url('/Pics/darkMode.jpeg')]"
                        role="img"
                        aria-label={`Cover of ${book.title}`}
                      ></div>

                      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /> */}
                    </div>
                  </Link>

                  <CardHeader className="pb-2 px-4 pt-4">
                    <CardTitle className="text-lg font-bold line-clamp-2">
                      <Link to={`/single-book/${book._id}`}>{book.title}</Link>
                    </CardTitle>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium flex items-center gap-1">
                        <Bookmark className="w-3 h-3" />
                        {book.genre}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-100">
                        {book.copies} {book.copies === 1 ? "copy" : "copies"}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col gap-2 px-4 pb-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-100">
                          {book.author}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Barcode className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-100">
                          {book.isbn}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700 dark:text-gray-100">
                          Published:{" "}
                          {book.createdAt
                            ? new Date(book.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto pt-3">
                      <div className="flex justify-between items-center">
                        <motion.button
                          onClick={() => handleBorrowClick(book)}
                          className="flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                          whileTap={{ scale: 0.95 }}
                        >
                          <BookOpen className="w-4 h-4" />
                          Borrow
                        </motion.button>

                        <Action
                          data={book}
                          onDeleteConfirm={handleDeleteConfirm}
                          onEditSubmit={handleEditSubmit}
                          actions={[
                            {
                              label: "View",
                              type: "view",
                              icon: <Eye className="w-4 h-4" />,
                            },
                            {
                              label: "Edit",
                              type: "edit",
                              title: "Edit Book",
                              icon: <Pencil className="w-4 h-4" />,
                            },
                            {
                              label: "Delete",
                              type: "delete",
                              icon: (
                                <Trash2 className="w-4 h-4 text-rose-500" />
                              ),
                            },
                          ]}
                        />
                      </div>
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
