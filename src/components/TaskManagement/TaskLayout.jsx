import React from "react";
import Sidebar from "../Admin/AdminSidebar";
import Header from "../Admin/AdminHeader";
import Dashboard from "./TaskDashboard";
import TaskDashboard from "../../pages/TaskManagement/TaskManagerDashboard";

export default function Layout() {
  return (
    <div className="flex bg-neutral-100 h-screen w-screen">
      {/* Sidebar */}
      <div className="flex bg-neutral-200">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-scroll">
        <Header />
        <div className="p-2">
          {" "}
          {/* Reduced padding here */}
          <Dashboard />
          <TaskDashboard />
        </div>
      </div>
    </div>
  );
}
