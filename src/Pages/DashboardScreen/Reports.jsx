import MUIDataTable from "mui-datatables";

const Reports = () => {
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
      <MUIDataTable
        title={"التقارير "}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  )
}

export default Reports
