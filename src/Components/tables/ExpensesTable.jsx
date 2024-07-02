import MUIDataTable from "mui-datatables";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
const ExpensesTable = () => {
    
    const handleEdit = (rowIndex) => {
        console.log("Edit clicked for row:", rowIndex);
      };
    
      const handleDelete = (rowIndex) => {
        console.log("Delete clicked for row:", rowIndex);
      };
      const columns = [
        "الجهه",
        "سبب الصرف",
        "المبلغ",
        "تاريخ العمليه",
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
        ["تنظيف", "مصروف نقدى", "3000","30-5-2024","30-6-2024"],
        ["تصليح", "تنظيم حفلة", "4000","30-5-2024","30-6-2024"],
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
    title={"تقارير المصروفات"}
    data={data}
    columns={columns}
    options={options}
  />
  )
}

export default ExpensesTable
