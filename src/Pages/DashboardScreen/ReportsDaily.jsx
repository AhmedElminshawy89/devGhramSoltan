import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { Table, TableFooter, TableRow, TableCell } from '@mui/material';
import host from '../../host/Host';

const ReportsDaily = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${host}/api/superAdmin/reports/showDailyTotal`);
                const result = await response.json();
                if (result.status) {
                    setData(result.data);
                } else {
                    setError('Error fetching data');
                }
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const totalMakeup = data?.totalInstallmentsSum || 0;
    const totalStudio = data?.totalPriceStudio || 0;
    const totalWorks = data?.$totalPriceWorks || 0;
    const totalLoans = data?.totalPriceLoans || 0;
    const totalExpenses = data?.totalPriceExpenses || 0;
    const totalDaily = data?.totalDaily || 0;

    const combinedData = [
      ...(data?.makeups || []).map(item => ({
          serviceType: "ميكاب",
          customerName: item.name,
          phone: item.phone,
          total: item.total,
          date: item.created_at,
          status: item.status,
      })),
      ...(data?.studio || []).map(item => ({
          serviceType: "استوديو",
          customerName: item.name,
          phone: item.phone,
          total: item.total,
          date: item.receivedDate,
          status: item.status,
      })),
      ...(data?.works || []).map(item => ({
          serviceType: "شغل",
          customerName: item.employee?.employee_name || "",
          phone: "", 
          total: item.total,
          date: item.created_at,
          status: "", 
      })),
      ...(data?.expenses || []).map(item => ({
        serviceType: "المصروفات",
        customerName: item?.side || "",
        reason: item?.reason||"", 
        total: item.price,
        date: item.created_at,
        status: "", 
    })),
      ...(data?.loans || []).map(item => ({
        serviceType: "سلف الموظف",
        customerName: item?.employee_name || "",
        reason: item?.reason||"", 
        total: item.price,
        date: item.created_at,
        status: "", 
    })),
  ];

  const columns = [
      {
          name: "serviceType",
          label: "نوع الخدمة",
      },
      {
          name: "customerName",
          label: "اسم العميل",
      },
      {
          name: "phone",
          label: "رقم الهاتف",
      },
      {
        name: "reason",
        label: "سبب",
    },
      {
          name: "total",
          label: "الإجمالي",
      },
      {
          name: "date",
          label: "تاريخ",
          options: {
              customBodyRender: (value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("ar-EG");
              },
          },
      },
      {
          name: "status",
          label: "الحالة",
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
                noMatch: isLoading ? "جاري التحميل..." : "لا توجد بيانات للبحث",
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

    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="mt-8">
                <MUIDataTable
                    title={"تقارير يوميه"}
                    data={combinedData}
                    columns={columns}
                    options={options}
                />
                <Table>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} align="right" style={{ fontWeight: "bold" }}>
                                <p className='text-xl'>
                                    إجمالي الميكاب: {totalMakeup} جنيه
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align="right" style={{ fontWeight: "bold" }}>
                                <p className='text-xl'>
                                    إجمالي الاستوديو: {totalStudio} جنيه
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align="right" style={{ fontWeight: "bold" }}>
                                <p className='text-xl'>
                                    إجمالي الشغل: {totalWorks} جنيه
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align="right" style={{ fontWeight: "bold" }}>
                                <p className='text-xl'>
                                    إجمالي السلف: {totalLoans} جنيه
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align="right" style={{ fontWeight: "bold" }}>
                                <p className='text-xl'>
                                    إجمالي المصروفات: {totalExpenses} جنيه
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align="right" style={{ fontWeight: "bold" }}>
                                <p className='text-xl'>
                                    الباقي: {totalDaily} جنيه
                                </p>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
};

export default ReportsDaily;
