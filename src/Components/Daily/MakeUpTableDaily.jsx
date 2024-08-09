import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import { Pagination } from "antd";
import {  useSearchMakeUpDateQuery} from "../../app/Feature/API/Search";
import DeleteDialog from "../../Shared/DeleteDialog";
import Spinner from "../../Shared/Spinner";
import { useGetMakeUpDailyQuery } from "../../app/Feature/API/Daily";
import { useLocation } from "react-router-dom";
import { useDeleteMakeupMutation } from "../../app/Feature/API/MakeUp";
import UpdateMakeUpDaily from './../UpdateForm/UpdateMakeUpDaily';
import { IoPrint } from "react-icons/io5";
import PrintInvoice from "../Prints/PrintInvoice";
import { useReactToPrint } from "react-to-print";

const MakeUpTableDaily = () => {
  const invoiceRef = useRef();

  const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: employees, refetch: refetchEmployees } = useGetMakeUpDailyQuery(currentPage);
  const {
    data: searchedEmployees,
    isLoading: loadingSearch,
    refetch: refetchSearchResults,
  } = useSearchMakeUpDateQuery(searchQuery);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteMakeupMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [loadingPackageId, setLoadingPackageId] = useState(null);
  const [printInvoice, setPrintInvoice] = useState(null);

  useEffect(() => {
    refetchEmployees();
  }, [refetchEmployees]);

  useEffect(() => {
    if (employees?.data?.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [employees, currentPage]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };

  const handleEdit = async (employeeId) => {
    const employeeToEdit =
      searchQuery === ""
        ? employees.data.find((emp) => emp.id === employeeId)
        : searchedEmployees.makeup.find((emp) => emp.id === employeeId);
    setEditEmployee(employeeToEdit);
  };

  
  const handlePrintRef = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const handlePrint = async (employeeId) => {
    const PrintInvoices =
      searchQuery === ""
        ? employees.data.find((emp) => emp.id === employeeId)
        : searchedEmployees.makeup.find((emp) => emp.id === employeeId);
  
    setPrintInvoice(PrintInvoices);
  
    setTimeout(() => {
      handlePrintRef();
    }, 300);
  };

  const handleDelete = (employeeId) => {
    setDeleteEmployeeId(employeeId);
    setIsDeleteDialogOpen(true);
    setLoadingPackageId(employeeId);
    refetchSearchResults()
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteEmployee(deleteEmployeeId);
      setDeleteEmployeeId(null);
      setIsDeleteDialogOpen(false);
      setLoadingPackageId(null)
      refetchEmployees();
      refetchSearchResults();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteEmployeeId(null);
    setIsDeleteDialogOpen(false);
    setLoadingPackageId(null)
  };

  const handleCloseEdit = () => {
    setEditEmployee(null);
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setEditEmployee(null);
    refetchSearchResults();
  };

  const columns = [
    {
      name:'#',
      label:'',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "category.name",
      label: "اسم الباكدج",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const studioData = searchQuery === ""
            ? employees?.data?.[tableMeta.rowIndex]
            : searchedEmployees?.makeup?.[tableMeta.rowIndex];
          return studioData?.category?.name || "";
        },
      },
    },
    {
      name: "name",
      label: "اسم العميل",
    },
    {
      name: "appropriate",
      label: "تاريخ المناسبه",
      options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString("ar-EG");
          return `${formattedDate}`;
        },
        wrap: 'nowrap',
      },
    },
      {
        name: "enter",
        label: "معاد دخول",
        options: {
          customBodyRender: (value) => {
            // دالة لتحويل الأرقام إلى النصوص العربية
            const convertToArabicNumbers = (num) => {
              const arabicDigits = '٠١٢٣٤٥٦٧٨٩'; // النصوص العربية للأرقام
              return num.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');
            };
      
            const convertTo12HourFormat = (time) => {
              // تأكد من أن القيمة هي نص صالح لصيغة وقت 24 ساعة (مثل "20:00:00")
              if (typeof time !== 'string' || !time.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)) {
                return '';
              }
      
              // تقسيم الوقت إلى ساعات، دقائق وثواني
              let [hours, minutes, seconds] = time.split(':').map(Number);
      
              let period = hours >= 12 ? 'م' : 'ص'; // تحديد ص أو م
              hours = hours % 12 || 12; // تحويل الساعات إلى صيغة 12 ساعة
      
              // إعادة تركيب الوقت بصيغة 12 ساعة
              return `${convertToArabicNumbers(hours)}:${convertToArabicNumbers(minutes < 10 ? '0' + minutes : minutes)}:${convertToArabicNumbers(seconds < 10 ? '0' + seconds : seconds)} ${period}`;
            };
      
            const formattedTime = convertTo12HourFormat(value);
            return `${formattedTime}`;
          },
          wrap: 'nowrap',
        },
      }
,      
      {
        name: "exit",
        label: "معاد خروج",
                options: {
          customBodyRender: (value) => {
            // دالة لتحويل الأرقام إلى النصوص العربية
            const convertToArabicNumbers = (num) => {
              const arabicDigits = '٠١٢٣٤٥٦٧٨٩'; // النصوص العربية للأرقام
              return num.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');
            };
      
            const convertTo12HourFormat = (time) => {
              // تأكد من أن القيمة هي نص صالح لصيغة وقت 24 ساعة (مثل "20:00:00")
              if (typeof time !== 'string' || !time.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)) {
                return '';
              }
      
              // تقسيم الوقت إلى ساعات، دقائق وثواني
              let [hours, minutes, seconds] = time.split(':').map(Number);
      
              let period = hours >= 12 ? 'م' : 'ص'; // تحديد ص أو م
              hours = hours % 12 || 12; // تحويل الساعات إلى صيغة 12 ساعة
      
              // إعادة تركيب الوقت بصيغة 12 ساعة
              return `${convertToArabicNumbers(hours)}:${convertToArabicNumbers(minutes < 10 ? '0' + minutes : minutes)}:${convertToArabicNumbers(seconds < 10 ? '0' + seconds : seconds)} ${period}`;
            };
      
            const formattedTime = convertTo12HourFormat(value);
            return `${formattedTime}`;
          },
          wrap: 'nowrap',
        },
      },
      {
        name: "arrive",
        label: "معاد وصول",
                options: {
          customBodyRender: (value) => {
            // دالة لتحويل الأرقام إلى النصوص العربية
            const convertToArabicNumbers = (num) => {
              const arabicDigits = '٠١٢٣٤٥٦٧٨٩'; // النصوص العربية للأرقام
              return num.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');
            };
      
            const convertTo12HourFormat = (time) => {
              // تأكد من أن القيمة هي نص صالح لصيغة وقت 24 ساعة (مثل "20:00:00")
              if (typeof time !== 'string' || !time.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)) {
                return '';
              }
      
              // تقسيم الوقت إلى ساعات، دقائق وثواني
              let [hours, minutes, seconds] = time.split(':').map(Number);
      
              let period = hours >= 12 ? 'م' : 'ص'; // تحديد ص أو م
              hours = hours % 12 || 12; // تحويل الساعات إلى صيغة 12 ساعة
      
              // إعادة تركيب الوقت بصيغة 12 ساعة
              return `${convertToArabicNumbers(hours)}:${convertToArabicNumbers(minutes < 10 ? '0' + minutes : minutes)}:${convertToArabicNumbers(seconds < 10 ? '0' + seconds : seconds)} ${period}`;
            };
      
            const formattedTime = convertTo12HourFormat(value);
            return `${formattedTime}`;
          },
          wrap: 'nowrap',
        },
      },
      {
        label: "حالة الدفع",
        name: "status",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <p
                className={`${
                  value === "لم يتم الدفع"
                  ? "py-1 px-4" : "py-1 px-4"
                } font-semibold text-lg rounded-full whitespace-nowrap ${
                  value === "لم يتم الدفع"
                    ? "bg-black text-white"
                    : "bg-[#f3c74d] text-black"
                }`}
              >
                {/* { value === "لم يتم الدفع" ? (
                  "لم يتم الدفع"
                ) : (
                  "تم الدفع"
                )} */}
                {value}
              </p>
            );
          },
        },
      },
    {
      name: "total",
      label: "الاجمالي",
      options: {
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
        },
      },
    },
    {
      name: "pay",
      label: "المدفوع",
      options: {
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
        },
      },
    },
    {
      name: "rest",
      label: "الباقي",
      options: {
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
        },
      },
    },
    // {
    //   label: "الحاله",
    //   name: "status",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       const packageId = (employees?.data || searchedEmployees?.makeup)?.[
    //         tableMeta.rowIndex
    //       ]?.id;
    //       const isLoading = loadingPackageId === packageId;
    //       return (
    //         <button
    //           onClick={() => handleStatusToggle(packageId, value)}
    //           className={`${
    //             isLoading ? "py-1 px-1 pb-1" : "py-1 px-4"
    //           } font-semibold text-lg rounded-full whitespace-nowrap ${
    //             value === "off"
    //               ? "bg-black text-white"
    //               : "bg-[#f3c74d] text-black"
    //           }`}
    //         >
    //           {isLoading ? (
    //             <Spinner />
    //           ) : value === "لم يتم الدفع" ? (
    //             "لم يتم الدفع"
    //           ) : (
    //             "تم الدفع"
    //           )}
    //         </button>
    //       );
    //     },
    //   },
    // },
    {
      name: "created_at",
      label: "تاريخ العملية",
      options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString("ar-EG");
          const formattedTime = date.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${formattedDate}(${formattedTime})`;
        },
        wrap: 'nowrap',
      },
    },
    {
      name: "updated_at",
      label: "تاريخ التحديث",
      options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString("ar-EG");
          const formattedTime = date.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${formattedDate}(${formattedTime})`;
        },
        wrap: 'nowrap',
      },
    },
    {
      name: "actions",
      label: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const adminId =
          searchQuery
          ? searchedEmployees?.makeup?.[tableMeta.rowIndex]?.id
          : employees?.data?.[tableMeta.rowIndex]?.id
          //  (employees?.data || searchedEmployees?.makeup)?.[
          //   tableMeta.rowIndex
          // ]?.id;
          return (
            <>
                         <button onClick={() => handlePrint(adminId)} className="ml-5">
                <IoPrint
                  title="طباعه الفاتوره"
                  className="text-2xl text-black"
                />
              </button>
              <button onClick={() => handleEdit(adminId)} className="ml-5">
                <AiOutlineEdit
                  title="تعديل  البيانات"
                  className="text-2xl text-black"
                />
              </button>
              <button onClick={() => handleDelete(adminId)}>
                {isDeleting && deleteEmployeeId === adminId ? (
                  <Spinner />
                ) : (
                  <AiOutlineDelete
                    title="حذف العنصر"
                    className="text-2xl text-[#ef4444]"
                  />
                )}
              </button>
            </>
          );
        },
      },
    },

  ];

  const options = {
    filterType: "dropdown",
    selectableRows: "none",
    sort: false,
    pagination: false,
    search: false,
    setRowProps: (row, dataIndex, rowIndex) => ({
      style: {
        backgroundColor: rowIndex % 2 === 0 ? "#f5f5f5" : "#ffffff",
      },
    }),
    textLabels: {
      body: {
        noMatch: loadingSearch ? "جاري البحث..." : "لا توجد بيانات مطابقة",
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
        text: "الصفوف المحددة",
        delete: "حذف",
        deleteAria: "حذف الصفوف المحددة",
      },
    },
  };

  const searchOptions = {
    filterType: "dropdown",
    selectableRows: "none",
    sort: false,
    pagination: false,
    search: false,
  };

  const dataToDisplay = searchQuery ? searchedEmployees?.makeup : employees?.data;

  return (
    <>
        {location.pathname==='/moderator/reservations/daily'&&(
      <div className="mb-4 flex justify-center items-center w-[300px] relative sm:flex-row flex-col">
        <input
          type="date"
          placeholder="ابحث اسم العميل"
          className="w-[300px] relative border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery&&(
          <button className=" text-gray-500 py-2 px-3 rounded-lg  text-xl font-medium flex items-center absolute right-[26px]"
          onClick={()=>setSearchQuery('')}>x</button>
        )}
      </div>
        )}

      {employees ? (
        <>
          <MUIDataTable
            title={"تقارير ميكاب"}
            data={dataToDisplay}
            columns={columns}
            options={options}
          />
          <Pagination
            current={currentPage}
            pageSize={employees.per_page}
            total={employees.total}
            onChange={handlePageChange}
            onShowSizeChange={(current, size) => {
              setCurrentPage(current);
              setPerPage(size);
            }}
          />
        </>
      ) : (
        <div className="mt-[200px] mb-[200px] text-center">
          <Spinner />
        </div>
      )}
<div style={{display:'none'}}>
      <PrintInvoice ref={invoiceRef} employee={printInvoice} />
      </div>
      {editEmployee && (
        <UpdateMakeUpDaily
          isOpen={true}
          closeModal={handleCloseEdit}
          initialValues={editEmployee}
          refetchSearch={refetchSearchResults}
          refetchEmployees={refetchEmployees}
        />
      )}
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onDeleteConfirmed={handleDeleteConfirmed}
        onClose={handleCancelDelete}
        loading={isDeleting}
      />
    </>
  );
};

export default MakeUpTableDaily;
