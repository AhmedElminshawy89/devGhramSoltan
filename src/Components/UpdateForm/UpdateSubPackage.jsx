import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "antd";
import {
  useSaveSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from "../../app/Feature/API/SubPackage";
import { useGetCategoriesQuery } from "../../app/Feature/API/Package";
import Spinner from "../../Shared/Spinner";

const UpdateSubPackage = ({
  isOpen,
  closeModal,
  initialValues,
  refetchSearch,
}) => {
  const {
    data: packageOptions,
    isLoading: packageLoading,
    error: packageError,
  } = useGetCategoriesQuery();
  const nameEdit = initialValues.item
  const [packageName, setPackageName] = useState(
    initialValues.category_id || ""
  );
  const [item, setItem] = useState(initialValues.item || "");
  const [price, setPrice] = useState(initialValues.price || "");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const [updateSubCategory, { isLoading: isUpdating }] =
    useUpdateSubCategoryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (packageName && item && price) {
      const updatedSubCategory = {
        id: initialValues.id,
        category_id: packageName,
        item,
        price,
      };

      try {
        const { data } = await updateSubCategory({
          id: initialValues.id,
          subCategoryData: updatedSubCategory,
        });

        setNotification({
          type: "success",
          message: "تم تحديث بيانات الخصم بنجاح!",
        });

        toast.success("تم تحديث بيانات الخصم بنجاح!");
        closeModal();
        resetForm();
        refetchSearch();
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
    setPackageName(initialValues.category_id || "");
    setItem(initialValues.item || "");
    setPrice(initialValues.price || "");
    setFormSubmitted(false);
    setNotification(null);
  };

  if (packageLoading) return <div>Loading...</div>;
  if (packageError) return <div>Error: {packageError.message}</div>;

  const uniquePackageOptions = Array.from(
    new Set(packageOptions.data?.map((pkg) => pkg.name))
  ).map((name) => packageOptions.data?.find((pkg) => pkg.name === name));

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
                    تعديل باكدج {nameEdit}
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
                  <form onSubmit={handleSubmit} className="mt-6">
                    <div className="mb-4">
                      <label
                        htmlFor="packageName"
                        className="block text-gray-700 text-sm font-bold mb-2 text-start"
                      >
                        اختيار باكدج
                      </label>
                      <select
                        id="packageName"
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
                        className={`block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline ${
                          formSubmitted && !packageName ? "border-red-500" : ""
                        }`}
                      >
                        <option value="">اختر باكدج</option>
                        {uniquePackageOptions.map((pkg) => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="item"
                        className="block text-gray-700 text-sm font-bold mb-2 text-start"
                      >
                        الصنف
                      </label>
                      <Input
                        id="item"
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                          formSubmitted && !item ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="price"
                        className="block text-gray-700 text-sm font-bold mb-2 text-start"
                      >
                        السعر
                      </label>
                      <Input
                        id="price"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                          formSubmitted && !price ? "border-red-500" : ""
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
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
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

export default UpdateSubPackage;
