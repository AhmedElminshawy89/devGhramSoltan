import React, { useState, useContext } from "react";
import { VscSaveAs } from "react-icons/vsc";
import ExpensesTable from "../../Components/tables/ExpensesTable";
import ExpensesForm from "../../Components/Forms/ExpensesForm";
import { OnlineStatusContext } from "../../Provider/OnlineStatusProvider";

const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isOnline = useContext(OnlineStatusContext);

  const backupExpenses =
    JSON.parse(localStorage.getItem("backupexpenses")) || [];
  const Number_of_data_offline = backupExpenses.length;

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
          <VscSaveAs className="ml-3" /> المصروفات
        </button>
        {!isOnline&&(
        <span className="text-lg font-semibold">
          البيانات الغير متصله({Number_of_data_offline})
        </span>
        )}
      </div>
      <ExpensesForm closeModal={closeModal} isOpen={isOpen} />
      <ExpensesTable />
    </div>
  );
};

export default Expenses;
