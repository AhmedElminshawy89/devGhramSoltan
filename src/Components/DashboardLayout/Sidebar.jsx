import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/Img/logo.png";
import { Link, useLocation } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { setActiveFalse, setActiveTrue } from "../../app/Feature/TabSlice";
import links from "../../assets/data/SidebarLinks";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleCloseDrawer = useCallback(() => {
    if (window.innerWidth < 992) {
      dispatch(setActiveTrue());
    }
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        dispatch(setActiveTrue());
      } else {
        dispatch(setActiveFalse());
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <div className={activeTab ? "" : "overlay"}>
      <div className={activeTab ? "sidebar-mobile" : "sidebar-layout"}>
        <div className="sidebar-title">
          <IoCloseSharp onClick={handleCloseDrawer} />
          <img src={logo} alt="غرام سنتر" loading="lazy" className="logo" />
        </div>
        <div className="link-pages">
          <ul>
            {links.map((link, index) => (
              <li
                key={index}
                className={`${
                  location.pathname === link.to ? "active-link" : ""
                }`}
                onClick={handleCloseDrawer}
              >
                <Link to={link.to}>
                  {link.icon}
                  <p>{link.label}</p>
                </Link>
              </li>
            ))}
                <li
                onClick={handleCloseDrawer}
              >
                <Link to={'/moderator/Login'}>
                  <IoIosLogOut/>
                  <p>تسجيل الخروج</p>
                </Link>
              </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
