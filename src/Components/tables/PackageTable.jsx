import MUIDataTable from "mui-datatables";
import { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
const PackageTable = () => {
    const [data, setData] = useState([
        ["باكدج 1", "صوره", "وصف1", "تم العرض","30-5-2024","30-6-2024"],
        ["باكدج 1", "صوره", "وصف1", "لم يتم العرض","30-5-2024","30-6-2024"],
        ["باكدج 1", "صوره", "وصف1", "تم العرض","30-5-2024","30-6-2024"],
      ]);
    
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
    <MUIDataTable
    title={"تقارير الباكدجات"}
    data={data}
    columns={columns}
    options={options}
  />
  )
}

export default PackageTable
