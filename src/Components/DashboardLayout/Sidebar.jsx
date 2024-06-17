import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/Img/logo.png";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaFileInvoiceDollar,
  FaRegMoneyBillAlt,
  FaPhotoVideo,
  FaHandHoldingUsd,
  FaUserPlus,
} from "react-icons/fa";
import { IoCloseSharp, IoTimer } from "react-icons/io5";
import { setActiveTab } from "../../app/Feature/TabSlice";
import { FaRegFaceGrinBeam } from "react-icons/fa6";
import { IoIosToday } from "react-icons/io";
import { RiAdminFill, RiDiscountPercentFill } from "react-icons/ri";
import { LuPackagePlus } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";

const Sidebar = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleTabChange = useCallback(() => {
    dispatch(setActiveTab(!activeTab));
  }, [dispatch, activeTab]);

  const handlecloseDrawer = () => {
    if (window.innerWidth < 992) {
      dispatch(setActiveTab(!activeTab));
    }
  };
  return (
    <div className={activeTab ? "" : "overlay"}>
      <div className={activeTab ? "sidebar-mobile" : "sidebar-layout"}>
        <div className="sidebar-title">
          <IoCloseSharp onClick={() => handleTabChange()} />
          <img src={logo} alt="غرام سنتر" loading="lazy" className="logo" />
        </div>
        <div className="link-pages">
          <ul>
            <li
              className={`${
                location.pathname === "/moderator" ? "active-link" : ""
              }`}
              onClick={() => handlecloseDrawer()}
            >
              <Link to="/moderator">
                <FaHome />
                <p>الصفحة الرئيسية</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/reservations/makeup"
                  ? "active-link"
                  : ""
              }`}
              onClick={() => handlecloseDrawer()}

            >
              <Link to="/moderator/reservations/makeup">
                <FaRegFaceGrinBeam />
                <p>حجز ميكاب</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/reservations/studio"
                  ? "active-link"
                  : ""
              }`}
              onClick={() => handlecloseDrawer()}
            >
              <Link to="/moderator/reservations/studio">
                <FaPhotoVideo />
                <p>حجز استوديو</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/reservations/daily"
                  ? "active-link"
                  : ""
              }`}
              onClick={() => handlecloseDrawer()}
            >
              <Link to="/moderator/reservations/daily">
                <IoIosToday />
                <p>حجز يومي</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/reservations/quick"
                  ? "active-link"
                  : ""
              }`}
              onClick={() => handlecloseDrawer()}

            >
              <Link to="/moderator/reservations/quick">
                <FaRegMoneyBillAlt />
                <p>شغل سريع</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/reservations/rental"
                  ? "active-link"
                  : ""
              }`}
              onClick={() => handlecloseDrawer()}

            >
              <Link to="/moderator/reservations/rental">
                <IoTimer />
                <p>ايجار</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/expenses" ? "active-link" : ""
              }`}
              onClick={() => handlecloseDrawer()}

            >
              <Link to="/moderator/expenses">
                <FaFileInvoiceDollar />
                <p>المصروفات</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/Loans" ? "active-link" : ""
              }`}
              onClick={() => handlecloseDrawer()}

            >
              <Link to="/moderator/Loans">
                <FaHandHoldingUsd />
                <p>سلفة العامل</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/add-admin"
                  ? "active-link"
                  : ""
              }`}
              onClick={() => handlecloseDrawer()}

            >
              <Link to="/moderator/add-admin">
                <RiAdminFill />
                <p>إضافة أدمن</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/add-employee"
                  ? "active-link"
                  : ""
              }`}
              onClick={() => handlecloseDrawer()}

            >
              <Link to="/moderator/add-employee">
                <FaUserPlus />
                <p>إضافة عامل</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/add-discount"
                  ? "active-link"
                  : ""
              }`}
              onClick={() => handlecloseDrawer()}

            >
              <Link to="/moderator/add-discount">
                <RiDiscountPercentFill />
                <p>إضافة الخصم</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/add-package"
                  ? "active-link"
                  : ""
              }`}
              onClick={() => handlecloseDrawer()}

            >
              <Link to="/moderator/add-package">
                <LuPackagePlus />
                <p>إضافة باكدج</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/add-subpackage"
                  ? "active-link"
                  : ""
              }`}
              onClick={() => handlecloseDrawer()}

            >
              <Link to="/moderator/add-subpackage">
                <BiCategory />
                <p> إضافة باكدج فرعي</p>
              </Link>
            </li>
            <li
              className={`${
                location.pathname === "/moderator/reports" ? "active-link" : ""
              }`}
              onClick={() => handlecloseDrawer()}
            >
              <Link to="/moderator/reports">
                <TbReportAnalytics />
                <p>التقارير</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
