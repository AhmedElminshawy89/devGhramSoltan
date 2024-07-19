import React, { useState, Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { useGetCategoriesStudioQuery } from "../../app/Feature/API/Package";
import { InputNumber } from "antd";
import { toast } from "react-toastify";
import { useUpdateStudioMutation } from "../../app/Feature/API/Studio";
import { useUpdateMakeupMutation } from "../../app/Feature/API/MakeUp";
import Spinner from "../../Shared/Spinner";


const UpdateStudioDaily = ({ isOpen, closeModal, initialValues,refetchSearch,refetchEmployees }) => {
// console.log(initialValues.category_id)
  const [discountType, setDiscountType] = useState("");
  const [discountName, setDiscountName] = useState("");
  const [packageType, setPackageType] = useState("");
  const [selectedPackageDetails, setSelectedPackageDetails] = useState([]);
  const [brideName, setBrideName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  const [enter, setEnter] = useState("");
  const [exit, setExit] = useState("");
  const [arrive, setArrive] = useState("");
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [additionalService, setAdditionalService] = useState("");
  const [additionalServicePrice, setAdditionalServicePrice] = useState(0);
  const [allDiscounts, setAllDiscounts] = useState([]);
const [setUniqueCategories] = useState([])
  const { data: showCategoryStudio } = useGetCategoriesStudioQuery("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [saveStudio2, { isLoading }] = useUpdateStudioMutation();

  useEffect(() => {
    if (initialValues) {
      setPackageType(initialValues.category_id)
      setDiscountType(initialValues.reason_discount)
      setBrideName(initialValues.name)
      setPhone(initialValues.phone)
      setCity(initialValues.address)
      setEventDate(initialValues.appropriate)
      setReceiveDate(initialValues.receivedDate)
      setTotal(initialValues.total)
      setPayment(initialValues.pay)
      setRemaining(initialValues.rest)
      setAdditionalService(initialValues.addService)
      setAdditionalServicePrice(initialValues.priceService)
    }
  }, [initialValues]);

  console.log('packageType',packageType)
  useEffect(() => {
    setRemaining(total - payment);
  }, [total, payment]);


  const handleBrideNameChange = (e) => setBrideName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleEventDateChange = (e) => setEventDate(e.target.value);
  const handleTotalChange = (value) => setTotal(value);
  const handlePaymentChange = (value) => setPayment(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
  
    if (packageType && brideName && phone && city && receiveDate &&eventDate && total) {
      if (!phone.match(phoneRegex)) {
        setNotification({
          type: "error",
          message: "يرجى إدخال رقم هاتف صحيح.",
        });
        return;
      }
  
      const notes = selectedPackageDetails.map((detail) => detail.label).join(', ');
  
      try {
        const formData2 = new FormData();
        formData2.append('category_id', packageType);
        formData2.append('name', brideName);
        formData2.append('phone', phone);
        formData2.append('address', city);
        formData2.append('appropriate', eventDate);
        formData2.append('receivedDate', receiveDate);
        formData2.append('total', total);
        formData2.append('pay', payment);
        formData2.append('rest', remaining);
        formData2.append('enter', enter);
        formData2.append('arrive', arrive);
        formData2.append('exit', exit);
  
        await saveStudio2({
          id: initialValues.id,
          studioData: formData2,
        }).unwrap();
  
        setNotification({
          type: "success",
          message: "تم تحديث البيانات بنجاح!",
        });
        toast.success("تم تحديث البيانات بنجاح!");
        resetForm();
        closeModal();
        refetchSearch()
        refetchEmployees();
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
    console.log(discountName);
  };
  


  const resetForm = () => {
    setBrideName("");
    setPhone("");
    setCity("");
    setEventDate("");
    setReceiveDate("");
    setExit("")
    setArrive("")
    setEnter("")
    setTotal(0);
    setPayment(0);
    setRemaining(0);
    setDiscountType("");
    setAdditionalService("");
    setAdditionalServicePrice(0);
    setFormSubmitted(false);

    const formElements = document.getElementsByClassName("ant-input");
    for (let element of formElements) {
      element.classList.remove("border-red-500");
    }

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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-start"
                  >
                    تعديل حجز استوديو
                  </Dialog.Title>
                  <div className="mt-2 overflow-y-auto overflow-x-hidden h-full">
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
                      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="brideName"
                        >
                          اسم العروسة<span className="text-xl text-red-500">*</span>
                        </label>
                        <input
                          id="brideName"
                          type="text"
                          value={brideName}
                          onChange={handleBrideNameChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="phone"
                        >
                          رقم الهاتف <span className="text-xl text-red-500">*</span>
                        </label>
                        <input
                          id="phone"
                          type="text"
                          value={phone}
                          onChange={handlePhoneChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="city"
                        >
                          المدينة<span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <input
                          id="city"
                          type="text"
                          value={city}
                          onChange={handleCityChange}
                          className={`shadow appearance-none
                           border rounded w-full py-2 px-3 text-gray-700
                            leading-tight focus:outline-none focus:shadow-outline
                            ${
                              formSubmitted && !city
                                ? "border-red-500"
                                : ""
                            } `}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="eventDate"
                        >
                          تاريخ المناسبة <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <input
                          id="eventDate"
                          type="date"
                          value={eventDate}
                          onChange={handleEventDateChange}
                          className={`shadow appearance-none border rounded 
                          w-full py-2 px-3 text-gray-700 leading-tight
                           focus:outline-none focus:shadow-outline
                           ${
                            formSubmitted && !eventDate
                              ? "border-red-500"
                              : ""
                          } `}
                        />
                      </div>
                      <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 text-start"
                            htmlFor="receiveDate"
                          >
                            تاريخ الاستلام <span className="text-xl text-red-500 mt-4">*</span>
                          </label>
                          <input
                            id="receiveDate"
                            type="date"
                            value={receiveDate}
                            onChange={(e)=>setReceiveDate(e.target.value)}
                            className={`shadow appearance-none border 
                            rounded w-full py-2 px-3 text-gray-700 leading-tight
                             focus:outline-none focus:shadow-outline
                             ${
                              formSubmitted && !receiveDate
                                ? "border-red-500"
                                : ""
                            } `}
                          />
                        </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="time"
                        >
                          معاد الدخول <span className="text-xl text-white mt-4">*</span>
                        </label>
                        <input
                          id="time"
                          type="time"
                          value={enter}
                          onChange={(e)=>setEnter(e.target.value)}
                          className={`shadow appearance-none border rounded 
                          w-full py-2 px-3 text-gray-700 leading-tight
                           focus:outline-none focus:shadow-outline
                         `}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="time2"
                        >
                          معاد الخروج  <span className="text-xl text-white mt-4">*</span>
                        </label>
                        <input
                          id="time2"
                          type="time"
                          value={exit}
                          onChange={(e)=>setExit(e.target.value)}
                          className={`shadow appearance-none border rounded 
                          w-full py-2 px-3 text-gray-700 leading-tight
                           focus:outline-none focus:shadow-outline
                         `}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="time2"
                        >
                          معاد الوصول <span className="text-xl text-white mt-4">*</span>
                        </label>
                        <input
                          id="time2"
                          type="time"
                          value={arrive}
                          onChange={(e)=>setArrive(e.target.value)}
                          className={`shadow appearance-none border rounded 
                          w-full py-2 px-3 text-gray-700 leading-tight
                           focus:outline-none focus:shadow-outline
                         `}
                        />
                      </div>
                      {/* <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="receiveDate"
                        >
                          تاريخ الاستلام <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <input
                          id="receiveDate"
                          type="date"
                          value={receiveDate}
                          onChange={handleReceiveDateChange}
                          className={`shadow appearance-none border 
                          rounded w-full py-2 px-3 text-gray-700 leading-tight
                           focus:outline-none focus:shadow-outline
                           ${
                            formSubmitted && !receiveDate
                              ? "border-red-500"
                              : ""
                          } `}
                        />
                      </div> */}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="total"
                        >
                          الإجمالي <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <InputNumber
                          id="total"
                          value={total}
                          onChange={handleTotalChange}
                          className={`shadow appearance-none border
                           rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline
                            ${
                              formSubmitted && !total
                                ? "border-red-500"
                                : ""
                            } `}
                          readOnly
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="payment"
                        >
                          الدفعة المقدمة <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <InputNumber
                          id="payment"
                          value={payment}
                          onChange={handlePaymentChange}
                          className={`shadow appearance-none border
                            rounded w-full py-2 px-3 text-gray-700 leading-tight
                             focus:outline-none focus:shadow-outline
                             ${
                               formSubmitted && !payment
                                 ? "border-red-500"
                                 : ""
                             } `}                          />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="remaining"
                        >
                          المبلغ المتبقي <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <InputNumber
                          id="remaining"
                          value={remaining}
                          className={`shadow appearance-none border
                            rounded w-full py-2 px-3 text-gray-700 leading-tight
                             focus:outline-none focus:shadow-outline `}                            readOnly
                        />
                      </div>
                      {/* <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="discount"
                        >
                          خصم <span className="text-xl text-white mt-4">*</span>
                        </label>
                        <select
                          id="discount"
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) => {
                            setDiscountType(e.target.value);
                          }}
                          value={discountType}
                        >
                          <option value="">اختر الخصم</option>
                          {allDiscounts.map((discount) => (
                            <option key={discount.id} value={discount.id}>
                              {discount.discount}
                            </option>
                          ))}
                        </select>
                      </div>
                      {discountType && (
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 text-start"
                            htmlFor="discountRate"
                          >
                            قيمة الخصم <span className="text-xl text-white mt-4">*</span>
                          </label>
                          <InputNumber
                            id="discountRate"
                            value={ShowDiscountPrice ? ShowDiscountPrice.price : ""}
                            readOnly
                            min={0}
                            max={10000}
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                      )} */}
                      <br/>
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
    </div>
  );
};

export default UpdateStudioDaily;
