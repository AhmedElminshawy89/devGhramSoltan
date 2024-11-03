import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import EmployeeTable from "../../Components/tables/EmployeeTable";
import EmployeeForm from "../../Components/Forms/EmployeeForm";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AddEmployee = () => {

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-4">

      <div className="flex gap-4 items-center">
      <button
        onClick={openModal}
        className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
      >
        <AiOutlineSave className="ml-3" /> إضافة موظف جديد
      </button>
        

        <Link to={'/moderator/reservations/works/employee/search'}
          className="bg-black text-white p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <FaSearch className="ml-3" /> بحث الموظفين 
        </Link>
      </div>

      <EmployeeForm closeModal={closeModal} isOpen={isOpen}/>
    <EmployeeTable/>
    </div>
  );
};

export default AddEmployee;