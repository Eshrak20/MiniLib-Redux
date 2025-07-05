import { useGetAllBorrowedBooksQuery } from "@/redux/api/borrowApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  BookOpen,
  BookUp,
  BookCheck,
  BookKey,
  BookText,
  StarOff,
  Star,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetAllBorrowedBooksQuery();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-white shadow-xl p-8 flex flex-col justify-center items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full bg-indigo-400" />
          <Skeleton className="h-8 w-64 bg-indigo-400" />
          <Skeleton className="h-6 w-96 bg-indigo-400" />
          <Skeleton className="h-8 w-48 bg-indigo-400 rounded-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-4"
      >
        <Alert variant="destructive">
          <AlertTitle>Fetch Error</AlertTitle>
          <AlertDescription>
            Could not load borrowed books summary. Please try again later.
          </AlertDescription>
        </Alert>
      </motion.div>
    );
  }

  const totalBooksBorrowed = data?.reduce(
    (sum, book) => sum + (book.totalQuantity || 0),
    0
  );

  const getBookIcon = (quantity: number) => {
    if (quantity > 10) {
      return <Star className="text-yellow-500" />; // popular
    } else if (quantity > 5) {
      return <BookOpen className="text-green-500" />;
    } else {
      return <StarOff className="text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 space-y-6"
    >
      <ToastContainer />

      <div className="top-12 relative rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-white shadow-xl p-8 flex flex-col justify-center items-center gap-4 overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-400/20 rounded-full filter blur-3xl"></div>

        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Sparkles size={42} className="animate-pulse text-yellow-300" />
        </motion.div>
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-white">
          Borrowed Books Summary
        </h1>
        <p className="text-lg text-white/90 text-center max-w-2xl">
          Keeping track of all your literary adventures in one place
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2"
        >
          <Badge
            variant="secondary"
            className="text-lg px-6 py-2 bg-white/90 dark:bg-black backdrop-blur-sm"
          >
            <BookUp className="mr-2 h-5 w-5 text-primary" />
            Total Books Borrowed: {totalBooksBorrowed}
          </Badge>
        </motion.div>
      </div>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map((borrowedBook, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Card className="top-20 relative hover:shadow-xl transition-all duration-200 rounded-xl border border-gray-200 dark:border-gray-700 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <span
                  className={`absolute top-3 right-3 w-4 h-4 rounded-full ${
                    borrowedBook.totalQuantity > 0
                      ? "bg-green-500 animate-pulse ring-2 ring-green-500/30"
                      : "bg-red-500 ring-2 ring-red-500/30"
                  }`}
                  title={
                    borrowedBook.totalQuantity > 0
                      ? "Active Borrow"
                      : "No borrow"
                  }
                ></span>

                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {getBookIcon(borrowedBook.totalQuantity)}
                  </div>
                  <div>
                    <CardTitle className="text-lg line-clamp-2">
                      {typeof borrowedBook.book === "object" &&
                      "title" in borrowedBook.book
                        ? borrowedBook.book.title
                        : borrowedBook.book}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <BookKey className="h-4 w-4 text-muted-foreground" />
                    <span>
                      <span className="font-medium">ISBN:</span>{" "}
                      {typeof borrowedBook.book === "object" &&
                      "isbn" in borrowedBook.book
                        ? borrowedBook.book.isbn
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookText className="h-4 w-4 text-muted-foreground" />
                    <span>
                      <span className="font-medium">Borrowed:</span>{" "}
                      <span
                        className={`font-bold ${
                          borrowedBook.totalQuantity > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {borrowedBook.totalQuantity}
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground mt-8 p-12 border-2 border-dashed rounded-xl"
        >
          <BookCheck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">No borrowed books found</h3>
          <p className="mt-2">
            Start your reading journey by borrowing some books!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BorrowSummary;
