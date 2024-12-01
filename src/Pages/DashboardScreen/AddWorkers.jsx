import React, { useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import WorkersTable from "../../Components/tables/WorkersTable";
import FormWorkers2 from "../../Components/Forms/FormWorkers";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

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
      <div className="flex gap-4 items-center">
        <button
          onClick={openModal}
          className="bg-[#20b2aa] text-white p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <VscSaveAs className="ml-3" />   الشغل الاضافي
        </button>

        <Link to={'/moderator/reservations/works/workers/search'}
          className="bg-wite text-[#20b2aa] border border-[#20b2aa] p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <FaSearch className="ml-3" /> بحث الشغل الاضافي 
        </Link>
      </div>
      <FormWorkers2  closeModal={closeModal} isOpen={isOpen}/>

    <WorkersTable/>
    </div>
  );
};

export default AddWorkers;
