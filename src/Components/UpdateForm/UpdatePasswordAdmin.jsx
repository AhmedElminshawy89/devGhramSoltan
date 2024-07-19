import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "antd";
import { useUpdatePasswordAdminMutation } from "../../app/Feature/API/Admin";
import Spinner from "../../Shared/Spinner";

const UpdatePasswordAdmin = ({ isOpen, closeModal ,initialValues,refetchSearch}) => {
  const [email, setEmail] = useState(initialValues.email||"");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const [updatePasswordAdmin, { isLoading }] = useUpdatePasswordAdminMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (email && password && confirmPassword) {
      if (password !== confirmPassword) {
        setNotification({
          type: "error",
          message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين.",
        });
        return;
      }

      const updatePassadmin = {
        email,
        password,
      };

      try {
        const { data } = await updatePasswordAdmin(updatePassadmin).unwrap();

        setNotification({
          type: "success",
          message: "تم تحديث كلمه المرور بنجاح!",
        });
        toast.success("تم تحديث كلمه المرور بنجاح!");
        closeModal();
        resetForm();
        refetchSearch();
      } catch (error) {
        console.error("حدث خطأ أثناء تحديث كلمه المرور:", error);
        setNotification({
          type: "error",
          message: "البريد الالكتروني خاطئ برجاء التاكد منه واعاده المحاوله",
        });
      }
    } else {
      setNotification({
        type: "error",
        message: "الرجاء ملء جميع الحقول بشكل صحيح!",
      });
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
                    تعديل كلمه المرور 
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
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="email"
                        >
                          البريد الإلكتروني <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <Input
                          id="email"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full ${
                            formSubmitted && !email ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="password"
                        >
                          كلمة المرور <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <Input.Password
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-full ${
                            formSubmitted && !password ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="confirmPassword"
                        >
                          تأكيد كلمة المرور <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <Input.Password
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full ${
                            formSubmitted && !confirmPassword
                              ? "border-red-500"
                              : ""
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
                          disabled={isLoading}
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

export default UpdatePasswordAdmin;
