import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  AiOutlineClose,
  AiOutlineSave,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { VscSaveAs } from "react-icons/vsc";
import MUIDataTable from "mui-datatables";
import ExpensesTable from "../../Components/tables/ExpensesTable";
import ExpensesForm from "../../Components/Forms/ExpensesForm";

const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ExpensesOffline, setExpensesOffline] = useState([]);
  const backupExpenses =
    JSON.parse(localStorage.getItem("backupExpenses")) || [];
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
        <span className="text-lg font-semibold">
          البيانات الغير متصله({Number_of_data_offline})
        </span>{" "}
      </div>
      <ExpensesForm
        closeModal={closeModal}
        isOpen={isOpen}
        setExpensesOffline={setExpensesOffline}
      />
      <ExpensesTable
        ExpensesOffline={ExpensesOffline}
        setExpensesOffline={setExpensesOffline}
      />
    </div>
  );
};

export default Expenses;
