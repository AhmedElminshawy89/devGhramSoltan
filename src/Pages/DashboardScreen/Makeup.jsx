import React, { useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import MakeUpTable from "../../Components/tables/MakeUpTable";
import MakeupForm from "../../Components/Forms/MakeupForm";

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
      <button
        onClick={openModal}
        className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
      >
        <VscSaveAs className="ml-3" /> حجز ميكاب
      </button>
      <MakeupForm isOpen={isOpen} closeModal={closeModal}/>
      <MakeUpTable />
    </div>
  );
};

export default Makeup;
