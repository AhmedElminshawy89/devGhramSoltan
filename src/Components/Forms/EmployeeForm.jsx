import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "antd";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeForm = ({ isOpen, closeModal }) => {
  const [name, setName] = useState("");
  const [fingerprintNumber, setFingerprintNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    const salaryRegex = /^\d+(\.\d{1,2})?$/; // Regular expression for valid salary (decimal up to 2 places)

    if (name && fingerprintNumber && phone && salary) {
      if (!phone.match(phoneRegex)) {
        setNotification({
          type: "error",
          message: "يرجى إدخال رقم هاتف صالح.",
        });
        return;
      }

      if (!salary.match(salaryRegex)) {
        setNotification({
          type: "error",
          message: "يرجى إدخال راتب صالح.",
        });
        return;
      }

      console.log("Form submitted!");
      console.log({
        name,
        fingerprintNumber,
        phone,
        salary,
      });

      closeModal();
      setNotification({
        type: "success",
        message: "تم حفظ البيانات بنجاح!",
      });
      toast.success("تم حفظ البيانات بنجاح!");
      resetForm();
    } else {
      setNotification({
        type: "error",
        message: "الرجاء ملء جميع الحقول!",
      });
    }
  };

  const resetForm = () => {
    setName("");
    setFingerprintNumber("");
    setPhone("");
    setSalary("");
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
                    إضافة موظف جديد
                  </Dialog.Title>
                  <div className="mt-2">
                    {notification && (
                      <div
                        className={`mb-4 p-2 text-center ${
                          notification.type === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        } whitespace-nowrap`}
                      >
                        {notification.message}
                      </div>
                    )}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="name"
                        >
                          اسم الموظف
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full ${
                            formSubmitted && !name ? "border-red-500" : "border-gray-400"
                          }`}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="fingerprintNumber"
                        >
                          رقم البصمة
                        </label>
                        <Input
                          id="fingerprintNumber"
                          type="number"
                          value={fingerprintNumber}
                          onChange={(e) => setFingerprintNumber(e.target.value)}
                          className={`w-full ${
                            formSubmitted && !fingerprintNumber ? "border-red-500" : "border-gray-400"
                          }`}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="phone"
                        >
                          رقم التليفون
                        </label>
                        <Input
                          id="phone"
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full ${
                            formSubmitted && !phone ? "border-red-500" : "border-gray-400"
                          }`}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="salary"
                        >
                          الراتب
                        </label>
                        <Input
                          id="salary"
                          type="text"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          className={`w-full ${
                            formSubmitted && !salary ? "border-red-500" : "border-gray-400"
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
                          <AiOutlineSave className="ml-3" /> حفظ
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

export default EmployeeForm;
