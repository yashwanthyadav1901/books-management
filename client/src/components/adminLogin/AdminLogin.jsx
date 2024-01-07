import React, { useEffect, useState } from "react";
import "./../loginPage/loginPage.css";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import axios from "axios";

const AdminLogin = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigateTo = useNavigate();

  const [loginStatus, setLoginStatus] = useState("");
  const [statusHolder, setStatusHolder] = useState("");

  const loginUser = () => {
    axios.defaults.withCredentials = true;
    Axios.post("http://localhost:3008/admin-login", {
      loginEmail: loginEmail,
      loginPassword: loginPassword,
    }).then((response) => {
      console.log(response);
      navigateTo("/dashboard");
      if (response.data.message) {
        navigateTo("/admin-login");
        setLoginStatus("Credentials Doesn't Exist");
      } else {
        navigateTo("/dashboard");
      }
    });
  };

  useEffect(() => {
    if (loginStatus !== "") {
      setStatusHolder("showMessage");
      setTimeout(() => {
        setStatusHolder("");
      }, 2000);
    }
  }, [loginStatus]);

  return (
    <div className="login-main">
      <div className="login-container">
        <div className="login-header">
          <div className="text">Admin Log In</div>
          <div className="underline"></div>
        </div>

        <div className="login-inputs">
          <div className="login-input">
            <MdEmail className="login-icon" />
            <input
              type="text"
              placeholder="Email"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
          </div>
          <div className="login-input">
            <FaLock className="login-icon" />
            <input
              type="text"
              placeholder="Password"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
          </div>
        </div>

        <div className={statusHolder}>{loginStatus}</div>

        <div className="submit-section">
          <button className="login-button" onClick={loginUser}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
