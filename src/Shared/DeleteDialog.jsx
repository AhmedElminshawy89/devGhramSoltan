import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Spinner from "./Spinner";
import { Delete } from "@mui/icons-material";

function DeleteDialog({ isOpen, onClose, onDeleteConfirmed, loading }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50"
    >
      <DialogPanel className="max-w-[650px] w-[100%] space-y-4 border bg-white p-8 rounded-xl">
        <DialogTitle className="font-semibold text-lg mt-[-15px]">
          تأكيد الحذف
        </DialogTitle>
        <Description>هل أنت متأكد أنك تريد حذف هذا السجل؟</Description>
        <div className="flex gap-4 pt-5 pb-0">
          <button
            onClick={onDeleteConfirmed}
            className="bg-red-500 text-white px-4 py-2 rounded flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <Spinner /> : <Delete className="text-xl ml-3" />}
            نعم
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            لا
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}

export default DeleteDialog;
