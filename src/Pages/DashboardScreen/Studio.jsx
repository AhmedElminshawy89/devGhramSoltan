import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave } from "react-icons/ai";
import { InputNumber } from "antd";
import { VscSaveAs } from "react-icons/vsc";
import MUIDataTable from "mui-datatables";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Studio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [discountType, setDiscountType] = useState("");
  const [discountRate, setDiscountRate] = useState(0);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleTotalChange = (value) => {
    const newTotal = parseFloat(value) || 0;
    setTotal(newTotal);
    setRemaining(newTotal - payment - (newTotal * discountRate) / 100);
  };

  const handlePaymentChange = (value) => {
    const newPayment = parseFloat(value) || 0;
    setPayment(newPayment);
    setRemaining(total - newPayment - (total * discountRate) / 100);
  };

  const handleDiscountTypeChange = (e) => {
    const selectedDiscountType = e.target.value;
    setDiscountType(selectedDiscountType);

    let discount = 0;
    if (selectedDiscountType === "خصم خاص") {
      discount = 10;
    } else if (selectedDiscountType === "خصم موسمي") {
      discount = 15;
    } else if (selectedDiscountType === "خصم تعاقد") {
      discount = 20;
    }

    setDiscountRate(discount);
    setRemaining(total - payment - (total * discount) / 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    closeModal();
  };

  const handleEdit = (rowIndex) => {
    console.log("Edit clicked for row:", rowIndex);
  };

  const handleDelete = (rowIndex) => {
    console.log("Delete clicked for row:", rowIndex);
  };

  const columns = [
    "معاد دخول",
    "معاد خروج",
    "اسم العميل",
    "رقم الهاتف",
    {
      name: "تاريخ المناسبة",
      options: {
        filter: true,
        customFilterListRender: (value) => `تاريخ: ${value}`,
        customFilterAndSearch: (filterValue, rowData) => {
          return rowData[2].includes(filterValue);
        },
      },
    },
    "تاريخ الحالي",
    "اجمالي",
    "دفع",
    "باقي",
    "سبب الخصم",
    {
      name: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return (
            <>
              <button onClick={() => handleEdit(rowIndex)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(rowIndex)}>
                <AiOutlineDelete className="text-2xl text-[#ef4444]" />
              </button>
            </>
          );
        },
      },
    },
  ];

  const data = [
    [
      "12:00",
      "14:00",
      "هاله محمد",
      "0123456789",
      "2023-06-15",
      "2023-06-01",
      "5000",
      "2500",
      "1750",
      "خصم موسمي",
    ],
    [
      "13:00",
      "15:00",
      "مني محمد",
      "0123456789",
      "2023-06-5",
      "2023-06-01",
      "5000",
      "2500",
      "1750",
      "خصم خاص",
    ],
    [
      "14:00",
      "16:00",
      "شيماء محمد",
      "0123456789",
      "2023-06-25",
      "2023-06-01",
      "5000",
      "2500",
      "1750",
      "خصم موسمي",
    ],
    [
      "15:00",
      "17:00",
      "دعاء محمد",
      "0123456789",
      "2023-06-8",
      "2023-06-01",
      "5000",
      "2500",
      "1750",
      "خصم موسمي",
    ],
    [
      "16:00",
      "18:00",
      "هاله محمد",
      "0123456789",
      "2023-06-9",
      "2023-06-01",
      "5000",
      "2500",
      "1750",
      "خصم موسمي",
    ],
  ];

  const options = {
    filterType: "dropdown",
    selectableRows: false,
    elevation: false,
    setRowProps: (row, dataIndex, rowIndex) => {
      return {
        style: {
          backgroundColor: rowIndex % 2 === 0 ? "#f5f5f5" : "#ffffff",
        },
      };
    },
    textLabels: {
      body: {
        noMatch: "لا توجد بيانات مطابقة",
        toolTip: "فرز",
        columnHeaderTooltip: (column) => `فرز لـ ${column.label}`,
      },
      pagination: {
        next: "الصفحة التالية",
        previous: "الصفحة السابقة",
        rowsPerPage: "عدد الصفوف لكل صفحة:",
        displayRows: "من",
      },
      toolbar: {
        search: "بحث",
        downloadCsv: "تنزيل CSV",
        print: "طباعة",
        viewColumns: "عرض الأعمدة",
        filterTable: "تصفية الجدول",
      },
      filter: {
        all: "الكل",
        title: "الفلاتر",
        reset: "إعادة تعيين",
      },
      viewColumns: {
        title: "عرض الأعمدة",
        titleAria: "عرض/إخفاء أعمدة الجدول",
      },
      selectedRows: {
        text: "صفوف محددة",
        delete: "حذف",
        deleteAria: "حذف الصفوف المحددة",
      },
    },
  };

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center mb-10"
      >
        <VscSaveAs className="ml-3" /> حجز استوديو
      </button>

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
                  <div className="mt-2 overflow-y-auto h-full">
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
                        >
                          <option>البوم 12 صوره</option>
                          <option>البوم 24 صوره</option>
                          <option>البوم 8 صوره</option>
                          <option>سيشن كامل</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="entryTime"
                        >
                          معاد دخول
                        </label>
                        <input
                          id="entryTime"
                          type="time"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="exitTime"
                        >
                          معاد خروج
                        </label>
                        <input
                          id="exitTime"
                          type="time"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="customerName"
                        >
                          اسم العميل
                        </label>
                        <input
                          id="customerName"
                          type="text"
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
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="currentDate"
                        >
                          تاريخ الحالي
                        </label>
                        <input
                          id="currentDate"
                          type="date"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="total"
                        >
                          إجمالي
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
                          دفع
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
                          باقي
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
                            نسبة الخصم (%)
                          </label>
                          <InputNumber
                            id="discountRate"
                            value={discountRate}
                            readOnly
                            min={0}
                            max={100}
                            className="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </div>
                      )}
                    </form>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <MUIDataTable
        title={"تقارير استوديو التصوير"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default Studio;
