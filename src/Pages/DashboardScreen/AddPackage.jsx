import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import PackageForm from "../../Components/Forms/PackageForm";
import PackageTable from "../../Components/tables/PackageTable";

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
      <button
        onClick={openModal}
        className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
      >
        <AiOutlineSave className="ml-3" /> إضافة  باكدج
      </button>
      <PackageForm closeModal={closeModal} isOpen={isOpen} />
      <PackageTable />
    </div>
  );
};

export default AddPackage;
