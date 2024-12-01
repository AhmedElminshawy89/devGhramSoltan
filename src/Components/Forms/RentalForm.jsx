import React, { useState, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSaveRentsMutation } from "../../app/Feature/API/Rents";
import Spinner from "../../Shared/Spinner";
import { OnlineStatusContext } from "../../Provider/OnlineStatusProvider";
import { useDispatch, useSelector } from "react-redux";
import { addOfflineRent } from "../../app/Feature/offlineRentsSlice";
import { useGetAllRentsWithoutPaginationQuery } from "../../app/Feature/API/AdditionalRents";

const RentalForm = ({ isOpen, closeModal }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [insuranceType, setInsuranceType] = useState("");
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const { data:allRents } =useGetAllRentsWithoutPaginationQuery()
  const allCategories = [...new Set(allRents?.map((e) => e.name))]
  const [saveRent, { isLoading }] = useSaveRentsMutation();

  const isOnline = useContext(OnlineStatusContext);

  const dispatch = useDispatch();
  const offlineRents = useSelector((state) => state.offlineRents.rents) || [];

  // const allCategories = [
  //   "تاج",
  //   "هيربيز",
  //   "خاتم",
  //   "توينز",
  //   "طرحه",
  //   "عقد",
  //   "حلق",
  // ];
  const insuranceTypes = ["بطاقه", "كاش"];
  const statuses = ["تم الاسترجاع", "لم يتم الاسترجاع"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (name && categories.length > 0 && insuranceType && deposit) {
      const categoryString = categories.join(" و ");
      const newOfflineData = {
        id: Date.now(),
        name,
        category: categoryString,
        type_insurance: insuranceType,
        insurance: deposit,
        status: isOnline ? "لم يتم الاسترجاع" : status,
      };

      try {
        if (isOnline) {
          await saveRent({
            name,
            category: categoryString,
            type_insurance: insuranceType,
            insurance: deposit,
            status: "لم يتم الاسترجاع",
          }).unwrap();

          setNotification({
            type: "success",
            message: "تم حفظ البيانات بنجاح!",
          });
          toast.success("تم حفظ البيانات بنجاح!");
        } else {
          dispatch(addOfflineRent(newOfflineData));
          setNotification({
            type: "info",
            message: "تم حفظها محليًا وستتم مزامنتها عند استعادة الاتصال.",
          });
          toast.info("تم حفظها محليًا وستتم مزامنتها عند استعادة الاتصال.");
        }

        closeModal();
        resetForm();
      } catch (error) {
        dispatch(addOfflineRent(newOfflineData));
        setNotification({
          type: "error",
          message: "تم حفظها محليًا وستتم مزامنتها عند استعادة الاتصال.",
        });
        toast.error("تم حفظها محليًا وستتم مزامنتها عند استعادة الاتصال.");
        closeModal();
        resetForm();
      }
    } else {
      setNotification({ type: "error", message: "الرجاء ملء جميع الحقول!" });
      toast.error("الرجاء ملء جميع الحقول!");
    }
  };

  const resetForm = () => {
    setName("");
    setCategories([]);
    setInsuranceType("");
    setDeposit("");
    setStatus("");
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
                <Dialog.Panel className="w-full max-w-xl h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-start"
                  >
                    ايجار
                  </Dialog.Title>
                  <div className="mt-2 overflow-hidden h-full">
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
                    <form
                      className="grid grid-cols-1 gap-4"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="name"
                        >
                          الاسم <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`shadow appearance-none border ${
                            formSubmitted && !name
                              ? "border-red-500"
                              : "border-gray-400"
                          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="category"
                        >
                          النوع <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <Select
                          id="category"
                          value={categories.map((category) => ({
                            label: category,
                            value: category,
                          }))}
                          onChange={(selectedOptions) => {
                            const selectedCategories = selectedOptions.map(
                              (option) => option.value
                            );
                            setCategories(selectedCategories);
                          }}
                          options={allCategories.map((category) => ({
                            label: category,
                            value: category,
                          }))}
                          isMulti
                          className={`shadow ${
                            formSubmitted && categories.length === 0
                              ? "border-red-500"
                              : "border-gray-400"
                          } rounded`}
                          placeholder="اختر"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="insuranceType"
                        >
                          نوع التأمين <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <select
                          id="insuranceType"
                          value={insuranceType}
                          onChange={(e) => setInsuranceType(e.target.value)}
                          className={`block appearance-none w-full bg-white border ${
                            formSubmitted && !insuranceType
                              ? "border-red-500"
                              : "border-gray-400"
                          } hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline`}
                        >
                          <option value="">اختر نوع التأمين</option>
                          {insuranceTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="deposit"
                        >
                          {insuranceType === "كاش" ? "المبلغ" : "رقم البطاقه"} <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <input
                          id="deposit"
                          type="text"
                          value={deposit}
                          onChange={(e) => setDeposit(e.target.value)}
                          className={`shadow appearance-none border ${
                            formSubmitted && !deposit
                              ? "border-red-500"
                              : "border-gray-400"
                          } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        />
                      </div>
                      {!isOnline && (
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 text-start"
                            htmlFor="status"
                          >
                            الحالة 
                          </label> 
                          <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={`block appearance-none w-full bg-white border ${
                              formSubmitted && !status
                                ? "border-red-500"
                                : "border-gray-400"
                            } hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline`}
                          >
                            <option value="">اختر الحالة</option>
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
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
                        disabled={isLoading}
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

export default RentalForm;
