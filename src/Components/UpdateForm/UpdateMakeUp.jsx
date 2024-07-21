import React, { useState, Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import Select from "react-select";
import { useGetCategoriesStudioQuery } from "../../app/Feature/API/Package";
import { useGetSubCategoriesBasedOnCategoryQuery } from "../../app/Feature/API/SubPackage";
import { InputNumber } from "antd";
import {
  useGetallDiscountsWithoutPaginationQuery,
  useGetDiscountsPriceQuery,
} from "../../app/Feature/API/Discount";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/Img/logo.png";
import { toast } from "react-toastify";
import { useSaveStudioMutation, useUpdateStudioMutation } from "../../app/Feature/API/Studio";
import Spinner from "../../Shared/Spinner";
import { useUpdateMakeupMutation } from "../../app/Feature/API/MakeUp";

const Invoice = React.forwardRef((props, ref) => {
  const {
    packageType,
    selectedPackageDetails,
    brideName,
    phone,
    city,
    eventDate,
    receiveDate,
    total,
    payment,
    remaining,
    discountName,
    additionalService,
    additionalServicePrice,
    discountRate,
    logo,
  } = props;

  return (
    <div
      ref={ref}
      style={{
        width: "80mm",
        padding: "10mm",
        fontFamily: "Arial, sans-serif",
        direction:'rtl'
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "30mm", height: "auto", margin: "0 auto" }}
        />
      </div>
      <div>
        <div
          style={{
            borderBottom: "1px solid #eee",
            padding: "4mm 0",
          }}
        >
          <p className="mb-1 text-lg">
            <strong>اسم العميل:</strong> {brideName}
          </p>
          <p className="mb-1 text-lg">
            <strong>رقم التليفون:</strong> {phone}
          </p>
          <p className="mb-1 text-lg">
            <strong>البلد:</strong> {city}
          </p>
          <p className="mb-1 text-lg">
            <strong>تاريخ اليوم:</strong>
            {new Date().toLocaleDateString("ar-EG")}
          </p>
          <p className="mb-1 text-lg">
            <strong>تاريخ المناسبة:</strong> {eventDate}
          </p>
          <p className="mb-1 text-lg">
            <strong>تاريخ الاستلام:</strong> {receiveDate}
          </p>
        </div>
        <div
          style={{
            padding: "4mm 0",
          }}
        >
          <p className="mb-1">
            <strong>نوع الباكدج:</strong> {packageType}
          </p>
          <p className="mb-1">
            <strong>مرتجع من الباكدج:</strong> {selectedPackageDetails.map((detail) => detail.label).join(', ')}
          </p>
          <p className="mb-1">
            <strong>خدمة إضافية:</strong> {additionalService}
          </p>
          <p className="mb-1">
            <strong>سعر الخدمة الإضافية:</strong> {additionalServicePrice}
          </p>
          <p className="mb-1">
            <strong>إجمالي :</strong> {total}
          </p>
          <p className="mb-1">
            <strong>المبلغ المدفوع:</strong> {payment}
          </p>
          <p className="mb-1">
            <strong>المبلغ المتبقي:</strong> {remaining}
          </p>
          <p className="mb-1">
            <strong>نوع الخصم:</strong> {discountName}
          </p>
          <p className="mb-1">
            <strong>قيمة الخصم:</strong> {discountRate}
          </p>
        </div>
      </div>
      <p className="mb-1 text-md text-center">
        <strong>في حاله الالغاء لا يسترد المبلغ المدفوع</strong>
      </p>
      <p className="mb-1 text-md text-center">
        <strong>يرجي الاحتفاظ بالايصال للمراجعه</strong>
      </p>
      <p className="mb-1 text-md text-center">
        <strong>العنوان:دسوق - شارع الجيش م:0106853310</strong>
      </p>
    </div>
  );
});

const UpdateMakeUp = ({ isOpen, closeModal, initialValues,refetchSearch }) => {
  const [discountType, setDiscountType] = useState("");
  const [discountName, setDiscountName] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const { data: ShowDiscountPrice } = useGetDiscountsPriceQuery(discountType);
  const { data: getAllDiscount } = useGetallDiscountsWithoutPaginationQuery("");
  const [packageType, setPackageType] = useState("");
  const { data: ShowSubCategory } = useGetSubCategoriesBasedOnCategoryQuery(packageType);
  const [selectedPackageDetails, setSelectedPackageDetails] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [brideName, setBrideName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [additionalService, setAdditionalService] = useState("");
  const [additionalServicePrice, setAdditionalServicePrice] = useState(0);
  const [allDiscounts, setAllDiscounts] = useState([]);
  const { data: showCategoryStudio } = useGetCategoriesStudioQuery("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [saveStudio2, { isLoading }] = useUpdateMakeupMutation();
  const invoiceRef = useRef();
  useEffect(() => {
    setSelectedPackageDetails([]);
    setDiscountType("");
  
    if (showCategoryStudio) {
      const uniqueCategories = showCategoryStudio.reduce((acc, current) => {
        const existing = acc.find((item) => item.name === current.name);
        if (!existing) {
          return [...acc, current];
        }
        return acc;
      }, []);
      setUniqueCategories(uniqueCategories);
  
      const selectedCategory = showCategoryStudio.find(
        (category) => category.id === initialValues.category_id
      );
      if (selectedCategory) {
        setCategoryName(selectedCategory.name);
      }
    }
  
    if (getAllDiscount && Array.isArray(getAllDiscount)) {
      const uniqueDiscounts = Array.from(
        new Set(getAllDiscount.map((item) => item.discount))
      ).map((discount) => {
        return getAllDiscount.find((item) => item.discount === discount);
      });
      setAllDiscounts(uniqueDiscounts);
  
      const selectedDiscount = getAllDiscount.find(
        (discount) => discount.id === initialValues.reason_discount_id
      );
      if (selectedDiscount) {
        setDiscountName(selectedDiscount.discount);
      }
    } else {
      console.error("getAllDiscount is not an array or is undefined/null.");
    }
  }, [showCategoryStudio, getAllDiscount, initialValues.category_id, initialValues.reason_discount_id]);
  
  


  useEffect(() => {
const notesString = initialValues.notes; 
const notesArray = notesString?.split(',').map((note) => ({
  label: note.trim(),
  value: note.trim(),
}));
    if (initialValues) {
      setPackageType(initialValues.category_id)
      setSelectedPackageDetails(notesArray?notesArray:[])
      setDiscountType(initialValues.reason_discount_id?initialValues.reason_discount_id:"")
      setBrideName(initialValues.name)
      setPhone(initialValues.phone)
      setCity(initialValues.address)
      setEventDate(initialValues.appropriate)
      setTotal(initialValues.total)
      setPayment(initialValues.pay)
      setRemaining(initialValues.rest)
      setAdditionalService(initialValues.addService?initialValues.addService:"")
      setAdditionalServicePrice(initialValues.priceService?initialValues.priceService:"")
    }
  }, [initialValues]);


  useEffect(() => {
    setRemaining(total - payment);
  }, [total, payment]);

  const discountRate = ShowDiscountPrice ? ShowDiscountPrice.price : "";

  const handleBrideNameChange = (e) => setBrideName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleEventDateChange = (e) => setEventDate(e.target.value);
  const handleReceiveDateChange = (e) => setReceiveDate(e.target.value);
  const handleTotalChange = (value) => setTotal(value);
  const handlePaymentChange = (value) => setPayment(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    if (brideName && phone && city && eventDate  && total) {
      if (!phone.match(phoneRegex)) {
        setNotification({
          type: "error",
          message: "يرجى إدخال رقم هاتف صحيح.",
        });
        return;
      }
      try {
        const formData = new FormData();
        formData.append('name', brideName);
        formData.append('phone', phone);
        formData.append('address', city);
        formData.append('appropriate', eventDate);
        formData.append('total', total);
        formData.append('pay', payment);
        formData.append('rest', remaining);
        await saveStudio2({
          id: initialValues.id,
          makeupData: formData,
        }).unwrap();
          setNotification({
            type: "success",
            message: "تم تحديث البيانات بنجاح!",
          });
          toast.success("تم تحديث البيانات بنجاح!");
          resetForm();
          closeModal();
          // handlePrint()
          refetchSearch();
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
  };
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
  const resetForm = () => {
    setBrideName("");
    setPhone("");
    setCity("");
    setEventDate("");
    setReceiveDate("");
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
                    تعديل حجز ميكاب
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
                             focus:outline-none focus:shadow-outline `}                          />
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
      <div style={{ display: "none" }}>
      <Invoice
        ref={invoiceRef}
        packageType={CategoryName}
        selectedPackageDetails={selectedPackageDetails}
        brideName={brideName}
        phone={phone}
        city={city}
        eventDate={eventDate}
        receiveDate={receiveDate}
        total={total}
        payment={payment}
        remaining={remaining}
        discountName={discountName}
        additionalService={additionalService}
        additionalServicePrice={additionalServicePrice}
        discountRate={discountRate}
        logo={logo}
      />
    </div>
    </div>
  );
};

export default UpdateMakeUp;
