import Action from "@/components/Custom/Actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import type { Book } from "@/types/book";

const Books = () => {
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined);

  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Something went wrong!</div>;

  const books = data?.data || [];

  const handleDeleteConfirm = (data: Book) => {
    console.log("Delete confirmed for", data);
    // call your API delete here
  };

  const handleEditSubmit = (updatedBook: Book) => {
    console.log("Edit submitted", updatedBook);
    // call your API update here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book: Book) => {
          const { _id,available,createdAt, updatedAt, ...rest } = book; // destructure to remove them

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
                <Action
                  data={rest} // pass without createdAt/updatedAt
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
