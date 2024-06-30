import React, { useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import StudioTable from "../../Components/tables/StudioTable";
import StudioForm from "../../Components/Forms/StudioForm";
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
      <button
        onClick={openModal}
        className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
      >
        <VscSaveAs className="ml-3" /> حجز استوديو
        <StudioForm closeModal={closeModal} isOpen={isOpen}/>
      </button>
      <StudioTable />
    </div>
  );
};

export default Studio;
