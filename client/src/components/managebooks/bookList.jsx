import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./bookList.css";
import CreateBook from "./createBook";
import { IoMdAddCircle } from "react-icons/io";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3008/dashboard/manage-books/books"
        );
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const createRef = useRef(null);

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleClickOutside = (event) => {
    if (createRef.current && !createRef.current.contains(event.target)) {
      setShowCreateForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="header">
        <h1 className="book-list-h1">Books management</h1>
        <button onClick={handleCreateClick} className="add-book-button">
          <IoMdAddCircle className="icon" /> Add New Book
        </button>
      </div>
      {showCreateForm && (
        <div ref={createRef} className="add-book">
          <CreateBook />
        </div>
      )}
      <div className="main">
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <Link
                to={`/dashboard/manage-books/${book.id}`}
                className="card-link"
              >
                <div className="card">
                  <div className="bookId">{book.id}</div>
                  <span className="link">{book.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BookList;
