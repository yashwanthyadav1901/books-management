import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DeleteBook from "./deleteBook";
import UpdateBook from "./updateBook";
import "./bookDetails.css";
import { IoMdAddCircle } from "react-icons/io";

const BookDetails = () => {
  const [book, setBook] = useState();

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3008/dashboard/manage-books/books/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          // Access the first item in the array
          setBook(data[0]);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if needed
      }
    };

    fetchBookDetails();
  }, [id]);

  const createRef = useRef(null);

  const handleCreateClick = () => {
    setShowUpdateForm(true);
  };

  const handleClickOutside = (event) => {
    if (createRef.current && !createRef.current.contains(event.target)) {
      setShowUpdateForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!book) {
    return <div>error fetching book details</div>;
  }
  console.log(book);

  return (
    <>
      <div className="header">
        <h1 className="book-list-h1">{book.title}</h1>

        <button onClick={handleCreateClick} className="add-book-button">
          <IoMdAddCircle className="icon" /> Update this book
        </button>
      </div>
      {showUpdateForm && (
        <div ref={createRef} className="add-book">
          <UpdateBook />
        </div>
      )}
      <div className="book-details-main">
        <div className="book-details-head">
          <h2>Book Details</h2>
        </div>
        <div className="book-details">
          <div className="align-right">
            <p>Author</p>
          </div>{" "}
          <span>:</span>
          <div>{book.author}</div>
          <div className="align-right">
            <p>Genre</p>{" "}
          </div>
          <span>:</span>
          <div>{book.genre}</div>
          <div className="align-right">
            <p>Publication Year </p>
          </div>
          <span>:</span>
          <div>{book.publication_year}</div>
        </div>
        <div className="button-container">
          <DeleteBook bookId={id} />
        </div>
      </div>
    </>
  );
};

export default BookDetails;
