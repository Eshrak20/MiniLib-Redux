import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // assuming you use a skeleton
import { useGetSingleBookQuery } from "@/redux/api/bookApi";
import { useParams } from "react-router";

const SingleBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleBookQuery(id!);
  if (isLoading) {
    return (
      <div className="p-4">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="text-red-500 p-4">Failed to load book data.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="shadow-xl rounded-2xl p-4">
        <CardHeader>
          <CardTitle className="text-2xl">{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-base">
          <p>
            <strong>Author:</strong> {data.author}
          </p>
          <p>
            <strong>Genre:</strong> {data.genre}
          </p>
          <p>
            <strong>ISBN:</strong> {data.isbn}
          </p>
          <p>
            <strong>Available Copies:</strong> {data.copies}
          </p>
          <p>
            <strong>Available:</strong> {data.available ? "Yes" : "No"}
          </p>
          <p className="text-gray-700 mt-2">{data.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleBook;
