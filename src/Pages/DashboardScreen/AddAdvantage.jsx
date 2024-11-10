import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import AdvantageForm from "../../Components/Forms/AdvantageForm";
import AdvantageTable from "../../Components/tables/AdvantageTable";

const AddAdvantage = () => {
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
        <AiOutlineSave className="ml-3" /> إضافة قسم ما يميزنا
      </button>
      </div>

      <AdvantageForm closeModal={closeModal} isOpen={isOpen} />
      <AdvantageTable />
    </div>
  );
};

export default AddAdvantage;
