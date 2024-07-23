import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../Shared/Spinner";
import { useUpdateWorkerMutation } from "../../app/Feature/API/Workers";

const UpdateWorker = ({ isOpen, closeModal, initialValues ,refetchSearch}) => {
  const [employeeName, setEmployeeName] = useState(initialValues.name || "");
  const nameEdit = initialValues.name
  const [amount, setAmount] = useState(initialValues.price || "");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const [updateWorker, { isLoading }] = useUpdateWorkerMutation();

  useEffect(() => {
    setEmployeeName(initialValues.name || "");
    setAmount(initialValues.price || "");
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!employeeName || !amount) {
      setNotification({
        type: "error",
        message: "الرجاء ملء جميع الحقول!",
      });
      return;
    }

    const updatedWorker = {
      id: initialValues.id,
      name: employeeName,
      price: amount,
    };

    try {
      const { data } = await updateWorker({
        id: initialValues.id,
        workerData: updatedWorker,
      }).unwrap();

      setNotification({
        type: "success",
        message: "تم تحديث بيانات الموظف بنجاح!",
      });
      toast.success("تم تحديث بيانات الموظف بنجاح!");
      closeModal();
      resetForm();
      refetchSearch()
    } catch (error) {
      setNotification({
        type: "error",
        message: error.message || "اسم الشغلانه موجوده بالفعل من فضلك ضع اسم اخر",
      });
    }
  };

  const resetForm = () => {
    setEmployeeName(initialValues.name || "");
    setAmount(initialValues.price || "");
    setFormSubmitted(false);
    setNotification(null);
  };

  return (
    <>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white rounded-lg px-4 py-6 w-full max-w-md mx-auto overflow-y-auto shadow-xl">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 text-start mb-4">
                    تعديل بيانات {nameEdit}
                                      </Dialog.Title>
                  {notification && (
                    <div
                      className={`mt-3 p-2 text-center ${
                        notification.type === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {notification.message}
                    </div>
                  )}
                  <form
                    onSubmit={handleSubmit}
                    className="mt-4 grid grid-cols-1 gap-4"
                  >
                    <div>
                      <label
                        htmlFor="employeeName"
                        className="block text-gray-700 text-sm font-bold mb-2 text-start"
                      >
                        الاسم <span className="text-xl text-red-500 mt-4">*</span>
                      </label>
                      <input
                        id="employeeName"
                        type="text"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                          formSubmitted && !employeeName ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="amount"
                        className="block text-gray-700 text-sm font-bold mb-2 text-start"
                      >
                        السعر <span className="text-xl text-red-500 mt-4">*</span>
                      </label>
                      <input
                        id="amount"
                        type="number"
                        min={0}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                          formSubmitted && !amount ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-start gap-4 mt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-black text-white p-2 rounded-lg text-lg font-semibold flex items-center"
                      >
                        <AiOutlineClose className="ml-3" /> إلغاء
                      </button>
                      <button
                        type="submit"
                        className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center"
                      >
                        {!isLoading ? (
                          <AiOutlineSave className="ml-3" />
                        ) : (
                          <Spinner />
                        )}
                        حفظ
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UpdateWorker;
