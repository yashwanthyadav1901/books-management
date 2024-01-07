import React, { useState } from "react";
import "./../managebooks/createBook.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import axios from "axios";

const Addadmin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3008/dashboard/admin", {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("User has been created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
    window.location.reload();
  };

  return (
    <div className="add-book-container">
      <h2 className="secondary-heading">Add New User</h2>

      <form onSubmit={createUser}>
        {" "}
        <div className="login-inputs">
          <div className="login-input">
            <IoIosPerson className="login-icon" />
            <input
              type="text"
              placeholder="Name"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="login-input">
            <MdEmail className="login-icon" />
            <input
              type="text"
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="login-input">
            <FaLock className="login-icon" />
            <input
              type="text"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
        </div>
        <button type="submit" className="create-book-button">
          Add Admin
        </button>
      </form>
    </div>
  );
};

export default Addadmin;
