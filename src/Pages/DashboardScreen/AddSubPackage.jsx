import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "antd";
import {
  AiOutlineClose,
  AiOutlineSave,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import MUIDataTable from "mui-datatables";

const AddSubPackage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [packageName, setPackageName] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");

  const packageOptions = ["باكدج 1", "باكدج 2", "باكدج 3"];
  const [data, setData] = useState([
    ["باكدج 1", "صنف1", "1000 جنيه"],
    ["باكدج 2", "صنف2", "2000 جنيه"],
    ["باكدج 3", "صنف3", "1500 جنيه"],
  ]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPackageName("");
    setItem("");
    setPrice("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!packageName || !item || !price) {
      alert("يرجى ملء جميع الحقول");
      return;
    }
    const newData = [...data, [packageName, item, price]];
    setData(newData);
    closeModal();
  };

  const handleEdit = (rowIndex) => {
    console.log("Edit clicked for row:", rowIndex);
    // Handle edit logic here
  };

  const handleDelete = (rowIndex) => {
    console.log("Delete clicked for row:", rowIndex);
    const newData = data.filter((_, index) => index !== rowIndex);
    setData(newData);
  };

  const columns = [
    {
      name: "اسم الباكدج",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "الصنف",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "السعر",
      options: {
        filter: true,
        sort: true,
      },
    },
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

  const options = {
    filterType: "dropdown",
    selectableRows: 'none',
    // elevation: false,
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
        <AiOutlineSave className="ml-3" /> إضافة باكدج فرعي
      </button>

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
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
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-start"
                  >
                    إضافة باكدج فرعي
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="packageName"
                        >
                          اختيار باكدج
                        </label>
                        <select
                          id="packageName"
                          value={packageName}
                          onChange={(e) => setPackageName(e.target.value)}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                          required
                        >
                          <option value="">اختر باكدج</option>
                          {packageOptions.map((pkg, index) => (
                            <option key={index} value={pkg}>
                              {pkg}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="item"
                        >
                          الصنف
                        </label>
                        <Input
                          id="item"
                          type="text"
                          value={item}
                          onChange={(e) => setItem(e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="price"
                        >
                          السعر
                        </label>
                        <Input
                          id="price"
                          type="text"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="w-full"
                          required
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

      <MUIDataTable
        title={"تقارير الباكدجات الفرعية"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default AddSubPackage;
