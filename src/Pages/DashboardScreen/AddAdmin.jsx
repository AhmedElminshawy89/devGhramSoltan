import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import AdminTable from "../../Components/tables/AdminTable";
import AdminForm from "../../Components/Forms/AdminForm";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AddAdmin = () => {
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
        <AiOutlineSave className="ml-3" /> إضافة أدمن جديد
      </button>

        <Link to={'/moderator/reservations/works/admins/search'}
          className="bg-black text-white p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <FaSearch className="ml-3" /> بحث الادمن 
        </Link>
      </div>
      <AdminForm closeModal={closeModal} isOpen={isOpen} />
      <AdminTable />
    </div>
  );
};

export default AddAdmin;
