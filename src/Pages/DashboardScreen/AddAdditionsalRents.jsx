import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import AdditionalRentsForm from "../../Components/Forms/AdditionalRentsForm";
import AdditionalRentsTable from "../../Components/tables/AdditionalRentsTable";

const AddAdditionsalRents = () => {
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
        <AiOutlineSave className="ml-3" /> إضافة عناصر ايجار 
      </button>
      </div>

      <AdditionalRentsForm closeModal={closeModal} isOpen={isOpen} />
      <AdditionalRentsTable />
    </div>
  );
};

export default AddAdditionsalRents;
