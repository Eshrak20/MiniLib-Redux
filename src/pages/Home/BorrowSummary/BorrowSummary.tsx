import { useGetAllBorrowedBooksQuery } from "@/redux/api/borrowApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetAllBorrowedBooksQuery();

  if (isLoading) {
    // skeleton for 3 cards
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-1/2 mb-2" />
              <Skeleton className="h-3 w-1/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 p-4">
        Could not load borrowed books summary. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data?.map((borrowedBook, index) => (
        <Card key={index} className="hover:shadow-xl transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-xl">
              {borrowedBook.book.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              <span className="font-semibold">ISBN:</span> {borrowedBook.book.isbn}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Total Borrowed:</span> {borrowedBook.totalQuantity}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BorrowSummary;
