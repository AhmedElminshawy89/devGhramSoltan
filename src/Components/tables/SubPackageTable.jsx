import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
const SubPackageTable = () => {
    const [data, setData] = useState([
        ["باكدج 1", "صنف1", "1000 جنيه","30-5-2024","30-6-2024"],
        ["باكدج 2", "صنف2", "2000 جنيه","30-5-2024","30-6-2024"],
        ["باكدج 3", "صنف3", "1500 جنيه","30-5-2024","30-6-2024"],
      ]);
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
    <MUIDataTable
    title={"تقارير الباكدجات الفرعية"}
    data={data}
    columns={columns}
    options={options}
  />
  )
}

export default SubPackageTable
