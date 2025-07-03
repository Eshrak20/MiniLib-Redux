const updateModel = async (deleteBook) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/books/${deleteBook._id}`,
      {
        method: "POST",
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

export default updateModel;
