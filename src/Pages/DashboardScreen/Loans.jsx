import React, { useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import LoansTable from "../../Components/tables/LoansTable";
import LoansForm from "../../Components/Forms/LoansForm";

const Loans = () => {
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
        <VscSaveAs className="ml-3" />  سلفه
      </button>

      <LoansForm closeModal={closeModal} isOpen={isOpen} />

      <LoansTable />
    </div>
  );
};

export default Loans;
