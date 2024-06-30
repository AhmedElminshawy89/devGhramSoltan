import MUIDataTable from "mui-datatables";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
const MakeUpTable = () => {
    
  const columns = [
    "نوع الباكدج",
    "اسم العروسه",
    "رقم الهاتف",    "البلد",

    {
      name: "تاريخ المناسبه",
      options: {
        filter: true,
        customFilterListOptions: {
          render: (value) => `تاريخ: ${value}`,
        },
        customFilterAndSearch: (filterValue, rowData) => {
          return rowData[2].includes(filterValue);
        },
      },
    },
    "مرتج من الباكدج",
    "الخدمه الاضافيه",
    "سعر الخدمه الاضافيه",
    "الاجمالي",
    "المدفوع",
    "الباقي",
    "نوع الخصم",
    "قيمه الخصم",
    "تاريخ الحجز",
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

  const data = [
    [
      "زفاف",
      "هاله محمد",
      "0123456789",
      "دسوق",
      "2025-06-15",
      "طرحه",
      "كوافير",
      "450",
      "5000",
      "2500",
      "1750",
      "خصم موسمي",
      "150",
      "2024-06-15",
      "2024-06-15",
    ],
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
  
  const handleEdit = (rowIndex) => {
    console.log("Edit clicked for row:", rowIndex);
  };

  const handleDelete = (rowIndex) => {
    console.log("Delete clicked for row:", rowIndex);
  };

  return (
    <MUIDataTable
    title={"تقارير ميكاب"}
    data={data}
    columns={columns}
    options={options}
  />
  )
}

export default MakeUpTable
