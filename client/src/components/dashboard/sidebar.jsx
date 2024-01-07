import React from "react";
import "./dashboard.css";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { ImBooks } from "react-icons/im";
import { FiActivity } from "react-icons/fi";
import { IoLogOut, IoGitPullRequestSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const SidebarLink = ({ to, icon: Icon, text }) => {
  return (
    <li className="sidebar-links">
      <Link to={to} className="sidebar-links">
        <div className="sidebar-link">
          <Icon />
          {text}
        </div>
      </Link>
    </li>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <ul>
        <SidebarLink
          to="/dashboard/admin"
          icon={MdOutlineDashboardCustomize}
          text="Dashboard"
        />
        <SidebarLink
          to="/dashboard/manage-users"
          icon={FaUsers}
          text="Manage Users"
        />
        <SidebarLink
          to="/dashboard/manage-books"
          icon={ImBooks}
          text="Manage Books"
        />
        <SidebarLink
          to="/dashboard/requests"
          icon={IoGitPullRequestSharp}
          text="Requests"
        />
        <SidebarLink
          to="/dashboard/activity"
          icon={FiActivity}
          text="Activity"
        />
        <SidebarLink to="/" icon={IoLogOut} text="Logout" />
      </ul>
    </div>
  );
};

export default Sidebar;
