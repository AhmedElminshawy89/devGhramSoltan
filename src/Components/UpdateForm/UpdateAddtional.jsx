import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../Shared/Spinner";
import { useUpdateRentsMutation } from "../../app/Feature/API/AdditionalRents";

const UpdateAddtional = ({
  isOpen,
  closeModal,
  initialValues,
  refetchSubPackage
}) => {
  const [name, setName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const [updateCategory, { isLoading }] = useUpdateRentsMutation();

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
    }
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (name ) {
      const formData = new FormData();
      formData.append("id", String(initialValues.id));
      formData.append("name", name);

      try {
        await updateCategory({
          id: initialValues.id,
          rentData: formData,
        }).unwrap();

        toast.success("تم تحديث بيانات عنصر الايجار بنجاح!");
        closeModal();
        resetForm();
        refetchSubPackage();
      } catch (error) {
        console.error("حدث خطأ أثناء تحديث بيانات الاعلان:", error);
      }
    } else {
      setNotification({
        type: "error",
        message: "الرجاء ملء جميع الحقول!",
      });
    }
  };

  const resetForm = () => {
    setName("");
    setFormSubmitted(false);
    setNotification(null);
  };

  return (
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
                  تعديل علي عنصر الايجار 
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
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 text-start"
                      htmlFor="name"
                    >
                      الاسم<span className="text-xl text-red-500 mt-4">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        formSubmitted && !name ? "border-red-500" : ""
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
                        <>
                          <AiOutlineSave className="ml-3" /> حفظ
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateAddtional;
