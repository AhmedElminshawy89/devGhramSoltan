import React from "react";
import Navbar from "../Components/DashboardLayout/Navbar";
import Sidebar from "../Components/DashboardLayout/Sidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);

  const contentNavbarClass = activeTab
    ? "content-navbar-mobile"
    : "content-navbar";

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className={contentNavbarClass}>
        <Navbar />
        <div className="content-layout">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashboardLayout);
