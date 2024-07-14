import React, { useContext, useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import LoansTable from "../../Components/tables/LoansTable";
import LoansForm from "../../Components/Forms/LoansForm";
import { Link } from "react-router-dom";
import { OnlineStatusContext } from "../../Provider/OnlineStatusProvider";

const Loans = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isOnline = useContext(OnlineStatusContext);
  const backuploans = JSON.parse(localStorage.getItem("backuploans")) || [];
  const Number_of_data_offline = backuploans.length;
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <button
          onClick={openModal}
          className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <VscSaveAs className="ml-3" /> سلفه
        </button>
        <span className="text-lg font-semibold">
          البيانات الغير متصله({Number_of_data_offline})
        </span>{" "}
      </div>

      <LoansForm closeModal={closeModal} isOpen={isOpen} />
      <LoansTable />
    </div>
  );
};

export default Loans;
