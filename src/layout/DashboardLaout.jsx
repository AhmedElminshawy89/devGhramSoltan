import React, { useEffect, useState } from "react";
import Navbar from "../Components/DashboardLayout/Navbar";
import Sidebar from "../Components/DashboardLayout/Sidebar";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "../Pages/Loading";

const DashboardLayout = () => {

  const [loading , setLoading] = useState(true);
  const activeTab = useSelector((state) => state.tab.activeTab);

  const contentNavbarClass = activeTab
    ? "content-navbar-mobile"
    : "content-navbar";

    useEffect(()=>{
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);

    },[])

    if(loading){
      <LoadingSpinner/>
    }

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
