import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import DashboardLaout from "../layout/DashboardLaout";
import HomeDashboard from "../Pages/DashboardScreen/HomeDashboard";
import Makeup from "../Pages/DashboardScreen/Makeup";
import Studio from "../Pages/DashboardScreen/Studio";
import Daily from "../Pages/DashboardScreen/Daily";
import Quickly from "../Pages/DashboardScreen/Quickly";
import Rental from "../Pages/DashboardScreen/Rental";
import Expenses from "../Pages/DashboardScreen/Expenses";
import Loans from "../Pages/DashboardScreen/Loans";
import AddAdmin from "../Pages/DashboardScreen/AddAdmin";
import AddEmployee from "../Pages/DashboardScreen/AddEmployee";
import AddDiscount from "../Pages/DashboardScreen/AddDiscount";
import AddPackage from "../Pages/DashboardScreen/AddPackage";
import AddSubPackage from "../Pages/DashboardScreen/AddSubPackage";
import Reports from "../Pages/DashboardScreen/Reports";
import Login from "../Pages/DashboardScreen/Login";
import AddWorkers from "../Pages/DashboardScreen/AddWorkers";
import LoansAllData from "../Pages/BackupData/LoansAllData";
import { useEffect } from "react";
import CookieService from "../Services/CookiesServices";
import LandingPage from "../Pages/LandingPage/LandingPage";
const Routing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const jwtToken = CookieService.get("jwt");
  const type = JSON.parse(localStorage.getItem("type"));

    const isModeratorPath = location.pathname.startsWith("/moderator");

    if (!jwtToken && isModeratorPath) {
      navigate("/login");
    }
  }, [navigate, location.pathname]);
  
  return (
    <>
      <Routes>
        <Route path="/" index element={<LandingPage/>}/>
        <Route path="/moderator" element={<DashboardLaout />}>
          <Route index element={<HomeDashboard />} />
          <Route path="reservations/makeup" element={<Makeup />} />
          <Route path="reservations/studio" element={<Studio />} />
          <Route path="reservations/daily" element={<Daily />} />
          <Route path="reservations/quick" element={<Quickly />} />
          <Route path="reservations/rental" element={<Rental />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="expenses/all-data" element={<LoansAllData />} />
          <Route path="Loans" element={<Loans />} />
          <Route path="Loans/all-data" element={<LoansAllData />} />
          <Route path="add-admin" element={<AddAdmin />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="add-work" element={<AddWorkers />} />
          <Route path="add-discount" element={<AddDiscount />} />
          <Route path="add-package" element={<AddPackage />} />
          <Route path="add-subpackage" element={<AddSubPackage />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        <Route path='/Login' element={<Login/>}/>
      </Routes>
    </>
  );
};

export default Routing;
