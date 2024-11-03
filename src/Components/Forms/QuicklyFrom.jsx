import React, { useState, Fragment, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import Select from "react-select";
import { useReactToPrint } from "react-to-print";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/Img/logo.png";
import { useSaveQuickworkMutation } from "../../app/Feature/API/QuickWorks";
import {
  useGetAllWorkersQuery,
} from "../../app/Feature/API/Workers";
import { useGetAllEmployeesQuery } from "../../app/Feature/API/Emplyee";
import Spinner from "../../Shared/Spinner";

const Invoice = React.forwardRef((props, ref) => {
  const { employeeName, jobType, amount, logo } = props;
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
        direction: "rtl",
        textAlign:'center'
      }}
    >
      <div
        style={{
          padding: "10mm 0",
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
        <p className="mb-1">
          <strong>اسم الموظف:</strong> {employeeName}
        </p>
        <p className="mb-1">
          <strong>الشغلانه:</strong> {jobType.map((job) => job.value).join(", ")}
        </p>
        <p className="mb-1">
          <strong>السعر:</strong> {`${amount.toLocaleString('ar-EG')} جنيه`}
        </p>
        <p className="mb-1">
          <strong>التاريخ:</strong> {now.toLocaleDateString('ar-EG', options)}
        </p>
        <p className="mb-1">
          <strong>الوقت:</strong> {now.toLocaleTimeString('ar-EG')}
        </p>
      </div>
    </div>
  );
});

const QuicklyForm = ({ isOpen, closeModal }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [jobType, setJobType] = useState([]);
  const [amount, setAmount] = useState("");
  const [deposit, setDeposit] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [saveQuickwork, { isLoading }] = useSaveQuickworkMutation();
  const { data: allWorks } = useGetAllWorkersQuery("");
  const { data: allEmployee } = useGetAllEmployeesQuery();
  const invoiceRef = useRef();

  useEffect(() => {
    if (jobType.length > 0) {
      const totalAmount = jobType.reduce((acc, job) => acc + parseFloat(job.price), 0);
      setAmount(totalAmount);
    } else {
      setAmount("");
    }
  }, [jobType]);
  


  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!employeeId || jobType.length === 0 || !amount) {
      setNotification({
        type: "error",
        message: "يرجى ملء جميع الحقول المطلوبة.",
      });
      return;
    }

    const jobTypes = jobType.map((job) => job.label);
    const textValue = jobTypes.join(", ");

    const quickWorkData = {
      employee_name_id: employeeId.value,
      job: textValue,
      total: amount,
    };

    try {
      await saveQuickwork(quickWorkData).unwrap();
      setNotification({
        type: "success",
        message: "تم حفظ البيانات بنجاح.",
      });
      handlePrint();
      closeModal();
      resetForm();
    } catch (error) {
      setNotification({
        type: "error",
        message: "حدث خطأ أثناء حفظ البيانات.",
      });
    }
  };

  const resetForm = () => {
    setEmployeeId("");
    setDeposit("");
    setJobType([]);
    setAmount('');
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
                    اضافه شغل سريع
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
                          htmlFor="employeeName"
                        >
                          اسم الموظف{" "}
                          <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <Select
                        id="employeeName"
                        value={employeeId}
                        onChange={(selectedOption) => setEmployeeId(selectedOption)}
                        options={
                          allEmployee &&
                          allEmployee.map((employee) => ({
                            label: employee.employee_name,
                            value: employee.id,
                          }))
                        }
                        className={`shadow ${
                          formSubmitted && !employeeId ? "border-red-500" : "border-gray-400"
                        } rounded`}
                        placeholder="اختر اسم الموظف"
                      />

                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="jobType"
                        >
                          الشغلانه{" "}
                          <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <Select
                          id="jobType"
                          isMulti
                          value={jobType}
                          onChange={(selectedOptions) =>
                            setJobType(selectedOptions)
                          }
                          options={
                            allWorks &&
                            allWorks.map((work) => ({
                              label: `${
                                work.name
                              } / ${work.price.toLocaleString("ar-EG")} جنيه`,
                              value: work.name,
                              price: work.price, 
                            }))
                          }
                          className={`shadow ${
                            formSubmitted && jobType.length === 0
                              ? "border-red-500"
                              : "border-gray-400"
                          } rounded`}
                          placeholder="اختر"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="amount"
                        >
                          السعر{" "}
                          <span className="text-xl text-red-500 mt-4">*</span>
                        </label>
                        <input
                          id="amount"
                          type="number"
                          value={amount}
                          readOnly
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            formSubmitted && !amount ? "border-red-500" : ""
                          }`}
                          placeholder="السعر"
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
          employeeName={ employeeId.label}
          jobType={jobType}
          amount={amount}
          logo={logo}
        />
      </div>
    </>
  );
};

export default QuicklyForm;
