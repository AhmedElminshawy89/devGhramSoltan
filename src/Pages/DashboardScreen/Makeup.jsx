import React, { useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import MakeUpTable from "../../Components/tables/MakeUpTable";
import MakeupForm from "../../Components/Forms/MakeupForm";
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const Makeup = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="p-4">
      <div className="flex gap-4 items-center">
        <button
          onClick={openModal}
          className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <VscSaveAs className="ml-3" /> حجز ميكاب
        </button>
        <Link to={'/moderator/reservations/makeup/search'}
          className="bg-black text-white p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <FaSearch className="ml-3" /> بحث الميكاب
        </Link>
      </div>
      <MakeupForm isOpen={isOpen} closeModal={closeModal}/>
      <MakeUpTable />
    </div>
  );
};

export default Makeup;
