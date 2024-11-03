import React, { useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import StudioTable from "../../Components/tables/StudioTable";
import StudioForm from "../../Components/Forms/StudioForm";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Studio = () => {
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
          <VscSaveAs className="ml-3" /> حجز استوديو
        </button>
        <Link to={'/moderator/reservations/studio/search'}
          className="bg-black text-white p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <FaSearch className="ml-3" /> بحث الاستوديو
        </Link>
      </div>
        <StudioForm closeModal={closeModal} isOpen={isOpen}/>
      <StudioTable />
    </div>
  );
};

export default Studio;
