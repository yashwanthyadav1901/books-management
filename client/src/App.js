import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/loginPage/loginPage";
import RegisterPage from "./components/Register/registerPage";
import Dashboard from "./components/dashboard/dashboard";
import Manageusers from "./components/users/Manageusers";
import BookList from "./components/managebooks/bookList";
import ManageRequests from "./components/requests/manageRequests";
import Admin from "./components/dashboard/admin";
import BookDetails from "./components/managebooks/bookDetails";
import StartPage from "./components/startPage/StartPage";
import AdminLogin from "./components/adminLogin/AdminLogin";
import UserInterface from "./components/UserInterface/UserInterface";
import Activity from "./components/Activity/Activity";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/user-login" element={<LoginPage />} />
        <Route path="/user" element={<UserInterface />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/admin" element={<Admin />} />
          <Route path="/dashboard/manage-users" element={<Manageusers />} />
          <Route path="/dashboard/manage-books" element={<BookList />} />
          <Route path="/dashboard/manage-books/:id" element={<BookDetails />} />
          <Route path="/dashboard/requests" element={<ManageRequests />} />
          <Route path="/dashboard/activity" element={<Activity />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
