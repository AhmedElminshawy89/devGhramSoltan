import React, { useState } from "react";
import { AiOutlineSave } from "react-icons/ai";
import DiscountTable from "../../Components/tables/DiscountTable";
import DiscountForm from "../../Components/Forms/DiscountForm";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AddDiscount = () => {
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
        <AiOutlineSave className="ml-3" /> إضافة  خصومات
      </button>

        <Link to={'/moderator/reservations/discount/search'}
          className="bg-black text-white p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <FaSearch className="ml-3" /> بحث الخصومات 
        </Link>
      </div>
    <DiscountForm closeModal={closeModal} isOpen={isOpen}/>
      <DiscountTable/>
    </div>
  );
};

export default AddDiscount;