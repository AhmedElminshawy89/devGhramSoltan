import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose, AiOutlineSave, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { VscSaveAs } from "react-icons/vsc";
import MUIDataTable from "mui-datatables";
import Select from "react-select";

const Rental = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [insuranceType, setInsuranceType] = useState("");
  const [status, setStatus] = useState("");

  const allCategories = [
    "تاج", "هيربيز", "خاتم", "توينز", "طرحه", "عقد", "حلق"
  ];
  const insuranceTypes = [ "بطاقه", "كاش"];
  const statuses = ["تم الاسترجاع", "لم يتم الاسترجاع"];

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

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

  const toggleStatus = (rowIndex) => {
    const updatedData = [...data];
    updatedData[rowIndex][4] =
      data[rowIndex][4] === "تم الاسترجاع" ? "لم يتم الاسترجاع" : "تم الاسترجاع";
    setData(updatedData); // Assuming you have a state variable 'data' and a setter function 'setData' to update it
  };

  const columns = [
    "الاسم", "الانواع المعاره", "نوع التامين", "قيمه التامين",
    {
      name: "الحاله",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const currentStatus = data[rowIndex][4];

          return (
            <>
              {currentStatus === "تم الاسترجاع" ? (
                <button
                  onClick={() => toggleStatus(rowIndex)}
                  className="bg-black py-1 px-4 text-white font-semibold text-lg rounded-full"
                >
                  لم يتم الاسترجاع
                </button>
              ) : (
                <button
                  onClick={() => toggleStatus(rowIndex)}
                  className="bg-[#f3c74d] py-1 px-4 text-black font-semibold text-lg rounded-full"
                >
                   تم الاسترجاع
                </button>
              )}
            </>
          );
        },
      },
    },
    "تاريخ الايجار",
    "تاريخ التعديل",
    {
      name: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta) => {
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

  const [data, setData] = useState([
    ["أحمد علي", " خاتم و عقد", "بطاقه", "305646460464034", "تم الاسترجاع","30-5-2024","30-6-2024"],
    ["منى سعيد", "خاتم و هيربيز و توينز", "كاش","500", "لم يتم الاسترجاع","30-5-2024","30-6-2024"],
    ["أحمد علي", " خاتم و عقد", "بطاقه", "305646460464034", "تم الاسترجاع","30-5-2024","30-6-2024"],
  ]);

  const options = {
    filterType: "dropdown",
    selectableRows: 'none',
    setRowProps: (row, dataIndex, rowIndex) => ({
      style: {
        backgroundColor: rowIndex % 2 === 0 ? "#f5f5f5" : "#ffffff",
      },
    }),
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
        <VscSaveAs className="ml-3" /> ايجار
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
                <Dialog.Panel className="w-full max-w-xl h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-start"
                  >
                    ايجار
                  </Dialog.Title>
                  <div className="mt-2 overflow-hidden h-full">
                    <form
                      className="grid grid-cols-1 gap-4"
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="name"
                        >
                          الاسم
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="category"
                        >
                          النوع
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
                          placeholder='اختر'
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="insuranceType"
                        >
                          نوع التأمين
                        </label>
                        <select
                          id="insuranceType"
                          value={insuranceType}
                          onChange={(e) => setInsuranceType(e.target.value)}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
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
                          {insuranceType === "كاش" ? "المبلغ" : "رقم البطاقه"}
                        </label>
                        <input
                          id="deposit"
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
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
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value="">اختر الحالة</option>
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
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
      <MUIDataTable
        title={"تقارير الإيجارات"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default Rental;
