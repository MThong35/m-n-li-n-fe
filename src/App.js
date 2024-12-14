import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import React, { useState } from "react";
// import logo from "./assets/logo.svg";
import "./assets/App.css";

import Home from "./pages/HomeScreen/HomeScreen";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import AdminPage from "./pages/Administration/AdminPage";

import ComicPage from "./pages/ComicManagement/ComicPage";
import UserComicPages from "./pages/ComicManagement/ComicDashboard";
import CreateComic from "./pages/ComicManagement/CreateComic";
import EditComic from "./pages/ComicManagement/EditComic";
import ComicInfo from "./pages/ComicManagement/ComicInfo";

import Task from "./pages/TaskManagement/TaskManage";
import TaskList from "./pages/TaskManagement/TaskList";
import AddTask from "./pages/TaskManagement/CreateTask";
import EditTask from "./pages/TaskManagement/EditTask";

import PublishingPage from "./pages/PublishingManagement/PublishingPage";

import UserManagement from "./pages/UserManagement/UserManagement";
import AddUser from "./pages/UserManagement/CreateUser";
import EditUser from "./pages/UserManagement/EditUser";
import UserInfo from "./pages/UserManagement/UserInfo";
import ComicEditor from "./components/Editor/ComicEditor"

import Unauthorized from "./pages/Error/Unauthorized";
import NotFound from "./pages/Error/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login and sign up */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Home and admin pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/comics/comicinfo" element={<ComicInfo />} />
        <Route path="/comics" element={<UserComicPages />} />
        {/* Layout and dashboard */}
        <Route path="/admin/dashboard" element={<AdminPage />} />
        <Route path="/admin/comicsmanage" element={<ComicPage />} />
        <Route path="/admin/addcomic" element={<CreateComic />} />
        <Route path="/admin/editcomic" element={<EditComic />} />
        <Route path="/admin/comicinfo" element={<ComicInfo />} />
        <Route path="/admin/comicinfo/comicEditor" element={<ComicEditor />} />
        {/* Task management */}
        <Route path="/admin/taskmanage" element={<Task />} />
        <Route path="/admin/tasklist" element={<TaskList />} />
        <Route path="/admin/addtask" element={<AddTask />} />
        <Route path="/admin/edittask" element={<EditTask />} />
        {/* Publishing */}
        <Route path="/admin/publishing" element={<PublishingPage />} />
        {/* User management */}
        <Route path="/admin/usermanage" element={<UserManagement />} />
        <Route path="/admin/adduser" element={<AddUser />} />
        <Route path="/admin/edituser" element={<EditUser />} />
        <Route path="/admin/userinfo" element={<UserInfo />} />
        {/* Exception Pages */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}


export default App;
