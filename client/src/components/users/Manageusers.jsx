import React, { useState, useEffect, useRef } from "react";
import "./../managebooks/bookList.css";
import AddUser from "./AddUser";
import { IoMdAddCircle } from "react-icons/io";
import "./manageUsers.css";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3008/dashboard/manage-users/users"
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
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

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3008/dashboard/manage-users/users/${id}`)
      .then(() => {
        console.log("user deleted successfully"); // Assuming response.data contains success message
      })
      .catch((err) => {
        console.log("Error deleting user:", err);
      });
    window.location.reload();
  };

  return (
    <>
      <div className="header">
        <h1 className="book-list-h1">Users management</h1>
        <button onClick={handleCreateClick} className="add-book-button">
          <IoMdAddCircle className="icon" /> Add New User
        </button>
      </div>
      {showCreateForm && (
        <div ref={createRef} className="add-book">
          <AddUser />
        </div>
      )}
      <div className="main">
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div className="card-link">
                <div className="card">
                  <div className="bookId">{user.id}</div>
                  <span className="link-user">{user.name}</span>
                  <button
                    className="button delete"
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ManageUsers;
