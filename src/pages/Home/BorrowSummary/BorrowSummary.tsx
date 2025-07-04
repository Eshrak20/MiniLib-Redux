import { useGetAllBorrowedBooksQuery } from "@/redux/api/borrowApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import Loading from "@/components/Custom/Loading";
import { ToastContainer } from "react-toastify";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetAllBorrowedBooksQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTitle>Fetch Error</AlertTitle>
          <AlertDescription>
            Could not load borrowed books summary. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // count total books borrowed across all entries
  const totalBooksBorrowed = data?.reduce(
    (sum, book) => sum + (book.totalQuantity || 0),
    0
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <ToastContainer />
      {/* Cover style hero section */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-indigo-600 text-white shadow-xl p-8 flex flex-col justify-center items-center gap-4">
        <Sparkles size={32} className="animate-pulse" />
        <h1 className="text-3xl font-bold">Borrowed Books Summary</h1>
        <p className="text-lg">
          Keeping track of all your borrowed books in one place.
        </p>
        <Badge variant="secondary" className="text-lg px-4 py-2 mt-2">
          Total Books Borrowed: {totalBooksBorrowed}
        </Badge>
      </div>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((borrowedBook, index) => (
            <Card
              key={index}
              className="relative hover:shadow-xl transition-all duration-200 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              {/* “bulb” indicator effect */}
              <span
                className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                  borrowedBook.totalQuantity > 0
                    ? "bg-green-500 animate-pulse"
                    : "bg-red-500"
                }`}
                title={
                  borrowedBook.totalQuantity > 0
                    ? "Active Borrow"
                    : "No borrow"
                }
              ></span>

              <CardHeader>
                <CardTitle className="text-primary text-xl">
                  {borrowedBook.book.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-muted-foreground">
                <div>
                  <span className="font-semibold">ISBN:</span>{" "}
                  {borrowedBook.book.isbn}
                </div>
                <div>
                  <span className="font-semibold">Total Borrowed:</span>{" "}
                  {borrowedBook.totalQuantity}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground mt-8">
          No borrowed books found.
        </div>
      )}
    </div>
  );
};

export default BorrowSummary;
