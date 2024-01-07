import React, { useState } from "react";
import "./createBook.css";
import { useParams } from "react-router-dom";

const UpdateBook = ({ bookId }) => {
  const [updatedBook, setUpdatedBook] = useState({
    title: "",
    author: "",
    genre: "",
    publication_year: "",
  });

  const { id } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3008/dashboard/manage-books/books/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBook),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update book");
      }
      // Handle success by reloading the page
      console.log("Book updated successfully!");
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error updating book:", error);
      // Handle error state if needed
    }
  };

  return (
    <div className="update-book">
      <h2 className="secondary-heading">Update Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div>
            <label className="label">Title:</label>
            <input
              type="text"
              name="title"
              value={updatedBook.title}
              onChange={handleInputChange}
              className="books-text-input"
            />
          </div>
          <div>
            <label className="label">Author:</label>
            <input
              type="text"
              name="author"
              value={updatedBook.author}
              onChange={handleInputChange}
              className="books-text-input"
            />
          </div>
          <div>
            <label className="label">Genre:</label>
            <input
              type="text"
              name="genre"
              value={updatedBook.genre}
              onChange={handleInputChange}
              className="books-text-input"
            />
          </div>
          <div>
            <label className="label">Publication Year:</label>
            <input
              type="text"
              name="publication_year"
              value={updatedBook.publication_year}
              onChange={handleInputChange}
              className="books-text-input"
            />
          </div>
        </div>
        <button type="submit" className="create-book-button">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
