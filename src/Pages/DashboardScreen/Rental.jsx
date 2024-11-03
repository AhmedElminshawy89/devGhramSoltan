import React, { useContext, useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import RentalTable from "../../Components/tables/RentalTable";
import RentalForm from "../../Components/Forms/RentalForm";
import { OnlineStatusContext } from "../../Provider/OnlineStatusProvider";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Rental = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isOnline = useContext(OnlineStatusContext);

  const backupRents = JSON.parse(localStorage.getItem("backuprents")) || [];
  const Number_of_data_offline = backupRents.length;
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-start">
        <div className="flex gap-4 items-center">
          <button
            onClick={openModal}
            className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
          >
            <VscSaveAs className="ml-3" /> ايجار
          </button>
        <Link to={'/moderator/reservations/works/rents/search'}
          className="bg-black text-white p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
        >
          <FaSearch className="ml-3" /> بحث الايجار 
        </Link>
      </div>
        {!isOnline&&(
        <span className="text-lg font-semibold">
          البيانات الغير متصله({Number_of_data_offline})
        </span>
        )}
      </div>
      <RentalForm closeModal={closeModal} isOpen={isOpen} />
      <RentalTable />
    </div>
  );
};

export default Rental;
