import React, { useState } from "react";
import "./createBook.css";

const CreateBook = () => {
  const [newBookData, setNewBookData] = useState({
    title: "",
    author: "",
    genre: "",
    publication_year: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBookData({
      ...newBookData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3008/dashboard/manage-books/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBookData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create book");
      }

      console.log("Book created successfully!");

      setNewBookData({
        title: "",
        author: "",
        genre: "",
        publication_year: "",
      });

      window.location.reload(); // Reload the page after successful book creation
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <div className="add-book-container">
      <h2 className="secondary-heading">Add New Book</h2>

      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="label">
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={newBookData.title}
                onChange={handleInputChange}
                className="books-text-input"
              />
            </label>
          </div>
          <div className="label">
            <label>
              Author:
              <input
                type="text"
                name="author"
                value={newBookData.author}
                onChange={handleInputChange}
                className="books-text-input"
              />
            </label>
          </div>
          <div className="label">
            <label>
              Genre:
              <input
                type="text"
                name="genre"
                value={newBookData.genre}
                onChange={handleInputChange}
                className="books-text-input"
              />
            </label>
          </div>
          <div className="label">
            <label>
              Publication Year:
              <input
                type="number"
                name="publication_year"
                value={newBookData.publication_year}
                onChange={handleInputChange}
                className="books-text-input"
              />
            </label>
          </div>
        </div>
        <button type="submit" className="create-book-button">
          Create Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
