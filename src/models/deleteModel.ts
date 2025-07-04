import type { Book } from "@/types/Book";

const deleteModel = async (deleteBook: Book) => {
  console.log(deleteBook);
  try {
    const response = await fetch(
      `http://localhost:5000/api/books/${deleteBook._id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("API request failed");
    }
  } catch (error) {
    console.error(error);
    throw error; // propagate the error
  }
};

export default deleteModel;
