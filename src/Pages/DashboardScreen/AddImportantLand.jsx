import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import BannerTable from "../../Components/tables/BannerTable";
import ImportantForm from "../../Components/Forms/ImportantForm";
import ImportantTable from "../../Components/tables/ImportantTable";

const AddImportantLand = () => {
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
        <AiOutlineSave className="ml-3" /> إضافة قسم اهتمامنا
      </button>
      </div>

      <ImportantForm closeModal={closeModal} isOpen={isOpen} />
      <ImportantTable />
    </div>
  );
};

export default AddImportantLand;
