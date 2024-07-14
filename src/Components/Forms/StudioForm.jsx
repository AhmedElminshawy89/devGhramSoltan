import React, { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { InputNumber } from "antd";
import Select from "react-select";
import { useReactToPrint } from "react-to-print";
import logo from "../../assets/Img/logo.png";

const Invoice = React.forwardRef((props, ref) => {
  const {
    total,
    payment,
    remaining,
    discountType,
    discountRate,
    packageType,
    selectedPackage,
    brideName,
    phone,
    city,
    eventDate,
    receiveDate,
    additionalService,
    additionalServicePrice,
    selectedDetailPrice,
    selectedDetailName,
    date,
    time,
    logo,
  } = props;

  return (
    <div
      ref={ref}
      style={{
        width: "80mm",
        padding: "10mm",
        fontFamily: "Arial, sans-serif",
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
            <strong>تاريخ اليوم:</strong>{" "}
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
            // borderBottom: "1px solid #eee",
            padding: "4mm 0",
            // marginBottom: "5px",
            // marginTop: "5px",
          }}
        >
          <p className="mb-1">
            <strong>نوع الباكدج:</strong> {packageType}
          </p>
          <p className="mb-1">
            <strong>مرتجع من الباكدج:</strong> {selectedDetailName}
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
            <strong>نوع الخصم:</strong> {discountType}
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

const StudioForm = ({ isOpen, closeModal }) => {
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [discountType, setDiscountType] = useState("");
  const [discountRate, setDiscountRate] = useState(0);
  const [packageType, setPackageType] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [brideName, setBrideName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  const [selectedPackageDetails, setSelectedPackageDetails] = useState([]);
  const [additionalService, setAdditionalService] = useState("");
  const [additionalServicePrice, setAdditionalServicePrice] = useState(0);
  const [selectedDetailPrice, setSelectedDetailPrice] = useState(0);
  const [selectedDetailName, setSelectedDetailName] = useState([]);

  const invoiceRef = useRef();

  const makeupPackages = {
    زفاف: {
      price: 2000,
      details: {
        ميكاب: { name: "ميكاب زفاف شامل", price: 500 },
        تسريحة: { name: "تسريحة شعر زفاف", price: 300 },
        اظافر: { name: "طلاء أظافر زفاف", price: 200 },
        جاكوزي: { name: "جلسة جاكوزي مريحة", price: 400 },
        مساج: { name: "جلسة مساج استرخائي", price: 600 },
      },
    },
    حنة: {
      price: 1000,
      details: {
        ميكاب: { name: "ميكاب حنة تقليدي", price: 300 },
        تسريحة: { name: "تسريحة شعر حنة", price: 200 },
        حناء: { name: "نقش حناء", price: 100 },
      },
    },
    شبكة: {
      price: 1500,
      details: {
        ميكاب: { name: "ميكاب شبكة بسيط", price: 400 },
        تسريحة: { name: "تسريحة شعر شبكة", price: 250 },
        ايلانير: { name: "تحديد عيون ايلانير", price: 300 },
      },
    },
    زفاف_مميز: {
      price: 3000,
      details: {
        ميكاب: { name: "ميكاب زفاف فاخر", price: 800 },
        تسريحة: { name: "تسريحة شعر زفاف مميز", price: 500 },
        اظافر: { name: "طلاء أظافر فاخر", price: 300 },
        جاكوزي: { name: "جلسة جاكوزي VIP", price: 1000 },
        مساج: { name: "جلسة مساج مميز", price: 700 },
        حناء: { name: "نقش حناء فاخر", price: 400 },
      },
    },
  };

  const handleTotalChange = (value) => {
    const newTotal = parseFloat(value) || 0;
    setTotal(newTotal + additionalServicePrice);
    setRemaining(newTotal + additionalServicePrice - payment - discountRate);
  };

  const handlePaymentChange = (value) => {
    const newPayment = parseFloat(value) || 0;
    setPayment(newPayment);
    setRemaining(total + additionalServicePrice - newPayment - discountRate);
  };

  const fetchMakeupDetails = (selectedPackage) => {
    setSelectedPackage(selectedPackage);
    if (selectedPackage) {
      const packageDetails = makeupPackages[selectedPackage].details;
      const packagePrice = makeupPackages[selectedPackage].price;

      setSelectedPackageDetails(
        Object.keys(packageDetails).map((key) => ({
          value: key,
          label: `${packageDetails[key].name} - ${packageDetails[key].price} جنيه`,
        }))
      );

      setTotal(packagePrice + additionalServicePrice);
      setRemaining(
        packagePrice + additionalServicePrice - payment - discountRate
      );
    } else {
      setSelectedPackageDetails([]);
      setTotal(additionalServicePrice);
      setRemaining(additionalServicePrice - payment - discountRate);
    }
  };

  const handleDetailSelection = (selectedOptions) => {
    if (selectedPackage && selectedOptions) {
      const selectedDetails = selectedOptions.map((option) => option.value);
      let detailPrice = 0;

      selectedDetails.forEach((detail) => {
        const packageDetails = makeupPackages[selectedPackage];
        detailPrice += packageDetails.details[detail].price;
        selectedDetailName.push(packageDetails.details[detail].name);
      });

      setSelectedDetailPrice(detailPrice);

      const newTotal =
        makeupPackages[selectedPackage].price +
        additionalServicePrice -
        detailPrice;
      setTotal(newTotal);

      const newRemaining = newTotal - payment - discountRate;
      setRemaining(newRemaining);
    } else if (selectedPackage) {
      const packageDetails = makeupPackages[selectedPackage];
      setTotal(packageDetails.price + additionalServicePrice);
      setRemaining(
        packageDetails.price + additionalServicePrice - payment - discountRate
      );
      setSelectedDetailPrice(0);
    } else {
      setTotal(additionalServicePrice);
      setRemaining(additionalServicePrice - payment - discountRate);
      setSelectedDetailPrice(0);
    }
  };

  const handleAdditionalServiceChange = (e) => {
    setAdditionalService(e.target.value);
  };

  const handleAdditionalServicePriceChange = (value) => {
    const price = parseFloat(value) || 0;
    const prevAdditionalServicePrice = additionalServicePrice;

    setAdditionalServicePrice(price);

    setTotal((prevTotal) => prevTotal - prevAdditionalServicePrice + price);
    setRemaining(
      (prevTotal) =>
        prevTotal - prevAdditionalServicePrice + price - payment - discountRate
    );
  };

  const handleDiscountTypeChange = (e) => {
    const selectedDiscountType = e.target.value;

    let discount = 0;
    if (selectedDiscountType === "خصم خاص") {
      discount = 100;
    } else if (selectedDiscountType === "خصم موسمي") {
      discount = 150;
    } else if (selectedDiscountType === "خصم تعاقد") {
      discount = 200;
    }

    setDiscountType(selectedDiscountType);
    setDiscountRate(discount);

    const currentTotal = total;
    setRemaining(currentTotal - payment - discount);
  };

  const handleBrideNameChange = (event) => {
    setBrideName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleEventDateChange = (event) => {
    setEventDate(event.target.value);
  };

  const handleReceiveDateChange = (event) => {
    setReceiveDate(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `total: ${total}`,
      `\npayment: ${payment}`,
      `\nremaining: ${remaining}`,
      `\ndiscountType: ${discountType}`,
      `\ndiscountRate: ${discountRate}`,
      `\npackageType: ${packageType}`,
      `\nselectedPackage: ${selectedPackage}`,
      `\nbrideName: ${brideName}`,
      `\nphone: ${phone}`,
      `\ncity: ${city}`,
      `\neventDate: ${eventDate}`,
      `\nreceiveDate: ${receiveDate}`,
      `\nselectedPackageName: ${selectedDetailName}`,
      `\nadditionalService: ${additionalService}`,
      `\nadditionalServicePrice: ${additionalServicePrice}`,
      `\nselectedDetailPrice: ${selectedDetailPrice}`
    );
    handlePrint();
    // closeModal();
  };
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });
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
                    حجز استوديو
                  </Dialog.Title>
                  <div className="mt-2 overflow-y-auto overflow-x-hidden h-full">
                    <form
                      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="category"
                        >
                          نوع الباكدج
                        </label>
                        <select
                          id="category"
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                          onChange={(e) => {
                            fetchMakeupDetails(e.target.value);
                            setPackageType(e.target.value);
                          }}
                          value={packageType}
                        >
                          <option value="">اختر الباكدج</option>
                          <option value="زفاف">زفاف</option>
                          <option value="حنة">حنة</option>
                          <option value="شبكة">شبكة</option>
                          <option value="زفاف_مميز">زفاف مميز</option>
                        </select>
                      </div>
                      {selectedPackage && (
                        <>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2 text-start"
                              htmlFor="packageDetails"
                            >
                              مرتجع من الباكدج
                            </label>
                            <Select
                              options={selectedPackageDetails}
                              isMulti
                              placeholder="اختر"
                              onChange={handleDetailSelection}
                            />
                          </div>
                        </>
                      )}
                      {selectedPackage && (
                        <>
                          <div className="mb-4">
                            <label
                              className="block text-gray-700 text-sm font-bold mb-2 text-start"
                              htmlFor="additionalService"
                            >
                              خدمة إضافية
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
                              سعر الخدمة الإضافية
                            </label>
                            <InputNumber
                              id="additionalServicePrice"
                              value={additionalServicePrice}
                              onChange={handleAdditionalServicePriceChange}
                              min={0}
                              className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                          </div>
                        </>
                      )}
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="brideName"
                        >
                          اسم العميل
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
                          رقم الهاتف
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
                          البلد
                        </label>
                        <input
                          id="city"
                          type="text"
                          value={city}
                          onChange={handleCityChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="eventDate"
                        >
                          تاريخ المناسبة
                        </label>
                        <input
                          id="eventDate"
                          type="date"
                          value={eventDate}
                          onChange={handleEventDateChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="receiveDate"
                        >
                          تاريخ الاستلام
                        </label>
                        <input
                          id="receiveDate"
                          type="date"
                          value={receiveDate}
                          onChange={handleReceiveDateChange}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="total"
                        >
                          إجمالي التكلفة
                        </label>
                        <InputNumber
                          id="total"
                          value={total}
                          onChange={handleTotalChange}
                          min={0}
                          className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="payment"
                        >
                          المبلغ المدفوع
                        </label>
                        <InputNumber
                          id="payment"
                          value={payment}
                          onChange={handlePaymentChange}
                          min={0}
                          className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="remaining"
                        >
                          المبلغ المتبقي
                        </label>
                        <InputNumber
                          id="remaining"
                          value={remaining}
                          readOnly
                          min={0}
                          className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="discountType"
                        >
                          نوع الخصم
                        </label>
                        <select
                          id="discountType"
                          value={discountType}
                          onChange={handleDiscountTypeChange}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">اختر نوع الخصم</option>
                          <option value="خصم خاص">خصم خاص</option>
                          <option value="خصم موسمي">خصم موسمي</option>
                          <option value="خصم تعاقد">خصم تعاقد</option>
                        </select>
                      </div>
                      {discountType && (
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 text-start"
                            htmlFor="discountRate"
                          >
                            قيمة الخصم
                          </label>
                          <InputNumber
                            id="discountRate"
                            value={discountRate}
                            readOnly
                            min={0}
                            max={200}
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                      )}
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
                          <AiOutlineSave className="ml-3" /> حفظ
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
          total={total}
          payment={payment}
          remaining={remaining}
          discountType={discountType}
          discountRate={discountRate}
          packageType={packageType}
          selectedPackage={selectedPackage}
          brideName={brideName}
          phone={phone}
          city={city}
          eventDate={eventDate}
          receiveDate={receiveDate}
          selectedDetailName={selectedDetailName}
          additionalService={additionalService}
          additionalServicePrice={additionalServicePrice}
          selectedDetailPrice={selectedDetailPrice}
          date={new Date().toLocaleDateString()}
          time={new Date().toLocaleTimeString()}
          logo={logo}
        />
      </div>
    </div>
  );
};

export default StudioForm;
