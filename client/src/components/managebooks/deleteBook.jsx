import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteBook = ({ bookId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      // Delete book based on bookId
      const response = await fetch(
        `http://localhost:3008/dashboard/manage-books/books/${bookId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      navigate("/dashboard/manage-books");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="delete-book">
      Delete Book
    </button>
  );
};

export default DeleteBook;
