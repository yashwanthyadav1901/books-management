import React, { useEffect, useRef, useState } from "react";
import "./dashboard.css";
import axios from "axios";
import Addadmin from "./addadmin";

const Admin = () => {
  const [admin, setAdmin] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3008/dashboard/admin");
        if (response.ok) {
          const data = await response.json();
          setAdmin(data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3008/dashboard/admin/${id}`)
      .then(() => {
        console.log("user deleted successfully"); // Assuming response.data contains success message
      })
      .catch((err) => {
        console.log("Error deleting user:", err);
      });
    window.location.reload();
  };

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
    <div>
      <div className="header">
        <h1 className="book-list-h1 ">Management System</h1>
      </div>
      <div className="summary">
        <div className="total">Admin : 0</div>
        <div className="total">users : 0</div>
        <div className="total">books : 0</div>
      </div>
      <div className="admin-table">
        <div className="admin-header">Admin Management</div>
      </div>
      <div className="addadmin">
        <button className="button admin" onClick={handleCreateClick}>
          Add Admin
        </button>
      </div>
      {showCreateForm && (
        <div ref={createRef} className="add-book">
          <Addadmin />
        </div>
      )}
      <div className="main">
        <ul>
          {admin.map((user) => (
            <li key={user.id}>
              <div className="card-link">
                <div className="card">
                  <div className="bookId">{user.id}</div>
                  <span className="link-user">{user.name}</span>
                  <button className="button edit">Edit</button>
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
    </div>
  );
};

export default Admin;
