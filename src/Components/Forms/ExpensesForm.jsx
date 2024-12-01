import React, { useState, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSaveExpenseMutation } from "../../app/Feature/API/Expenses";
import Spinner from "../../Shared/Spinner";
import { OnlineStatusContext } from "../../Provider/OnlineStatusProvider";
import { useDispatch, useSelector } from "react-redux";
import { addOfflineExpense } from "../../app/Feature/offlineExpensesSlice";

const ExpensesForm = ({ isOpen, closeModal }) => {
    const [employeeName, setEmployeeName] = useState("");
    const [expenseReason, setExpenseReason] = useState("");
    const [amount, setAmount] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [notification, setNotification] = useState(null);
  
    const [saveExpense, { isLoading }] = useSaveExpenseMutation();
  
    const isOnline = useContext(OnlineStatusContext);

    const dispatch = useDispatch();
    const offlineLoans = useSelector((state) => state.offlineExpenses.expenses) || [];

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormSubmitted(true);
  
      if (employeeName && expenseReason && amount) {
        try {
          if (isOnline) {
            const response = await saveExpense({
              side:employeeName,
              reason:expenseReason,
              price:amount,
            });
            closeModal();
            setNotification({ type: "success", message: "تم حفظ البيانات بنجاح!" });
            toast.success("تم حفظ البيانات بنجاح!");
            resetForm();
          } else {
            const newOfflineData = {
              id: Date.now(),
              side:employeeName,
              reason:expenseReason,
              price:amount,
            };
            dispatch(addOfflineExpense(newOfflineData));
            setNotification({
              type: "error",
              message: "تم حفظها محليًا وستتم مزامنتها عند استعادة الاتصال.",
            });
            closeModal();
            resetForm();
            toast.error("تم حفظها محليًا وستتم مزامنتها عند استعادة الاتصال.");
          }
        } catch (error) {
          const newOfflineData = {
            id: Date.now(),
            side:employeeName,
            reason:expenseReason,
            price:amount,
          };
          dispatch(addOfflineExpense(newOfflineData));
          setNotification({
            type: "error",
            message: "تم حفظها محليًا وستتم مزامنتها عند استعادة الاتصال.",
          });
          closeModal();
          resetForm();
          toast.error("تم حفظها محليًا وستتم مزامنتها عند استعادة الاتصال.");
        }
      } else {
        setNotification({ type: "error", message: "الرجاء ملء جميع الحقول!" });
      }
    };
  
    const resetForm = () => {
      setEmployeeName("");
      setExpenseReason("");
      setAmount("");
      setFormSubmitted(false);
      setNotification(null);
    };

  return (
    <>
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
                <Dialog.Panel className="bg-white rounded-lg px-4 py-6 w-full max-w-md mx-auto overflow-y-auto shadow-xl">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 text-start mb-4">
                     اضافه المصروفات
                  </Dialog.Title>
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
                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-4"
                  >
                    <div>
                      <label
                        htmlFor="employeeName"
                        className="block text-gray-700 text-sm font-bold mb-2 text-start"
                      >
                        الجهة<span className="text-xl text-red-500 mt-4">*</span>
                      </label>
                      <input
                        id="employeeName"
                        type="text"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        className={`shadow appearance-none border ${
                          formSubmitted && !employeeName
                            ? "border-red-500"
                            : "border-gray-400"
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="expenseReason"
                        className="block text-gray-700 text-sm font-bold mb-2 text-start"
                      >
                        سبب الصرف <span className="text-xl text-red-500 mt-4">*</span>
                      </label>
                      <input
                        id="expenseReason"
                        type="text"
                        value={expenseReason}
                        onChange={(e) => setExpenseReason(e.target.value)}
                        className={`shadow appearance-none border ${
                          formSubmitted && !expenseReason
                            ? "border-red-500"
                            : "border-gray-400"
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="amount"
                        className="block text-gray-700 text-sm font-bold mb-2 text-start"
                      >
                        المبلغ <span className="text-xl text-red-500 mt-4">*</span>
                      </label>
                      <input
                        id="amount"
                        type="number"
                        value={amount}
                        min={0}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`shadow appearance-none border ${
                          formSubmitted && !amount
                            ? "border-red-500"
                            : "border-gray-400"
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                      />
                    </div>
                    <div className="flex justify-between mt-4">
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
                        {isLoading?(
                          <Spinner/>
                        ):(
                          <AiOutlineSave className="ml-3" />
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

export default ExpensesForm;
