import React, { useState } from "react";
import {
  AiOutlineSave,
} from "react-icons/ai";
import SubPackageForm from "../../Components/Forms/SubPackageForm";
import SubPackageTable from "../../Components/tables/SubPackageTable";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AddSubPackage = () => {
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
          <AiOutlineSave className="ml-3" /> إضافة باكدج فرعي
        </button>


        <Link to={'/moderator/reservations/sub-packages/search'}
          className="bg-wite text-[#20b2aa] border border-[#20b2aa] p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <FaSearch className="ml-3" />  بحث الباكدجات الفرعيه
        </Link>
      </div>
      <SubPackageForm closeModal={closeModal} isOpen={isOpen} />
      <SubPackageTable />
    </div>
  );
};

export default AddSubPackage;
