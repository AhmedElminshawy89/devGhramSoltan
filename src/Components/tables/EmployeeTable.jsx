import MUIDataTable from "mui-datatables";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
const EmployeeTable = () => {
    const handleEdit = (rowIndex) => {
        console.log("Edit clicked for row:", rowIndex);
    };

    const handleDelete = (rowIndex) => {
        console.log("Delete clicked for row:", rowIndex);
    };
    const data = [
        ["أحمد محمد", "201", "0123456789", "5000 جنيه", "30-5-2024", "30-6-2024"],
        ["أحمد محمد", "201", "0123456789", "5000 جنيه", "30-5-2024", "30-6-2024"],
        ["أحمد محمد", "201", "0123456789", "5000 جنيه", "30-5-2024", "30-6-2024"],
    ];
    const columns = [
        {
            name: "اسم الموظف",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "رقم البصمه",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "رقم التليفون",
            options: {
                filter: true,
                sort: true,
            },
        },
        {
            name: "الراتب",
            options: {
                filter: true,
                sort: true,
            },
        }, "تاريخ العمليه",
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
        title={"تقارير الموظفين الحاليين"}
        data={data}
        columns={columns}
        options={options}
      />
    )
}

export default EmployeeTable
