import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpensesForm = ({ isOpen, closeModal }) => {
    const [employeeName, setEmployeeName] = useState("");
    const [expenseReason, setExpenseReason] = useState("");
    const [amount, setAmount] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (employeeName && expenseReason && amount) {
            console.log("Form submitted!");
            console.log({
                employeeName,
                expenseReason,
                amount
            });
            closeModal();
            setNotification({ type: "success", message: "تم حفظ البيانات بنجاح!" });
            toast.success('تم حفظ البيانات بنجاح!');
            resetForm();
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
                                        المصروفات
                                    </Dialog.Title>
                                    {notification && (
                                        <div className={`mt-2 mb-2 p-2 text-center ${notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                            } whitespace-nowrap`}>
                                            {notification.message}
                                        </div>
                                    )}
                                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label
                                                htmlFor="employeeName"
                                                className="block text-gray-700 text-sm font-bold mb-2 text-start"
                                            >
                                                الجهة
                                            </label>
                                            <input
                                                id="employeeName"
                                                type="text"
                                                value={employeeName}
                                                onChange={(e) => setEmployeeName(e.target.value)}
                                                className={`shadow appearance-none border ${formSubmitted && !employeeName ? "border-red-500" : "border-gray-400"
                                                    } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="expenseReason"
                                                className="block text-gray-700 text-sm font-bold mb-2 text-start"
                                            >
                                                سبب الصرف
                                            </label>
                                            <input
                                                id="expenseReason"
                                                type="text"
                                                value={expenseReason}
                                                onChange={(e) => setExpenseReason(e.target.value)}
                                                className={`shadow appearance-none border ${formSubmitted && !expenseReason ? "border-red-500" : "border-gray-400"
                                                    } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="amount"
                                                className="block text-gray-700 text-sm font-bold mb-2 text-start"
                                            >
                                                المبلغ
                                            </label>
                                            <input
                                                id="amount"
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className={`shadow appearance-none border ${formSubmitted && !amount ? "border-red-500" : "border-gray-400"
                                                    } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                            />
                                        </div>
                                        <div className="flex justify-between mt-4">
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
                                                <AiOutlineSave className="ml-3" /> حفظ
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
