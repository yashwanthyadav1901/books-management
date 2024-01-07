// Dashboard.js
import React from "react";
import "./dashboard.css";
import { Outlet } from "react-router-dom";

import Sidebar from "./sidebar";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
