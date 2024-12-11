import React from "react";
// import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Admin/AdminSidebar";
import Header from "../../components/Admin/AdminHeader";
// import Dashboard from "../AdminDashboard/Dashboard";
import PublishingTable from "./PublishingTable";

export default function Layout() {
  return (
    <div
      className="flex flex-row  bg-neutral-100 h-screen w-screen
        overflow-hidden"
    >
      <div className="flex bg-neutral-200">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-y-scroll">
        <Header />
        <div className="p-2">
          {" "}
          {/* Reduced padding here */}
          <PublishingTable />
        </div>
      </div>
    </div>
  );
}
