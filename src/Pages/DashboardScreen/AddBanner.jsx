import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import BannerForm from "../../Components/Forms/BannerForm";
import BannerTable from "../../Components/tables/BannerTable";

const AddBanner = () => {
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
        <AiOutlineSave className="ml-3" /> إضافة  شريط الاعلان
      </button>
      </div>

      <BannerForm closeModal={closeModal} isOpen={isOpen} />
      <BannerTable />
    </div>
  );
};

export default AddBanner;
