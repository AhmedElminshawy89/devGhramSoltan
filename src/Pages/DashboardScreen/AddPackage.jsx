import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import PackageForm from "../../Components/Forms/PackageForm";
import PackageTable from "../../Components/tables/PackageTable";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AddPackage = () => {
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
        className="bg-[#20b2aa] text-white p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
      >
        <AiOutlineSave className="ml-3" /> إضافة  باكدج
      </button>

        <Link to={'/moderator/reservations/packages/search'}
          className="bg-wite text-[#20b2aa] border border-[#20b2aa] p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <FaSearch className="ml-3" /> بحث الباكدجات 
        </Link>
      </div>

      <PackageForm closeModal={closeModal} isOpen={isOpen} />
      <PackageTable />
    </div>
  );
};

export default AddPackage;
