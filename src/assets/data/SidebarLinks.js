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

const links = [
  { to: "/moderator", icon: <FaHome />, label: "الصفحة الرئيسية" },
  {
    to: "/moderator/reservations/makeup",
    icon: <FaRegFaceGrinBeam />,
    label: "حجز ميكاب",
  },
  {
    to: "/moderator/reservations/studio",
    icon: <FaPhotoVideo />,
    label: "حجز استوديو",
  },
  {
    to: "/moderator/reservations/daily",
    icon: <IoIosToday />,
    label: "حجز يومي",
  },
  {
    to: "/moderator/reservations/quick",
    icon: <FaRegMoneyBillAlt />,
    label: "شغل سريع",
  },
  { to: "/moderator/reservations/rental", icon: <IoTimer />, label: "ايجار" },
  {
    to: "/moderator/expenses",
    icon: <FaFileInvoiceDollar />,
    label: "المصروفات",
  },
  { to: "/moderator/Loans", icon: <FaHandHoldingUsd />, label: "سلفة العامل" },
  { to: "/moderator/add-admin", icon: <RiAdminFill />, label: "إضافة أدمن" },
  { to: "/moderator/add-employee", icon: <FaUserPlus />, label: "إضافة عامل" },
  {
    to: "/moderator/add-discount",
    icon: <RiDiscountPercentFill />,
    label: "إضافة الخصم",
  },
  {
    to: "/moderator/add-package",
    icon: <LuPackagePlus />,
    label: "إضافة باكدج",
  },
  {
    to: "/moderator/add-subpackage",
    icon: <BiCategory />,
    label: "إضافة باكدج فرعي",
  },
  { to: "/moderator/reports", icon: <TbReportAnalytics />, label: "التقارير" },
];

export default links;
