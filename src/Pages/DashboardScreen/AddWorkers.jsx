import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { VscSaveAs } from "react-icons/vsc";
import MUIDataTable from "mui-datatables";
import WorkersTable from "../../Components/tables/WorkersTable";
import { toast } from "react-toastify";
import FormWorkers2 from "../../Components/Forms/FormWorkers";

const AddWorkers = () => {
  const [isOpen, setIsOpen] = useState("");


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
        <VscSaveAs className="ml-3" />   الشغل الاضافي
      </button>

      <FormWorkers2  closeModal={closeModal} isOpen={isOpen}/>

    <WorkersTable/>
    </div>
  );
};

export default AddWorkers;
