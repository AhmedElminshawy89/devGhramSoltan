import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/Img/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { setActiveFalse, setActiveTrue } from "../../app/Feature/TabSlice";
import { IoIosLogOut } from "react-icons/io";
import { FaRegFaceGrinBeam } from "react-icons/fa6";
import { IoIosToday } from "react-icons/io";
import { RiAdminFill, RiDiscountPercentFill } from "react-icons/ri";
import { LuPackagePlus } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { IoTimer } from "react-icons/io5";
import {
  FaHome,
  FaFileInvoiceDollar,
  FaRegMoneyBillAlt,
  FaPhotoVideo,
  FaHandHoldingUsd,
  FaUserPlus,
} from "react-icons/fa";
import { MdOutlineAddBusiness } from "react-icons/md";
import CookieService from "../../Services/CookiesServices";
import { FcAdvertising } from "react-icons/fc";
import { MdImportantDevices } from "react-icons/md";
import { FaArrowUpRightDots } from "react-icons/fa6";
import { TbDoorEnter } from "react-icons/tb";

const Sidebar = () => {
  const activeTab = useSelector((state) => state.tab.activeTab);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = React.useState("");  // إضافة حالة للبحث

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

  const type = JSON.parse(localStorage.getItem("type"));

  const sidebarLinks = [
    { to: "/moderator", icon: <FaHome />, label: "الصفحة الرئيسية" },
    { to: "/moderator/reservations/makeup", icon: <FaRegFaceGrinBeam />, label: "حجز ميكاب" },
    { to: "/moderator/reservations/studio", icon: <FaPhotoVideo />, label: "حجز استوديو" },
    { to: "/moderator/reservations/daily", icon: <IoIosToday />, label: "حجز يومي" },
    { to: "/moderator/reservations/quick", icon: <FaRegMoneyBillAlt />, label: "شغل سريع" },
    { to: "/moderator/reservations/rental", icon: <IoTimer />, label: "ايجار" },
    { to: "/moderator/expenses", icon: <FaFileInvoiceDollar />, label: "المصروفات" },
    { to: "/moderator/Loans", icon: <FaHandHoldingUsd />, label: "سلفة الموظف" },
    { to: "/moderator/reports/daily", icon: <IoIosToday />, label: "التقارير اليوميه" },
    ...(type !== "admin"
      ? [
          { to: "/moderator/add-admin", icon: <RiAdminFill />, label: "إضافة أدمن" },
          { to: "/moderator/add-employee", icon: <FaUserPlus />, label: "إضافة موظف" },
          { to: "/moderator/add-work", icon: <MdOutlineAddBusiness />, label: "الشغل الاضافي" },
          { to: "/moderator/add-discount", icon: <RiDiscountPercentFill />, label: "إضافة الخصم" },
          { to: "/moderator/add-package", icon: <LuPackagePlus />, label: "إضافة باكدج" },
          { to: "/moderator/add-subpackage", icon: <BiCategory />, label: "إضافة باكدج فرعي" },
          { to: "/moderator/packages/add-main-rents", icon: <TbDoorEnter />, label: "إضافة عناصر الايجار" },
          { to: "/moderator/landing-page/add-banner", icon: <FcAdvertising />, label: "إضافة شريط الإعلان" },
          { to: "/moderator/landing-page/add-important-section", icon: <MdImportantDevices />, label: "إضافة قسم اهتمامنا" },
          { to: "/moderator/landing-page/what-distinguishes-us-section", icon: <FaArrowUpRightDots />, label: "إضافة قسم ما يميزنا" },
          { to: "/moderator/reports/monthly-employee-reports", icon: <TbReportAnalytics />, label: "تقارير شهريه للموظف" },
          { to: "/moderator/reports", icon: <TbReportAnalytics />, label: "التقارير" },
        ]
      : []),
  ];

  const filteredLinks = sidebarLinks.filter((link) => {
    if (searchQuery === "") {
      return true;
    }
    return link.label.includes(searchQuery)
  });

  const handleLogout = () => {
    localStorage.removeItem("type");
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    navigate('/Login');
    window.location.reload();
  };

  return (
    <div className={activeTab ? "" : "overlay"}>
      <div className={activeTab ? "sidebar-mobile" : "sidebar-layout"}>
        <div className="sidebar-title">
          <IoCloseSharp onClick={handleCloseDrawer} />
          <img src={logo} alt="غرام سنتر" loading="lazy" className="logo" />
        </div>
        {type !== 'admin'&&(
          <div className="sidebar-search">
            <input
              type="text"
              placeholder="ابحث هنا..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <div className="link-pages">
          <ul>
            {filteredLinks.map((link, index) => (
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
            <li onClick={handleLogout}>
              <Link to="#">
                <IoIosLogOut />
                <p>تسجيل الخروج</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
