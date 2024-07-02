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


  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);





  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
      >
        <VscSaveAs className="ml-3" /> ايجار
      </button>
      <RentalForm closeModal={closeModal} isOpen={isOpen} />
      <RentalTable />
    </div>
  );
};

export default Rental;
