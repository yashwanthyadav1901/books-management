import React from "react";
import "./StartPage.css";
import { Link } from "react-router-dom";

const StartPage = () => {
  return (
    <div className="start-main">
      <div className="admin-user-buttons">
        <div className="login-text">
          <h2>login as</h2>
        </div>
        <div>
          <Link to="/admin-login" className="button admin">
            admin
          </Link>
          <Link to="/user-login" className="button user">
            user
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
