import type { Book } from "@/types/book";
const updateModel = async (updatedBook: Book): Promise<Book> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/books/${updatedBook._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      }
    );
    if (!response.ok) {
      throw new Error("API request failed");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    throw error; // propagate the error
  }
};

export default updateModel;
