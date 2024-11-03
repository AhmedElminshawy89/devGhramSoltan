import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { InputNumber } from "antd";
import { toast } from "react-toastify";
import Spinner from "../../Shared/Spinner";
import { useUpdateMakeupInstallmentMutation } from "../../app/Feature/API/MakeUp";
import { useGetMakeUpDailyQuery } from "../../app/Feature/API/Daily";

const MakeUpInstallment = ({ isOpen, closeModal, initialValues }) => {
  const [total, setTotal] = useState(initialValues?.total || 0);
  const [payment, setPayment] = useState(initialValues?.pay || 0);
  const [secondInstallment, setSecondInstallment] = useState(initialValues?.secondInstallment || 0);
  const [thirdInstallment, setThirdInstallment] = useState(initialValues?.thirdInstallment || 0);
  const [remaining, setRemaining] = useState(initialValues?.rest || total - (payment + secondInstallment + thirdInstallment));
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [saveStudio, { isLoading }] = useUpdateMakeupInstallmentMutation();
  const { refetch: refetchMakeupDaily } = useGetMakeUpDailyQuery();

  useEffect(() => {
    const calculatedRemaining = total - (payment + secondInstallment + thirdInstallment);
    setRemaining(calculatedRemaining >= 0 ? calculatedRemaining : 0); // Prevent negative balance
  }, [total, payment, secondInstallment, thirdInstallment]);

  const handlePaymentChange = (value) => {
    if (value + secondInstallment + thirdInstallment > total) {
      setNotification({
        type: "error",
        message: "المبلغ المدفوع يتجاوز الإجمالي المسموح!",
      });
    } else {
      setPayment(value);
      setNotification(null); 
    }
  };

  const handleSecondInstallmentChange = (value) => {
    if (payment + value + thirdInstallment > total) {
      setNotification({
        type: "error",
        message: "المبلغ المدفوع يتجاوز الإجمالي المسموح!",
      });
    } else {
      setSecondInstallment(value);
      setNotification(null);
    }
  };

  const handleThirdInstallmentChange = (value) => {
    if (payment + secondInstallment + value > total) {
      setNotification({
        type: "error",
        message: "المبلغ المدفوع يتجاوز الإجمالي المسموح!",
      });
    } else {
      setThirdInstallment(value);
      setNotification(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (total && payment && remaining >= 0) {
      const formData = new FormData();
      formData.append("id", initialValues?.id);
      formData.append("total", total);
      formData.append("pay", payment);
      formData.append("rest", remaining);
      formData.append("secondInstallment", secondInstallment);
      formData.append("thirdInstallment", thirdInstallment);

      try {
        const response = await saveStudio({
            id: initialValues.id,
            makeupData: formData,
        });

        if (response.error) {
          setNotification({
            type: "error",
            message: response.error.message || "حدث خطأ أثناء حفظ البيانات.",
          });
        } else {
          setNotification({
            type: "success",
            message: "تم حفظ البيانات بنجاح!",
          });
          toast.success("تم حفظ البيانات بنجاح!");
          resetForm();
          closeModal();
          refetchMakeupDaily();
        }
      } catch (error) {
        setNotification({
          type: "error",
          message: "حدث خطأ أثناء حفظ البيانات.",
        });
        console.error("Failed to save studio:", error);
      }
    } else {
      setNotification({
        type: "error",
        message: "الرجاء ملء جميع الحقول!",
      });
    }
  };

  const resetForm = () => {
    setTotal(0);
    setPayment(0);
    setRemaining(0);
    setSecondInstallment(0);
    setThirdInstallment(0);
    setFormSubmitted(false);
    setNotification(null);
  };

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
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
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 text-start">
                    الاقساط للميكاب
                  </Dialog.Title>
                  <div className="mt-2 overflow-y-auto overflow-x-hidden h-full">
                    {notification && (
                      <div
                        className={`mt-2 mb-2 p-2 text-center ${
                          notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        } whitespace-nowrap`}
                      >
                        {notification.message}
                      </div>
                    )}
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2 text-start" htmlFor="total">
                            الإجمالي <span className="text-xl text-red-500 mt-4">*</span>
                          </label>
                          <InputNumber
                            id="total"
                            value={total}
                            onChange={setTotal}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${
                              formSubmitted && !total ? "border-red-500" : ""
                            }`}
                            readOnly
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2 text-start" htmlFor="payment">
                            الدفعة المقدمة <span className="text-xl text-red-500 mt-4">*</span>
                          </label>
                          <InputNumber
                            id="payment"
                            value={payment}
                            onChange={handlePaymentChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2 text-start" htmlFor="remaining">
                            المبلغ المتبقي <span className="text-xl text-red-500 mt-4">*</span>
                          </label>
                          <InputNumber
                            id="remaining"
                            value={remaining}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                            readOnly
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2 text-start" htmlFor="secondInstallment">
                            القسط الثاني
                          </label>
                          <InputNumber
                            id="secondInstallment"
                            value={secondInstallment}
                            onChange={handleSecondInstallmentChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2 text-start" htmlFor="thirdInstallment">
                            القسط الثالث
                          </label>
                          <InputNumber
                            id="thirdInstallment"
                            value={thirdInstallment}
                            onChange={handleThirdInstallmentChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                          />
                        </div>
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
                        {isLoading ? (
                          <Spinner />
                        ) : (
                          <>
                            <AiOutlineSave className="ml-1" />
                            حفظ
                          </>
                        )}
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
    </div>
  );
};

export default MakeUpInstallment;
