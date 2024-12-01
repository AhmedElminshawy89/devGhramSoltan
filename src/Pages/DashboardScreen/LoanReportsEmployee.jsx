import React, { useState } from 'react';
import host from '../../host/Host';
import Select from "react-select";
import { useGetAllEmployeesQuery } from '../../app/Feature/API/Emplyee';
import MUIDataTable from "mui-datatables";
import { Table, TableFooter, TableRow, TableCell } from '@mui/material';

const LoanReportsEmployee = () => {
    const [reports, setReports] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [employeeId, setEmployeeId] = useState("");
    const { data: allEmployee } = useGetAllEmployeesQuery();

    const fetchReports = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${host}/api/superAdmin/reports/SearchLoanReports`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',     
                },
                body: JSON.stringify({ dateStart, dateEnd, search: employeeId?.value }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch reports');
            }

            const data = await response.json();
            setReports(data?.data?.Loan || []);
            setTotal(data?.data?.TotalSum || 0)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchReports();
    };

    const columns = [
        {
            name:'#',
            label:'رقم',
            options: {
                customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
            },
        },
        {
            name: "employee_name",
            label: "اسم الموظف",
            // options: {
            //     customBodyRender: (value, tableMeta) => {
            //         const employeeData = reports[tableMeta.rowIndex];
            //         return employeeData?.employee_name || "";
            //     },
            // },
        },
        {
            name: "reason",
            label: "السبب",
        },
        {
            name: "price",
            label: "السعر",
        },
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
                    return `${formattedDate} (${formattedTime})`;
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
                border: '1px solid #e0e0e0'
            },
        }),
        textLabels: {
            body: {
                noMatch: reports.length === 0 && !loading ? "لا توجد بيانات للبحث" : "جاري التحميل...",
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

    if (error) return <p>حدث خطأ: {error}</p>;

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex gap-4 items-center sm:flex-row flex-col">
                <div className="w-full">
                    <input
                        type="date"
                        value={dateStart}
                        placeholder='من'
                        required
                        onChange={(e) => setDateStart(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="w-full">
                    <input
                        type="date"
                        value={dateEnd}
                        placeholder='إلى'
                        required
                        onChange={(e) => setDateEnd(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="w-full">
                    <Select
                        id="employeeName"
                        value={employeeId}
                        required
                        onChange={(selectedOption) => setEmployeeId(selectedOption)}
                        options={
                            allEmployee &&
                            allEmployee.map((employee) => ({
                                label: employee.employee_name,
                                value: employee.employee_name,
                            }))
                        }
                        className="shadow border-gray-400 rounded"
                        placeholder="اختر اسم الموظف"
                    />
                </div>
                <div className="w-full">
                    <button type="submit" className="bg-black text-white py-1 px-8 rounded-lg text-lg font-semibold flex items-center">
                        {loading ? "جاري البحث..." : "بحث"}
                    </button>
                </div>
            </form>
            <div className="mt-8">
                <MUIDataTable
                    title={"تقارير السلف للموظفين"}
                    data={reports}
                    columns={columns}
                    options={options}
                />
                <Table>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} align="right" style={{ fontWeight: "bold" }}>
                                <p className='text-xl'>
                                  الإجمالي: {total}
                                </p>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
};

export default LoanReportsEmployee;