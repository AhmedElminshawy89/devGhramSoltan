import React, { Fragment } from "react";
import { PiUser } from "react-icons/pi";
import { LuPackage } from "react-icons/lu";
import MUIDataTable from "mui-datatables";
import { IoTimer } from "react-icons/io5";
import {  FaFileInvoiceDollar, FaPhotoVideo } from "react-icons/fa";
import { FaRegFaceGrinBeam } from "react-icons/fa6";
import { Tab } from "@headlessui/react";

const HomeDashboard = () => {
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
      <div className="flex items-center justify-between flex-wrap gap-8 mb-10">
        <div className="bg-white flex-1 p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-8 justify-between">
            <div>
              <p className="text-[#67748e] text-2xl font-semibold">الموظف</p>
              <p className="text-[#344767] text-lg font-medium">6</p>
            </div>
            <div className="bg-gradient-to-br from-[#E9C357] to-[#f3c74d] shadow-lg p-2 rounded-lg">
              <PiUser className="text-4xl text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-8 justify-between">
            <div>
              <p className="text-[#67748e] text-2xl font-semibold">الباكدج</p>
              <p className="text-[#344767] text-lg font-medium">8</p>
            </div>
            <div className="bg-gradient-to-br from-[#E9C357] to-[#f3c74d] shadow-lg p-2 rounded-lg">
              <LuPackage className="text-4xl text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-8 justify-between">
            <div>
              <p className="text-[#67748e] text-2xl font-semibold">الايجار</p>
              <p className="text-[#344767] text-lg font-medium">2</p>
            </div>
            <div className="bg-gradient-to-br from-[#E9C357] to-[#f3c74d] shadow-lg p-2 rounded-lg">
              <IoTimer className="text-4xl text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 p-4 rounded-xl shadow-lg">
          <div className="flex items-center gap-8 justify-between">
            <div>
              <p className="text-[#67748e] text-2xl font-semibold">المصروفات</p>
              <p className="text-[#344767] text-lg font-medium">2</p>
            </div>
            <div className="bg-gradient-to-br from-[#E9C357] to-[#f3c74d] shadow-lg p-2 rounded-lg">
              <FaFileInvoiceDollar className="text-4xl text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap md:flex-row flex-col gap-8 mb-10 border-b pb-8">
        <div className="bg-white flex-1 p-4 rounded-xl shadow-lg w-full">
          <div className="flex items-start gap-8 justify-between">
            <div>
              <p className="text-[#67748e] text-2xl font-semibold">حجوزات الميكاب</p>
              <div className="pr-4">
              <p className="text-[#344767] text-lg font-medium mb-1">عدد الحجوزات: 6</p>
              <p className="text-[#344767] text-lg font-medium mb-1">  الاجمالي: 15000</p>
              <p className="text-[#344767] text-lg font-medium mb-1">  المدفوع: 12250</p>
              <p className="text-[#344767] text-lg font-medium mb-1"> المبالغ المتبقيه: 2750</p>
              <p className="text-[#344767] text-lg font-medium mb-1">  %نسبه الخصم: 20</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#E9C357] to-[#f3c74d] shadow-lg p-2 rounded-lg">
              <FaRegFaceGrinBeam className="text-4xl text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white flex-1 p-4 rounded-xl shadow-lg w-full">
          <div className="flex items-start gap-8 justify-between">
            <div>
              <p className="text-[#67748e] text-2xl font-semibold">حجوزات استوديو</p>
              <div className="pr-4">
              <p className="text-[#344767] text-lg font-medium mb-1">عدد الحجوزات: 6</p>
              <p className="text-[#344767] text-lg font-medium mb-1">  الاجمالي: 15000</p>
              <p className="text-[#344767] text-lg font-medium mb-1">  المدفوع: 12250</p>
              <p className="text-[#344767] text-lg font-medium mb-1"> المبالغ المتبقيه: 2750</p>
              <p className="text-[#344767] text-lg font-medium mb-1">  %نسبه الخصم: 20</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#E9C357] to-[#f3c74d] shadow-lg p-2 rounded-lg">
              <FaPhotoVideo className="text-4xl text-white" />
            </div>
          </div>
        </div>
      </div>
      <Tab.Group >
        <Tab.List className="flex p-1 space-x-1 bg-[#f3c74d] rounded-xl">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full py-2.5 text-sm leading-5 font-medium text-black rounded-lg ${
                  selected
                    ? "bg-white shadow"
                    : "text-black hover:bg-white/[0.12] hover:text-black"
                }`}
              >
                حجز يومي 
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full py-2.5 text-sm leading-5 font-medium text-black rounded-lg ${
                  selected
                    ? "bg-white shadow"
                    : "text-black hover:bg-white/[0.12] hover:text-black"
                }`}
              >
                 حجز استوديو
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full py-2.5 text-sm leading-5 font-medium text-black rounded-lg ${
                  selected
                    ? "bg-white shadow"
                    : "text-black hover:bg-white/[0.12] hover:text-black"
                }`}
              >
                 حجز ميكاب
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel>
            <MUIDataTable
              title={"حجز يومي"}
              data={data}
              columns={columns}
              options={options}
            />
          </Tab.Panel>
          <Tab.Panel>
            <MUIDataTable
              title={"حجز استوديو"}
              data={data}
              columns={columns}
              options={options}
            />
          </Tab.Panel>
          <Tab.Panel>
            <MUIDataTable
              title={"حجز ميكاب"}
              data={data}
              columns={columns}
              options={options}
            />
          </Tab.Panel>
          </Tab.Panels>
          </Tab.Group>
    </div>
  );
};

export default HomeDashboard;
