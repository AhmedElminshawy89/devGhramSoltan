import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import { useState } from "react";

const RentalTable = () => {
    const handleEdit = (rowIndex) => {
        console.log("Edit clicked for row:", rowIndex);
      };
    
      const handleDelete = (rowIndex) => {
        console.log("Delete clicked for row:", rowIndex);
      };
    
      const toggleStatus = (rowIndex) => {
        const updatedData = [...data];
        updatedData[rowIndex][4] =
          data[rowIndex][4] === "تم الاسترجاع" ? "لم يتم الاسترجاع" : "تم الاسترجاع";
        setData(updatedData);
      };
    
      const columns = [
        "الاسم", "الانواع المعاره", "نوع التامين", "قيمه التامين",
        {
          name: "الحاله",
          options: {
            customBodyRender: (value, tableMeta) => {
              const rowIndex = tableMeta.rowIndex;
              const currentStatus = data[rowIndex][4];
    
              return (
                <>
                  {currentStatus === "تم الاسترجاع" ? (
                    <button
                      onClick={() => toggleStatus(rowIndex)}
                      className="bg-black py-1 px-4 text-white font-semibold text-lg rounded-full whitespace-nowrap"
                    >
                      لم يتم الاسترجاع
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleStatus(rowIndex)}
                      className="bg-[#f3c74d] py-1 px-4 text-black font-semibold text-lg rounded-full whitespace-nowrap"
                    >
                       تم الاسترجاع
                    </button>
                  )}
                </>
              );
            },
          },
        },
        "تاريخ الايجار",
        "تاريخ التعديل",
        {
          name: "تنفيذ",
          options: {
            customBodyRender: (value, tableMeta) => {
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
    
      const [data, setData] = useState([
        ["أحمد علي", " خاتم و عقد", "بطاقه", "305646460464034", "تم الاسترجاع","30-5-2024","30-6-2024"],
        ["منى سعيد", "خاتم و هيربيز و توينز", "كاش","500", "لم يتم الاسترجاع","30-5-2024","30-6-2024"],
        ["أحمد علي", " خاتم و عقد", "بطاقه", "305646460464034", "تم الاسترجاع","30-5-2024","30-6-2024"],
      ]);
    
      const options = {
        filterType: "dropdown",
        selectableRows: 'none',
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
            text: "صفوف محددة",
            delete: "حذف",
            deleteAria: "حذف الصفوف المحددة",
          },
        },
      };
    return (
        <MUIDataTable
        title={"تقارير الإيجارات"}
        data={data}
        columns={columns}
        options={options}
      />

    )

}

export default RentalTable