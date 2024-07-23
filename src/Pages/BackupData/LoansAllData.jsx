import React, { useEffect, useState } from "react";
import { useGetLoansQuery } from "../../app/Feature/API/Loans";
import MUIDataTable from "mui-datatables";
import { saveData, getData } from "../../Services/dexieService";

const LoansAllData = () => {
  const { data: loansOnline, refetch } = useGetLoansQuery();
  const [loansOffline, setLoansOffline] = useState([]);
  // console.log("ExpensesAllData", loansOffline);

  useEffect(() => {
    if (loansOnline && loansOnline.data) {
      saveData(loansOnline.data);
      setLoansOffline(loansOnline.data);
    } else {
      getData().then((data) => {
        if (data) setLoansOffline(data);
      });
    }
  }, [loansOnline]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 500000); 

    return () => clearInterval(intervalId);
  }, []);

  const columns = [
    {
      name: "employee_name",
      label: "اسم الموظف",
    },
    {
      name: "reason",
      label: "سبب الصرف",
    },
    {
      name: "price",
      label: "المبلغ",
      options: {
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
        },
      },
    },
    {
      name: "created_at",
      label: "تاريخ العملية",
      options: {
        customBodyRender: (value) => {
          const date = value ? new Date(value) : new Date();
          const formattedDate = date.toLocaleDateString("ar-EG");
          const formattedTime = date.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${formattedDate} (${formattedTime})`;
        },
      },
    },
    {
      name: "updated_at",
      label: "تاريخ التحديث",
      options: {
        customBodyRender: (value) => {
          const date = value ? new Date(value) : new Date();
          const formattedDate = date.toLocaleDateString("ar-EG");
          const formattedTime = date.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${formattedDate} (${formattedTime})`;
        },
      },
    },
  ];

  const optionsOffline = {
    filterType: "dropdown",
    selectableRows: "none",
    sort: false,
    pagination: true,
    search: true,
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
        text: "الصفوف المحددة",
        delete: "حذف",
        deleteAria: "حذف الصفوف المحددة",
      },
    },
  };

  return (
    <MUIDataTable
      title={"السلف"}
      data={loansOffline}
      columns={columns}
      options={optionsOffline}
    />
  );
};

export default LoansAllData;
