import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "antd";
import { AiOutlineClose, AiOutlineSave, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import TextArea from "antd/es/input/TextArea";

const AddPackage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");

  const data = [
    ["باكدج 1", "وصف1" ],
    ["3 باكدج ", "وصف2"],
    ["باكدج 2", "وصف3"],
  ];
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setName("");
    setPhone("");
    setSalary("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !salary) {
      alert("يرجى ملء جميع الحقول");
      return;
    }
    
    closeModal();
  };

  const handleEdit = (rowIndex) => {
    console.log("Edit clicked for row:", rowIndex);
  };

  const handleDelete = (rowIndex) => {
    console.log("Delete clicked for row:", rowIndex);
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
      name: "وصف الباكدج",
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
        <AiOutlineSave className="ml-3" /> إضافة  باكدج
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
                    إضافة  باكدج
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="name"
                        >
                          اسم الباكدج 
                        </label>
                        <Input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="desc"
                        >
                          وصف الباكدج
                        </label>
                        <TextArea
                          id="desc"
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
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
        title={"تقارير الباكدجات"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default AddPackage;