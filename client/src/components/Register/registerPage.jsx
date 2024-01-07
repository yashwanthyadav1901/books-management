import React, { useState } from "react";
import "./../loginPage/loginPage.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import Axios from "axios";

const Registerpage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = () => {
    Axios.post("http://localhost:3008/register", {
      name: name,
      email: email,
      password: password,
    }).then(() => {
      console.log("user has been created");
    });
  };

  return (
    <div className="register-main">
      <div className="login-container">
        <div className="login-header">
          <div className="text">SignUp</div>
          <div className="underline"></div>
        </div>
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
        <div className="signup">
          Already have an account? <a href="/user-login">login</a>
        </div>

        <div className="submit-section">
          <button className="login-button" onClick={createUser}>
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
