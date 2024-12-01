import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSaveCategoryMutation } from "../../app/Feature/API/Package";
import Spinner from "../../Shared/Spinner";

const PackageForm = ({ isOpen, closeModal }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const [saveCategory, { isLoading }] = useSaveCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (name && price && category && desc && photo) {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("type", category);
        formData.append("desc", desc);
        formData.append("photo", photo);
        formData.append("status", "off");

        await saveCategory(formData);


        closeModal();
        setNotification({
          type: "success",
          message: "تم حفظ البيانات بنجاح!",
        });
        toast.success("تم حفظ البيانات بنجاح!");
        resetForm();
      } catch (error) {
        console.error("Error saving package:", error);
        setNotification({
          type: "error",
          message: "حدث خطأ أثناء حفظ البيانات!",
        });
        toast.error("حدث خطأ أثناء حفظ البيانات!");
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
    setPrice("");
    setCategory("");
    setDesc("");
    setPhoto(null);
    setPhotoURL("");
    setFormSubmitted(false);
    setNotification(null);
  };

  useEffect(() => {
    if (photo) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPhotoURL(fileReader.result);
      };
      fileReader.readAsDataURL(photo);
    } else {
      setPhotoURL("");
    }
  }, [photo]);

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
                    إضافة باكدج
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
                        اسم الباكدج <span className="text-xl text-red-500 mt-4">*</span>
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
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 text-start"
                        htmlFor="price"
                      >
                        سعر الباكدج <span className="text-xl text-red-500 mt-4">*</span>
                      </label>
                      <input
                        id="price"
                        type="number"
                        min={0}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                          formSubmitted && !price ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 text-start"
                        htmlFor="category"
                      >
                        نوع الباكدج <span className="text-xl text-red-500 mt-4">*</span>
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline ${
                          formSubmitted && !category ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">اختر الباكدج</option>
                        <option value="ميكاب">ميكاب</option>
                        <option value="استوديو">استوديو</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 text-start"
                        htmlFor="desc"
                      >
                        وصف الباكدج <span className="text-xl text-red-500 mt-4">*</span>
                      </label>
                      <textarea
                        id="desc"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                          formSubmitted && !desc ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 text-start"
                        htmlFor="photo"
                      >
                        صورة الباكدج <span className="text-xl text-red-500 mt-4">*</span>
                      </label>
                      <input
                        id="photo"
                        type="file"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                          formSubmitted && !photo ? "border-red-500" : ""
                        }`}
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                      />
                    </div>
                    {photoURL && (
                      <div className="mb-4">
                        <img
                          src={photoURL}
                          alt="Preview"
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    )}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PackageForm;
