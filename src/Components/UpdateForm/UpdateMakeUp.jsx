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
import {  useUpdateMakeupMutation } from "../../app/Feature/API/MakeUp";
import { useGetMakeUpDailyQuery } from "../../app/Feature/API/Daily";

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
      className="p-10 font-sans text-center bg-white shadow-lg rounded-lg"
      style={{ direction: 'rtl' }}
    >
      <div className="border-b-2 pb-4 mb-4">
        <div className="flex justify-center mb-2">
          <img
            src={logo}
            alt="Logo"
            className="w-32 h-auto"
          />
        </div>
        <h1 className="text-lg font-semibold mb-1">مركز غرام سلطان يقدم فن المكياج والتصوير الاحترافي.</h1>
        <p className="text-sm">تواصل معنا: 0472570908</p>
      </div>

      <table className="min-w-full divide-y divide-gray-200 text-right">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="font-semibold px-4 py-2">تاريخ اليوم:</td>
            <td className="px-4 py-2">{now.toLocaleDateString('ar-EG', options)}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">الوقت:</td>
            <td className="px-4 py-2">{now.toLocaleTimeString('ar-EG')}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">اسم العميل:</td>
            <td className="px-4 py-2">{brideName}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">رقم التليفون:</td>
            <td className="px-4 py-2">{phone}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">البلد:</td>
            <td className="px-4 py-2">{city}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">تاريخ المناسبة:</td>
            <td className="px-4 py-2">{eventDate ? new Date(eventDate).toLocaleDateString("ar-EG") : "غير متوفر"}</td>
          </tr>
          {receiveDate && (
            <tr>
              <td className="font-semibold px-4 py-2">تاريخ الاستلام:</td>
              <td className="px-4 py-2">{new Date(receiveDate).toLocaleDateString("ar-EG")}</td>
            </tr>
          )}
          <tr>
            <td className="font-semibold px-4 py-2">نوع الباكدج:</td>
            <td className="px-4 py-2">{packageType}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">مرتجع من الباكدج:</td>
            <td className="px-4 py-2">{selectedPackageDetails.map((detail) => detail.label).join(', ')}
            </td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">خدمة إضافية:</td>
            <td className="px-4 py-2">{additionalService}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">سعر الخدمة الإضافية:</td>
            <td className="px-4 py-2">{`${additionalServicePrice ? additionalServicePrice.toLocaleString('ar-EG') + ' جنيه' : ''}`}</td>
          </tr>
          {dateService && (
            <tr>
              <td className="font-semibold px-4 py-2">تاريخ الخدمة الإضافية:</td>
              <td className="px-4 py-2">{new Date(dateService).toLocaleDateString("ar-EG")}</td>
            </tr>
          )}
          {secOther && (
            <tr>
              <td className="font-semibold px-4 py-2">نوع القسم الآخر:</td>
              <td className="px-4 py-2">{secOther}</td>
            </tr>
          )}
          {secOtherPrice && (
            <tr>
              <td className="font-semibold px-4 py-2">سعر القسم الآخر:</td>
              <td className="px-4 py-2">{`${secOtherPrice.toLocaleString('ar-EG')} جنيه`}</td>
            </tr>
          )}
          {secOtherDate && (
            <tr>
              <td className="font-semibold px-4 py-2">تاريخ القسم الآخر:</td>
              <td className="px-4 py-2">{new Date(secOtherDate).toLocaleDateString("ar-EG")}</td>
            </tr>
          )}
          <tr>
            <td className="font-semibold px-4 py-2">إجمالي:</td>
            <td className="px-4 py-2">{`${total.toLocaleString('ar-EG')} جنيه`}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">المبلغ المدفوع:</td>
            <td className="px-4 py-2">{`${payment ? payment.toLocaleString('ar-EG') + ' جنيه' : ''}`}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">المبلغ المتبقي:</td>
            <td className="px-4 py-2">{`${remaining ? remaining.toLocaleString('ar-EG') + ' جنيه' : ''}`}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">نوع الخصم:</td>
            <td className="px-4 py-2">{discountName || "لا يوجد خصم"}</td>
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">قيمة الخصم:</td>
            <td className="px-4 py-2">{`${discountRate ? discountRate.toLocaleString('ar-EG') + ' جنيه' : ''}` || "لا يوجد"}</td>
          </tr>
        </tbody>
      </table>

      <p className="text-md mb-1">
        <strong>في حالة الإلغاء لا يسترد المبلغ المدفوع</strong>
      </p>
      <p className="text-md mb-1">
        <strong>يرجى الاحتفاظ بالإيصال للمراجعة</strong>
      </p>
      <p className="text-md mb-1">
        <strong>العنوان: دسوق - شارع الجيش <br /> م: 0472570908</strong>
      </p>

      <div className="mt-2">
        <p className="text-md" style={{ textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>
          <strong>
            تم تصميم وتطوير هذه المنصة بواسطة Coding Corner
            <br />
            رقم التواصل: 01002337574 - 01286552467
          </strong>
        </p>
      </div>
    </div>
  );
})


const UpdateMakeUp = ({ isOpen, closeModal ,initialValues }) => {

  const [discountType, setDiscountType] = useState("");
  const [henaDate, setHenaDate] = useState(initialValues.dateService || "");
  const [secOther, setSecOther] = useState(initialValues.typeHair || "");
  const [secOtherPrice, setSecOtherPrice] = useState(initialValues.priceHair || "");
  const [secOtherDate, setSecOtherDate] = useState(initialValues.dateHair || "");
  const [henaFound, setHenaFound] = useState(initialValues.dateService || false);
  const { data: ShowDiscountPrice } = useGetDiscountsPriceQuery(discountType&&discountType.value);
  const { data: getAllDiscount } = useGetallDiscountsWithoutPaginationQuery("");
  const [packageType, setPackageType] = useState('');
  const { data: ShowSubCategory } = useGetSubCategoriesBasedOnCategoryQuery(packageType&&packageType.value);
  const [selectedPackageDetails, setSelectedPackageDetails] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [brideName, setBrideName] = useState(initialValues.name ||"");
  const [phone, setPhone] = useState(initialValues.phone ||"");
  const [city, setCity] = useState(initialValues.address ||"");
  const [eventDate, setEventDate] = useState(initialValues.appropriate ||"");
  const [receiveDate, setReceiveDate] = useState("");
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(initialValues.pay ||0);
  const [remaining, setRemaining] = useState(0);
  const [additionalService, setAdditionalService] = useState(initialValues.addService ||"");
  const [additionalServicePrice, setAdditionalServicePrice] = useState(initialValues.priceService ||0);
  const [allDiscounts, setAllDiscounts] = useState([]);
  const { data: showCategoryStudio } = useGetCategoriesMakeUpQuery("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [updateMakeup, { isLoading }] = useUpdateMakeupMutation();
  const {refetch: refetchMakeupDaily } = useGetMakeUpDailyQuery();
  const [enter, setEnter] = useState(initialValues.enter ||"");
  const [exit, setExit] = useState(initialValues.exit ||"");
  const [arrive, setArrive] = useState(initialValues.arrive ||"");
  
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
  }, [showCategoryStudio, getAllDiscount]);

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

  useEffect(()=>{
    if(!henaFound){
      setHenaDate("")
    }
  },[henaFound])

  useEffect(() => {
    if (isOpen) {
      const initialCategory = uniqueCategories.find(category => category.id === initialValues.category_id);
      setPackageType(initialCategory ? { label: `${initialCategory.name} - ${initialCategory.price.toLocaleString("ar-EG")} جنيه`, value: initialCategory.id } : '');
    }

  }, [isOpen, initialValues.category_id, uniqueCategories]);

useEffect(() => {
  if (isOpen) {
    const initialDiscount = allDiscounts.find(disc => disc.id === initialValues.reason_discount_id);
    setDiscountType(initialDiscount ? { label: `${initialDiscount.discount}`, value: initialDiscount.id } : null);
  }
}, [isOpen, allDiscounts, initialValues.reason_discount_id]);



  useEffect(() => {
    if (Array.isArray(ShowSubCategory) && Array.isArray(initialValues.notes)) {
      const initialSelectedDetails = initialValues.notes.reduce((acc, note) => {
        const subCategory = ShowSubCategory.find(sub => sub.item === note.key);
        if (subCategory) {
          acc.push({ value: subCategory.id, label: subCategory.item });
        }
        return acc;
      }, []);
      
      setSelectedPackageDetails(initialSelectedDetails);
    } else {
      setSelectedPackageDetails([]);
    }
  }, [initialValues.notes, ShowSubCategory]);
  
 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
    
    if (packageType && brideName && phone && city && eventDate && total) {
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
  
      const makeupData = new FormData();
      makeupData.append('id', initialValues.id);
      makeupData.append('category_id', packageType.value || initialValues.category_id);
      notes.forEach((note, index) => {
        makeupData.append(`notes[${index}][key]`, note.key);
        makeupData.append(`notes[${index}][value]`, note.value);
      });     
      makeupData.append('name', brideName);
      makeupData.append('phone', phone);
      makeupData.append('address', city);
      makeupData.append('appropriate', eventDate);
      makeupData.append('total', total);
      makeupData.append('pay', payment);
      makeupData.append('rest', remaining);
      if (discountType) {
        makeupData.append('reason_discount_id', discountType.value);
      }
      makeupData.append('addService', additionalService);
      makeupData.append('priceService', additionalServicePrice);
      makeupData.append('price', discountRate);
      makeupData.append('dateService', henaDate);
      makeupData.append('typeHair', secOther);
      makeupData.append('priceHair', secOtherPrice);
      makeupData.append('dateHair', secOtherDate);
      makeupData.append('enter', enter);
      makeupData.append('exit', exit);
      makeupData.append('arrive', arrive);
  
      try {
        const response = await updateMakeup({
          id: initialValues.id,
          makeupData,
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
          refetchMakeupDaily();
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

export default UpdateMakeUp;
