import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../Shared/Spinner";
import { useUpdateDiscountMutation } from "../../app/Feature/API/Discount";

const UpdateDiscount = ({ isOpen, closeModal, initialValues }) => {
  const [name, setName] = useState(initialValues.discount || "");
  const nameEdit = initialValues.discount
  const [discount, setDiscount] = useState(initialValues.price || "");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const [updateDiscount, { isLoading }] = useUpdateDiscountMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (name && discount) {
      const updatedDiscount = {
        id: initialValues.id,
        discount: name,
        price: discount,
      };

      try {
        const { data } = await updateDiscount({
          id: initialValues.id,
          discountData: updatedDiscount,
        }).unwrap();

        setNotification({
          type: "success",
          message: "تم تحديث بيانات الخصم بنجاح!",
        });

        toast.success("تم تحديث بيانات الخصم بنجاح!");
        closeModal();
        resetForm();
      } catch (error) {
        console.error("حدث خطأ أثناء تحديث بيانات الخصم:", error);
        setNotification({
          type: "error",
          message: "حدث خطأ أثناء تحديث بيانات الخصم.",
        });
        toast.error("حدث خطأ أثناء تحديث بيانات الخصم.");
      }
    } else {
      setNotification({
        type: "error",
        message: "الرجاء ملء جميع الحقول!",
      });
    }
  };

  const resetForm = () => {
    setName(initialValues.discount);
    setDiscount(initialValues.price);
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
                <Dialog.Panel className="w-full max-w-md h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-start"
                  >
                    تعديل بيانات {nameEdit}
                  </Dialog.Title>
                  <div className="mt-2">
                    {notification && (
                      <div
                        className={`mt-2 mb-2 p-2 text-center ${
                          notification.type === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        } whitespace-nowrap`}
                      >
                        {notification.message}
                      </div>
                    )}
                    <form onSubmit={handleSubmit} className="mt-4">
                      <div className="mb-4">
                        <label
                          htmlFor="typeDiscount"
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                        >
                          نوع الخصم <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <input
                          id="typeDiscount"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            formSubmitted && !name ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="discount"
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                        >
                          نسبة الخصم <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <input
                          id="discount"
                          type="number"
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            formSubmitted && !discount ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      <div className="flex items-center justify-start gap-4 mt-4">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="bg-wite text-[#20b2aa] border border-[#20b2aa] p-2 rounded-lg text-lg font-semibold flex items-center"
                        >
                          <AiOutlineClose className="ml-3" /> إلغاء
                        </button>
                        <button
                          type="submit"
                          className="bg-[#20b2aa] text-white p-2 rounded-lg text-lg font-semibold flex items-center"
                        >
                          {isLoading ? (
                            <Spinner />
                          ) : (
                            <AiOutlineSave className="ml-3" />
                          )}
                          حفظ
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UpdateDiscount;
