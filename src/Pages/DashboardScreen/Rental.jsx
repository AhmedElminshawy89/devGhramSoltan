import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { VscSaveAs } from "react-icons/vsc";
import MUIDataTable from "mui-datatables";
import Select from "react-select";
import RentalTable from "../../Components/tables/RentalTable";
import RentalForm from "../../Components/Forms/RentalForm";

const Rental = () => {
  const [isOpen, setIsOpen] = useState(false);

  const backupRents = JSON.parse(localStorage.getItem("backuprents")) || [];
  const Number_of_data_offline = backupRents.length;
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <button
          onClick={openModal}
          className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <VscSaveAs className="ml-3" /> ايجار
        </button>
        <span className="text-lg font-semibold">
          البيانات الغير متصله({Number_of_data_offline})
        </span>{" "}
      </div>
      <RentalForm closeModal={closeModal} isOpen={isOpen} />
      <RentalTable />
    </div>
  );
};

export default Rental;
