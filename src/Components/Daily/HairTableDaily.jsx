import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Pagination } from "antd";
import Spinner from "../../Shared/Spinner";
import { useGetHairDailyQuery } from "../../app/Feature/API/Daily";

const HairTableDaily = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const { data: employees, refetch: refetchEmployees , isLoading} = useGetHairDailyQuery(currentPage);
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
      name: "name",
      label: "اسم العميل",
    },
    {
      name: "typeHair",
      label: "النوع",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const studioData = employees?.hairs?.data?.[tableMeta.rowIndex]
          return studioData?.typeHair || "";
        },
      },
    },
    {
        name: "priceHair",
        label: "السعر",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const studioData = employees?.hairs?.data?.[tableMeta.rowIndex]
            return studioData?.priceHair || "";
          },
        },
      },
//     {
//       name: "appropriate",
//       label: "تاريخ المناسبه",
//       options: {
//         customBodyRender: (value) => {
//           const date = new Date(value);
//           const formattedDate = date.toLocaleDateString("ar-EG");
//           return `${formattedDate}`;
//         },
//         wrap: 'nowrap',
//       },
//     },
//     {
//         name: "receivedDate",
//         label: "تاريخ الاستلام",
//               options: {
//         customBodyRender: (value) => {
//           const date = new Date(value);
//           const formattedDate = date.toLocaleDateString("ar-EG");
//           return `${formattedDate}`;
//         },
//         wrap: 'nowrap',
//       },
//       },
//       {
//         name: "enter",
//         label: "معاد دخول",
//         options: {
//           customBodyRender: (value) => {
//             // دالة لتحويل الأرقام إلى النصوص العربية
//             const convertToArabicNumbers = (num) => {
//               const arabicDigits = '٠١٢٣٤٥٦٧٨٩'; // النصوص العربية للأرقام
//               return num.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');
//             };
      
//             const convertTo12HourFormat = (time) => {
//               // تأكد من أن القيمة هي نص صالح لصيغة وقت 24 ساعة (مثل "20:00:00")
//               if (typeof time !== 'string' || !time.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)) {
//                 return '';
//               }
      
//               // تقسيم الوقت إلى ساعات، دقائق وثواني
//               let [hours, minutes, seconds] = time.split(':').map(Number);
      
//               let period = hours >= 12 ? 'م' : 'ص'; // تحديد ص أو م
//               hours = hours % 12 || 12; // تحويل الساعات إلى صيغة 12 ساعة
      
//               // إعادة تركيب الوقت بصيغة 12 ساعة
//               return `${convertToArabicNumbers(hours)}:${convertToArabicNumbers(minutes < 10 ? '0' + minutes : minutes)}:${convertToArabicNumbers(seconds < 10 ? '0' + seconds : seconds)} ${period}`;
//             };
      
//             const formattedTime = convertTo12HourFormat(value);
//             return `${formattedTime}`;
//           },
//           wrap: 'nowrap',
//         },
//       }
      
// ,      
//       {
//         name: "exit",
//         label: "معاد خروج",
//         options: {
//           customBodyRender: (value) => {
//             // دالة لتحويل الأرقام إلى النصوص العربية
//             const convertToArabicNumbers = (num) => {
//               const arabicDigits = '٠١٢٣٤٥٦٧٨٩'; // النصوص العربية للأرقام
//               return num.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');
//             };
      
//             const convertTo12HourFormat = (time) => {
//               // تأكد من أن القيمة هي نص صالح لصيغة وقت 24 ساعة (مثل "20:00:00")
//               if (typeof time !== 'string' || !time.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)) {
//                 return '';
//               }
      
//               // تقسيم الوقت إلى ساعات، دقائق وثواني
//               let [hours, minutes, seconds] = time.split(':').map(Number);
      
//               let period = hours >= 12 ? 'م' : 'ص'; // تحديد ص أو م
//               hours = hours % 12 || 12; // تحويل الساعات إلى صيغة 12 ساعة
      
//               // إعادة تركيب الوقت بصيغة 12 ساعة
//               return `${convertToArabicNumbers(hours)}:${convertToArabicNumbers(minutes < 10 ? '0' + minutes : minutes)}:${convertToArabicNumbers(seconds < 10 ? '0' + seconds : seconds)} ${period}`;
//             };
      
//             const formattedTime = convertTo12HourFormat(value);
//             return `${formattedTime}`;
//           },
//           wrap: 'nowrap',
//         },
//       },
//       {
//         name: "arrive",
//         label: "معاد وصول",
//         options: {
//           customBodyRender: (value) => {
//             // دالة لتحويل الأرقام إلى النصوص العربية
//             const convertToArabicNumbers = (num) => {
//               const arabicDigits = '٠١٢٣٤٥٦٧٨٩'; // النصوص العربية للأرقام
//               return num.toString().split('').map(digit => arabicDigits[parseInt(digit)]).join('');
//             };
      
//             const convertTo12HourFormat = (time) => {
//               // تأكد من أن القيمة هي نص صالح لصيغة وقت 24 ساعة (مثل "20:00:00")
//               if (typeof time !== 'string' || !time.match(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)) {
//                 return '';
//               }
      
//               // تقسيم الوقت إلى ساعات، دقائق وثواني
//               let [hours, minutes, seconds] = time.split(':').map(Number);
      
//               let period = hours >= 12 ? 'م' : 'ص'; // تحديد ص أو م
//               hours = hours % 12 || 12; // تحويل الساعات إلى صيغة 12 ساعة
      
//               // إعادة تركيب الوقت بصيغة 12 ساعة
//               return `${convertToArabicNumbers(hours)}:${convertToArabicNumbers(minutes < 10 ? '0' + minutes : minutes)}:${convertToArabicNumbers(seconds < 10 ? '0' + seconds : seconds)} ${period}`;
//             };
      
//             const formattedTime = convertTo12HourFormat(value);
//             return `${formattedTime}`;
//           },
//           wrap: 'nowrap',
//         },
//       },
    //   {
    //     label: "حالة الدفع",
    //     name: "status",
    //     options: {
    //       customBodyRender: (value, tableMeta, updateValue) => {
    //         return (
    //           <p
    //             className={`${
    //               value === "لم يتم الدفع"
    //               ? "py-1 px-4" : "py-1 px-4"
    //             } font-semibold text-lg rounded-full whitespace-nowrap ${
    //               value === "لم يتم الدفع"
    //                 ? "bg-black text-white"
    //                 : "bg-[#f3c74d] text-black"
    //             }`}
    //           >
    //             {/* { value === "لم يتم الدفع" ? (
    //               "لم يتم الدفع"
    //             ) : (
    //               "تم الدفع"
    //             )} */}
    //             {value}
    //           </p>
    //         );
    //       },
    //     },
    //   },
    // {
    //   name: "total",
    //   label: "الاجمالي",
    //   options: {
    //     customBodyRender: (value) => {
    //       return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
    //     },
    //   },
    // },
    // {
    //   name: "pay",
    //   label: "المدفوع",
    //   options: {
    //     customBodyRender: (value) => {
    //       return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
    //     },
    //   },
    // },
    // {
    //   name: "rest",
    //   label: "الباقي",
    //   options: {
    //     customBodyRender: (value) => {
    //       return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
    //     },
    //   },
    // }
    //   name: "created_at",
    //   label: "تاريخ العملية",
    //   options: {
    //     customBodyRender: (value) => {
    //       const date = new Date(value);
    //       const formattedDate = date.toLocaleDateString("ar-EG");
    //       const formattedTime = date.toLocaleTimeString("ar-EG", {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //       });
    //       return `${formattedDate}(${formattedTime})`;
    //     },
    //     wrap: 'nowrap',
    //   },
    // },
    // {
    //   name: "updated_at",
    //   label: "تاريخ التحديث",
    //   options: {
    //     customBodyRender: (value) => {
    //       const date = new Date(value);
    //       const formattedDate = date.toLocaleDateString("ar-EG");
    //       const formattedTime = date.toLocaleTimeString("ar-EG", {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //       });
    //       return `${formattedDate}(${formattedTime})`;
    //     },
    //     wrap: 'nowrap',
    //   },
    // },

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
        noMatch: isLoading ? "جاري البحث..." : "لا توجد بيانات مطابقة",
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

  const dataToDisplay = employees?.data;

  return (
    <>
      {employees ? (
        <>
          <MUIDataTable
            title={"تقارير الشعر"}
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
    </>
  );
};

export default HairTableDaily;
