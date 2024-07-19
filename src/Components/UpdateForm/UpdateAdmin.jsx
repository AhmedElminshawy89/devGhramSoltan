import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "antd";
import { useUpdateAdminMutation } from "../../app/Feature/API/Admin";
import Spinner from "../../Shared/Spinner";

const UpdateAdmin = ({ isOpen, closeModal, initialValues ,refetchSearch}) => {
  const [name, setName] = useState(initialValues.name || "");
  const [email, setEmail] = useState(initialValues.email || "");
  const [phone, setPhone] = useState(initialValues.phone || "");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [adminType, setAdminType] = useState(initialValues.type || "");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    if (
      name &&
      email &&
      phone &&
      adminType
      //  &&
      // password &&
      // password === confirmPassword
    ) {
      if (!phone.match(phoneRegex)) {
        setNotification({
          type: "error",
          message: "يرجى إدخال رقم هاتف صحيح.",
        });
        return;
      }

      // Validate other fields as needed

      const updatedAdmin = {
        id: initialValues.id,
        name,
        email,
        phone,
        type: adminType,
        // password,
      };

      try {
        const response = await updateAdmin({
          id: initialValues.id,
          adminData: updatedAdmin,
        });
        if (response.error) {
          setNotification({
            type: "error",
            message: response.error.message || "البريد الالكتروني موجود بالفعل قم بوضع بريد الكتروني اخر",
          })}else{
            setNotification({
              type: "success",
              message: "تم تحديث بيانات الأدمن بنجاح!",
            });
            toast.success("تم تحديث بيانات الأدمن بنجاح!");
            closeModal();
            resetForm();
            refetchSearch()
          }
      } catch (error) {
        console.error("حدث خطأ أثناء تحديث بيانات الأدمن:", error);
        setNotification({
          type: "error",
          message:  "البريد الالكتروني موجود بالفعل قم بوضع بريد الكتروني اخر",
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
    setName(initialValues.name || "");
    setEmail(initialValues.email || "");
    setPhone(initialValues.phone || "");
    setAdminType(initialValues.type || "");
    // setPassword("");
    // setConfirmPassword("");
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
                    تعديل بيانات {initialValues.name}
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
                          htmlFor="name"
                        >
                          الاسم <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full ${
                            formSubmitted && !name ? "border-red-500" : ""
                          }`}
                        />
                      </div>
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
                          htmlFor="phone"
                        >
                          رقم التليفون <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <Input
                          id="phone"
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full ${
                            formSubmitted && !phone ? "border-red-500" : ""
                          }`}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="adminType"
                        >
                          نوع الأدمن <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <select
                          id="adminType"
                          value={adminType}
                          onChange={(e) => setAdminType(e.target.value)}
                          className={`block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline ${
                            formSubmitted && !adminType ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">اختر نوع الأدمن</option>
                          <option value="admin">تحكم جزئي</option>
                          <option value="super_admin">تحكم كامل</option>
                        </select>
                      </div>
                      {/* <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="password"
                        >
                          كلمة المرور
                        </label>
                        <Input.Password
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-full ${
                            formSubmitted &&
                            password &&
                            password !== confirmPassword
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="confirmPassword"
                        >
                          تأكيد كلمة المرور
                        </label>
                        <Input.Password
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full ${
                            formSubmitted &&
                            confirmPassword &&
                            password !== confirmPassword
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div> */}
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

export default UpdateAdmin;
