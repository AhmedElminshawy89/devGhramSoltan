import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "antd";
import { AiOutlineClose, AiOutlineSave, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import TextArea from "antd/es/input/TextArea";

const AddPackage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [data, setData] = useState([
    ["باكدج 1", "صوره", "وصف1", "تم العرض","30-5-2024","30-6-2024"],
    ["باكدج 1", "صوره", "وصف1", "لم يتم العرض","30-5-2024","30-6-2024"],
    ["باكدج 1", "صوره", "وصف1", "تم العرض","30-5-2024","30-6-2024"],
  ]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setName("");
    setDesc("");
    setPhoto("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !desc || !photo) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const newData = [name, photo, desc, "تم العرض"];
    setData([...data, newData]);
    closeModal();
  };

  const handleEdit = (rowIndex) => {
    console.log("Edit clicked for row:", rowIndex);
  };

  const handleDelete = (rowIndex) => {
    console.log("Delete clicked for row:", rowIndex);
  };

  const toggleStatus = (rowIndex) => {
    const updatedData = [...data]; // نسخ قائمة البيانات الحالية
    const currentStatus = updatedData[rowIndex][3]; // الحالة الحالية للصف
    updatedData[rowIndex][3] = currentStatus === "تم العرض" ? "لم يتم العرض" : "تم العرض"; // تحديث الحالة
    setData(updatedData); // تحديث البيانات بالحالة الجديدة
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
      name: "صوره الباكدج",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          return (
            <img
              src={'https://m.media-amazon.com/images/I/713cP4BUZmS._AC_SL1500_.jpg'}
              alt="package"
              style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
            />
          );
        },
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
      name: "عرضها ف صفحه الهبوط",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const currentStatus = data[rowIndex][3];

          return (
            <button
              onClick={() => toggleStatus(rowIndex)}
              className={`py-1 px-4 text-white font-semibold text-lg rounded-full ${
                currentStatus === "لم يتم العرض" ? "bg-black" : "bg-[#f3c74d]"
              }`}
            >
              {currentStatus}
            </button>
          );
        },
      },
    },    "تاريخ العمليه",
    "تاريخ التعديل",
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
                          value={desc}
                          onChange={(e) => setDesc(e.target.value)}
                          className="w-full"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2 text-start"
                          htmlFor="photo"
                        >
                          صوره الباكدج
                        </label>
                        <Input
                          id="photo"
                          type="file"
                          className="w-full"
                          accept="image/*" // Accept only image files
                          onChange={(e) => setPhoto(e.target.files[0])}
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
