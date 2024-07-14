import React, { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { InputNumber } from "antd";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import "react-toastify/dist/ReactToastify.css";
import logo from '../../assets/Img/logo.png';

const Invoice = React.forwardRef((props, ref) => {
  const { employeeName, jobType, price, date, time, logo } = props;

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
      {/* <div style={{ textAlign: "center", marginBottom: "10mm" }}>
        <img src={logo} alt="Logo" style={{ width: "50mm", height: "auto" }} />
      </div> */}
      <div
        style={{
        //   borderTop: "1px solid black",
        //   borderBottom: "1px solid #eee",
          padding: "10mm 0",
        //   paddingBottom:'5px'
        }}
      >
        <img src={logo} alt="Logo" style={{ width: "30mm", height: "auto",marginBottom:'2px' }} />
        <p className="mb-1">
          <strong>اسم الموظف:</strong> {employeeName}
        </p>
        <p className="mb-1">
          <strong>الشغلانة:</strong> {jobType}
        </p>
        <p className="mb-1">
          <strong>السعر:</strong> {price}
        </p>
        <p className="mb-1">
          <strong>التاريخ:</strong> {date}
        </p>
        <p className="mb-1">
          <strong>الوقت:</strong> {time}
        </p>
      </div>

    </div>
  );
});

const QuicklyForm = ({ isOpen, closeModal }) => {
  const [employeeName, setEmployeeName] = useState("");
  const [jobType, setJobType] = useState("");
  const [price, setPrice] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const jobPrices = {
    مصور: 3000,
    "محرر فيديو": 2000,
    "منظم حدث": 4000,
  };

  const employees = ["أحمد", "محمد", "منى", "سارة"];

  const invoiceRef = useRef();

  const handleJobTypeChange = (e) => {
    const selectedJobType = e.target.value;
    setJobType(selectedJobType);
    setPrice(jobPrices[selectedJobType] || 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (employeeName && jobType) {
      console.log("Form submitted!");
      closeModal();
      setNotification({ type: "success", message: "تم حفظ البيانات بنجاح!" });
      toast.success("تم حفظ البيانات بنجاح!");
      sendDataToApi(); // إرسال البيانات إلى API هنا
    //   resetForm();
      handlePrint(); // طباعة الفاتورة بعد حفظ البيانات
    } else {
      setNotification({ type: "error", message: "الرجاء ملء جميع الحقول!" });
    }
  };

  const resetForm = () => {
    setEmployeeName("");
    setJobType("");
    setPrice(0);
    setFormSubmitted(false);
    setNotification(null);
  };

  const sendDataToApi = () => {
    const formData = {
      employeeName,
      jobType,
      price,
    };

    console.log("Sending data to API:", formData);

    // يمكنك هنا استخدام fetch أو Axios أو أي مكتبة أخرى لإرسال البيانات إلى API
    // مثال بسيط باستخدام fetch:
    // fetch('https://example.com/api/submit', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    //     // إعادة تعيين النموذج بعد الإرسال إذا لزم الأمر
    //     // resetForm();
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    //     // يمكنك هنا إدارة الأخطاء أو إظهار رسالة خطأ للمستخدم
    // });
  };

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

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
                    الشغل السريع
                  </Dialog.Title>
                  <div className="mt-2 overflow-y-auto h-full">
                    {notification && (
                      <div
                        className={`mb-4 p-2 text-center ${
                          notification.type === "success"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
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
                          htmlFor="employeeName"
                        >
                          اسم الموظف
                        </label>
                        <select
                          id="employeeName"
                          value={employeeName}
                          onChange={(e) => setEmployeeName(e.target.value)}
                          className={`block appearance-none w-full bg-white border ${
                            formSubmitted && !employeeName
                              ? "border-red-500"
                              : "border-gray-400 hover:border-gray-500"
                          } px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline`}
                        >
                          <option value="">اختر اسم الموظف</option>
                          {employees.map((employee) => (
                            <option key={employee} value={employee}>
                              {employee}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="jobType"
                        >
                          الشغلانة
                        </label>
                        <select
                          id="jobType"
                          value={jobType}
                          onChange={handleJobTypeChange}
                          className={`block appearance-none w-full bg-white border ${
                            formSubmitted && !jobType
                              ? "border-red-500"
                              : "border-gray-400 hover:border-gray-500"
                          } px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline`}
                        >
                          <option value="">اختر الشغلانة</option>
                          <option value="مصور">مصور</option>
                          <option value="محرر فيديو">محرر فيديو</option>
                          <option value="منظم حدث">منظم حدث</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="price"
                        >
                          السعر
                        </label>
                        <InputNumber
                          id="price"
                          value={price}
                          readOnly
                          min={0}
                          className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          employeeName={employeeName}
          jobType={jobType}
          price={price}
          date={new Date().toLocaleDateString()}
          time={new Date().toLocaleTimeString()}
          logo={logo}
        />
      </div>
    </>
  );
};

export default QuicklyForm;
