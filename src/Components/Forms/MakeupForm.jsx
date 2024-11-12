import React, { useState, Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import Select from "react-select";
import { useGetCategoriesMakeUpQuery } from "../../app/Feature/API/Package";
import { useGetSubCategoriesBasedOnCategoryQuery } from "../../app/Feature/API/SubPackage";
import { InputNumber } from "antd";
import {
  useGetallDiscountsWithoutPaginationQuery,
  useGetDiscountsPriceQuery,
} from "../../app/Feature/API/Discount";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/Img/logo.png";
import { toast } from "react-toastify";
import Spinner from "../../Shared/Spinner";
import { useSaveMakeupMutation } from "../../app/Feature/API/MakeUp";
import { useGetMakeUpDailyQuery } from "../../app/Feature/API/Daily";
import qrcode from '../../assets/Img/qrcode.png';

const convertTo12HourFormat = (time) => {
  const convertToArabicNumbers = (num) => {
    const arabicDigits = '٠١٢٣٤٥٦٧٨٩';
    return num.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');
  };

  if (typeof time !== 'string' || !time.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)) {
    return '!! الوقت غير صحيح';
  }

  let [hours, minutes, seconds] = time.split(':').map(Number);
  let period = hours >= 12 ? 'م' : 'ص';
  hours = hours % 12 || 12;

  return `${convertToArabicNumbers(hours)}:${convertToArabicNumbers(minutes < 10 ? '0' + minutes : minutes)}:${convertToArabicNumbers(seconds < 10 ? '0' + seconds : seconds)} ${period}`;
};

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
    dateService,
    discountRate,
    secOther,
    secOtherDate,
    secOtherPrice,
    logo
  } = props;

const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

const now = new Date();
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

return (
  <div
    ref={ref}
    style={{
      // width: "80mm",
      padding: "10mm",
      fontFamily: "Arial, sans-serif",
      direction: 'rtl',
       textAlign: "center"
    }}
  >
        <div         style={{
        display:'flex', justifyContent:'center',
        alignItems: 'center'

        }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "30mm", height: "auto", marginBottom: "2px" }}
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
          <strong>تاريخ المناسبة:</strong>{" "}
          {isValidDate(new Date(eventDate)) ? new Date(eventDate).toLocaleDateString('ar-EG') : "تاريخ غير صالح"}
        </p>
        <p className="mb-1">
          <strong>تاريخ اليوم:</strong> {now.toLocaleDateString('ar-EG', options)}
        </p>
        <p className="mb-1">
          <strong>الوقت:</strong> {now.toLocaleTimeString('ar-EG')}
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
          <strong>مرتجع من الباكدج:</strong>{" "}
          {selectedPackageDetails.map((detail) => detail.label).join(', ')}
        </p>
        <p className="mb-1">
          <strong>خدمة إضافية:</strong> {additionalService}
        </p>
        <p className="mb-1">
          <strong>سعر الخدمة الإضافية:</strong>{" "}
          {`${additionalServicePrice ? `${additionalServicePrice.toLocaleString('ar-EG')} جنيه` : ''}`}
          </p>
          {dateService && (
                    <p className="mb-1">
                    <strong>تاريخ الخدمة الإضافية:</strong>{" "}
                    {isValidDate(new Date(dateService)) ? new Date(dateService).toLocaleDateString('ar-EG') : "تاريخ غير صالح"}
                    </p>
          )}
          {secOther && (
          <p className="mb-1">
          <strong>نوع القسم الاخر:</strong>{" "}
          {secOther}
          </p>
          )}
          {secOtherPrice && (
          <p className="mb-1">
          <strong>سعر القسم الاخر:</strong>{" "}
          {secOtherPrice}
          </p>
          )}
          
            {secOtherDate && (
          <p className="mb-1">
          <strong>تاريخ القسم الاخر:</strong>{" "}
          {secOtherDate}
          </p>
          )}
        <p className="mb-1">
          <strong>إجمالي :</strong> {`${total.toLocaleString('ar-EG')} جنيه`}
        </p>
        <p className="mb-1">
          <strong>المبلغ المدفوع:</strong>{" "}
          {`${payment ? `${payment.toLocaleString('ar-EG')} جنيه` : ''}`}
          </p>
        <p className="mb-1">
          <strong>المبلغ المتبقي:</strong>{" "}
          {`${remaining ? `${remaining.toLocaleString('ar-EG')} جنيه` : ''}`}
        </p>
        <p className="mb-1">
          <strong>نوع الخصم:</strong> {discountName?discountName:""}
        </p>
        <p className="mb-1">
          <strong>قيمة الخصم:</strong>{" "}
          {`${discountRate ? `${discountRate.toLocaleString('ar-EG')} جنيه` : ''}`}
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
      <strong>العنوان: دسوق - شارع الجيش <br/> م: 0472570908</strong>
    </p>
    <div className="mt-2 border-t pt-[5px]">
        <p className="text-xl flex items-center justify-center gap-1 " style={{ textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>
          <strong>
            تم تصميم وتطوير هذه المنصة بواسطة Coding Corner
          </strong>
          <img src={qrcode} alt="qr-code" className="w-[50px] h-[50px] object-cover"/>
        </p>
      </div>
  </div>
);
});


const MakeupForm = ({ isOpen, closeModal }) => {

  const [discountType, setDiscountType] = useState("");
  const [henaDate, setHenaDate] = useState("");
  const [secOther, setSecOther] = useState("");
  const [secOtherPrice, setSecOtherPrice] = useState("");
  const [secOtherDate, setSecOtherDate] = useState("");
  const [henaFound, setHenaFound] = useState(false);
  const { data: ShowDiscountPrice } = useGetDiscountsPriceQuery(discountType&&discountType.value);
  const { data: getAllDiscount } = useGetallDiscountsWithoutPaginationQuery("");
  const [packageType, setPackageType] = useState("");
  const { data: ShowSubCategory } = useGetSubCategoriesBasedOnCategoryQuery(packageType&&packageType.value);
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
  const { data: showCategoryStudio } = useGetCategoriesMakeUpQuery("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [saveStudio, { isLoading }] = useSaveMakeupMutation();
  const {refetch: refetchMakeupDaily } = useGetMakeUpDailyQuery();

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
    }

    if (getAllDiscount && Array.isArray(getAllDiscount)) {
      const uniqueDiscounts = Array.from(
        new Set(getAllDiscount.map((item) => item.discount))
      ).map((discount) => {
        return getAllDiscount.find((item) => item.discount === discount);
      });
      setAllDiscounts(uniqueDiscounts);
    } else {
      console.error("getAllDiscount is not an array or is undefined/null.");
    }
  }, [showCategoryStudio, getAllDiscount,packageType]);

  useEffect(() => {
    const calculateTotal = () => {
      let totalPrice = 0;
  
      const subCategoryPrices = ShowSubCategory
        ? [...new Set(ShowSubCategory.map((pckg) => Number(pckg.category.price) || 0))]
        : [];
      const TotalPackage = subCategoryPrices.reduce((acc, price) => acc + price, 0);
      totalPrice += TotalPackage;
  
      if (additionalServicePrice) {
        totalPrice += Number(additionalServicePrice) || 0;
      }
  
      const selectedPackage = uniqueCategories.find(
        (pkg) => pkg.id === packageType
      );
      if (selectedPackage) {
        totalPrice -= Number(selectedPackage.price) || 0;
      }
  
      selectedPackageDetails.forEach((detail) => {
        const subCategory = ShowSubCategory.find(
          (sub) => sub.id === detail.value
        );
        if (subCategory) {
          totalPrice -= Number(subCategory.price) || 0;
        }
      });
  
      if (discountType && ShowDiscountPrice?.price) {
        totalPrice -= Number(ShowDiscountPrice.price) || 0;
      }
      if (secOtherPrice) {
        totalPrice += Number(secOtherPrice) || 0;
      }
  
      setTotal(totalPrice);
    };
  
    calculateTotal();
  }, [packageType, selectedPackageDetails, additionalServicePrice, ShowDiscountPrice, uniqueCategories, ShowSubCategory, discountType, secOtherPrice]);
  
  useEffect(() => {
    setRemaining(Number(total) - Number(payment) || 0);
  }, [total, payment]);
  
  useEffect(()=>{
    if(henaFound===true){
      return
    }else{
      setHenaDate("")
    }
  },[henaFound])

  const discountRate = ShowDiscountPrice ? ShowDiscountPrice.price : "";

  const handleBrideNameChange = (e) => setBrideName(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleCityChange = (e) => setCity(e.target.value);
  const handleEventDateChange = (e) => setEventDate(e.target.value);
  const handleHenaDateChange = (e) => setHenaDate(e.target.value);
  const handleTotalChange = (value) => setTotal(value);
  const handlePaymentChange = (value) => setPayment(value);
  const handleAdditionalServiceChange = (e) => setAdditionalService(e.target.value);
  const handleAdditionalServicePriceChange = (value) => setAdditionalServicePrice(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    if (packageType && brideName && phone && city && eventDate  && total) {
      if (!phone.match(phoneRegex)) {
        setNotification({
          type: "error",
          message: "يرجى إدخال رقم هاتف صحيح.",
        });
        return;
      }
      const notes = selectedPackageDetails.map((detail) => ({
        key: detail.label,
        value: detail.value
      }));   
      try {
        const response = await saveStudio({
          category_id:packageType&&packageType.value,
          notes,
          name:brideName,
          phone:phone,
          address:city,
          appropriate:eventDate,
          total,
          pay:payment,
          rest:remaining,
          reason_discount_id:discountType&&discountType.value,
          addService:additionalService,
          priceService:additionalServicePrice,
          price:discountRate,
          dateService:henaDate,
          typeHair:secOther,
          priceHair:secOtherPrice,
          dateHair:secOtherDate,
        });

        if (response.error) {
          setNotification({
            type: "error",
            message: response.error.message || "حدث خطأ أثناء حفظ البيانات.",
          });
        } else {
          setNotification({
            type: "success",
            message: "تم حفظ البيانات بنجاح!",
          });
          toast.success("تم حفظ البيانات بنجاح!");
          resetForm();
          handlePrint();
          closeModal();
          refetchMakeupDaily()
        }
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

  const handleDetailSelection = (selectedOptions) => {
    setSelectedPackageDetails(selectedOptions);
  };

  const resetForm = () => {
    setBrideName("");
    setPhone("");
    setCity("");
    setEventDate("");
    setTotal(0);
    setPayment(0);
    setRemaining(0);
    setDiscountType("");
    setAdditionalService("");
    setAdditionalServicePrice(0);
    setFormSubmitted(false);
    setPackageType('')
    setSelectedPackageDetails([])
    setFormSubmitted(false);
    setHenaDate('')
    setHenaFound(false);
    setSecOther('')
    setSecOtherDate('')
    setSecOtherPrice('')

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
                    حجز ميكاب
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
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" >
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="category"
                        >
                          نوع الباكدج <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <Select
                      id="category"
                            value={packageType}
                            onChange={(e) => {
                              setPackageType(e);
                            }}
                      options={
                        uniqueCategories&&uniqueCategories.map((cta) => ({
                            label:`${cta.name} - ${cta.price.toLocaleString("ar-EG")} جنيه`,
                            value:cta.id,
                        }))
                      }
                      className={`shadow ${
                        formSubmitted && !packageType ? "border-red-500" : "border-gray-400"
                      } rounded`}
                      placeholder="اختر اسم الباكدج"
                    />
                      </div>
                      {packageType && (
                        <>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2 text-start"
                              htmlFor="packageDetails"
                            >
                              مرتجع من الباكدج <span className="text-xl text-white mt-4">*</span>
                            </label>
                            <Select
                              options={
                                ShowSubCategory?.map((subCategory) => ({
                                  value: subCategory.id,
                                  label: subCategory.item,
                                })) || []
                              }
                              isMulti
                              placeholder="اختر"
                              value={selectedPackageDetails}
                              onChange={handleDetailSelection}
                            />
                          </div>
                        </>
                      )}
                      {packageType && (
                        <>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2 text-start"
                              htmlFor="additionalService"
                            >
                              خدمة إضافية <span className="text-xl text-white mt-4">*</span>
                            </label>
                            <input
                              id="additionalService"
                              type="text"
                              value={additionalService}
                              onChange={handleAdditionalServiceChange}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                          </div>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2 text-start"
                              htmlFor="additionalServicePrice"
                            >
                              سعر الخدمة الإضافية <span className="text-xl text-white mt-4">*</span>
                            </label>
                            <InputNumber
                              id="additionalServicePrice"
                              value={additionalServicePrice}
                              onChange={handleAdditionalServicePriceChange}
                              min={0}
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                          </div>
                        </>
                      )}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="brideName"
                        >
                          اسم العميل<span className="text-xl text-red-500">*</span>
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
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="discount"
                        >
                          خصم <span className="text-xl text-white mt-4">*</span>
                        </label>
                        <Select
id="discount"
value={discountType}
onChange={(e) => {
  setDiscountType(e ? e : null);
}}
options={
  allDiscounts && allDiscounts.map((discount) => ({
    label: `${discount.discount}`,
    value: discount.id,
  }))
}
className={`shadow ${
  formSubmitted && !discountType ? "border-red-500" : "border-gray-400"
} rounded`}
placeholder="اختر الخصم"
isClearable
/>
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
                      )}
                      <div className="mb-4 flex items-center">
                              <input
                                id="hena"
                                type="checkbox"
                                checked={henaFound}
                                onChange={(e) => setHenaFound(e.target.checked)}
                              />
                              <label
                                className="block text-gray-700 text-xl font-bold mb-2 text-start"
                                htmlFor="hena"
                              >
                                هل يوجد حنه ام لا؟
                              </label>
                            </div>  
                            {henaFound&&(
                              <div className="mb-4">
                                <label
                                  className="block text-gray-700 text-sm font-bold mb-2 text-start"
                                  htmlFor="hena"
                                >
                                  تاريخ الحنة
                                </label>
                                <input
                                  id="hena"
                                  type="date"
                                  value={henaDate}
                                  onChange={handleHenaDateChange}
                                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                />
                              </div>
                            )}                  
                       <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="sec"
                        >
                           اسم القسم الاخر 
                        </label>
                        <input
                          id="sec"
                          value={secOther}
                          onChange = {(e)=>setSecOther(e.target.value)}
                          className={`shadow appearance-none border
                            rounded w-full py-2 px-3 text-gray-700 leading-tight
                             focus:outline-none focus:shadow-outline `}  
                        />
                      </div>
                    
                       <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="sec"
                        >
                           تاريخ القسم الاخر 
                        </label>
                        <input
                          id="sec"
                          value={secOtherDate}
                          onChange={(e)=>setSecOtherDate(e.target.value)}
                          type="date"
                          className={`shadow appearance-none border
                            rounded w-full py-2 px-3 text-gray-700 leading-tight
                             focus:outline-none focus:shadow-outline `}  
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="sec"
                        >
                          سعر القسم الاخر 
                        </label>
                        <InputNumber
                          id="sec"
                          value={secOtherPrice}
                          onChange={(value) => setSecOtherPrice(value)}
                          className={`shadow appearance-none border
                            rounded w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline`}  
                        />
                      </div>
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
                        {isLoading ? (
                          <Spinner />
                        ) : (
                          <>
                            <AiOutlineSave className="ml-1" />
                            حفظ
                          </>
                        )}
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
        packageType={packageType.label}
        selectedPackageDetails={selectedPackageDetails}
        brideName={brideName}
        phone={phone}
        city={city}
        eventDate={eventDate}
        receiveDate={receiveDate}
        total={total}
        payment={payment}
        remaining={remaining}
        discountName={discountType&&discountType.label}
        additionalService={additionalService}
        additionalServicePrice={additionalServicePrice}
        dateService = {henaDate}
        discountRate={discountRate}
        secOther={secOther}
        secOtherDate={secOtherDate}
        secOtherPrice={secOtherPrice}
        logo={logo}
      />
    </div>
    </div>
  );
};

export default MakeupForm;
