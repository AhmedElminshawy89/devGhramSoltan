import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import AdminTable from "../../Components/tables/AdminTable";
import AdminForm from "../../Components/Forms/AdminForm";

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
      <button
        onClick={openModal}
        className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
      >
        <AiOutlineSave className="ml-3" /> إضافة أدمن جديد
      </button>
      <AdminForm closeModal={closeModal} isOpen={isOpen} />
      <AdminTable />
    </div>
  );
};

export default AddAdmin;
