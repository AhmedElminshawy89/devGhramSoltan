import React, { useState } from "react";

import { VscSaveAs } from "react-icons/vsc";
import QuicklyTable from "../../Components/tables/QuicklyTables";
import QuicklyForm from "../../Components/Forms/QuicklyFrom";

const Quickly = () => {
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
        <VscSaveAs className="ml-3" /> الشغل السريع
      </button>
      <QuicklyForm closeModal={closeModal} isOpen={isOpen} />

      <QuicklyTable />
    </div>
  );
};

export default Quickly;
