import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";
import { Table, TableFooter, TableRow, TableCell } from '@mui/material';
import host from '../../host/Host';

const ReportsDailySearch = () => {
    const [data, setData] = useState(null);
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${host}/api/superAdmin/reports/searchDateDailyTotal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search: date }),
            });
            const result = await response.json();
            if (result) {
                setData(result?.data);
            } else {
                setError('Failed to fetch data.');
            }
        } catch (err) {
            setError('An error occurred while fetching data.');
        } finally {
            setIsLoading(false);
        }
    };
    

    useEffect(() => {
        if (date) {
            fetchData();
        }
    }, [date]);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    const totalMakeup = data?.totalInstallmentsSum || 0;
    const totalStudio = data?.totalPriceStudio || 0;
    const totalWorks = data?.totalPriceWorks || 0;
    const totalLoans = data?.totalPriceLoans || 0;
    const totalExpenses = data?.totalPriceExpenses || 0;
    const totalDaily = data?.totalDaily || 0;

    const calculateTodayInstallmentsForCustomers = (data) => {
        const today = new Date().toISOString().split('T')[0];
        const makeupInstallments = {};
        const studioInstallments = {};

        data?.makeups?.forEach((makeup) => {
            if (!makeupInstallments[makeup.name]) makeupInstallments[makeup.name] = 0;
            if (makeup.DateOfTheFirstInstallment === today && makeup.pay) {
                makeupInstallments[makeup.name] += parseFloat(makeup.pay);
            }
            if (makeup.DateOfTheSecondInstallment === today && makeup.secondInstallment) {
                makeupInstallments[makeup.name] += parseFloat(makeup.secondInstallment);
            }
            if (makeup.DateOfTheThirdInstallment === today && makeup.thirdInstallment) {
                makeupInstallments[makeup.name] += parseFloat(makeup.thirdInstallment);
            }
        });

        data?.studio?.forEach((studio) => {
            if (!studioInstallments[studio.name]) studioInstallments[studio.name] = 0;
            if (studio.DateOfTheFirstInstallment === today && studio.pay) {
                studioInstallments[studio.name] += parseFloat(studio.pay);
            }
            if (studio.DateOfTheSecondInstallment === today && studio.secondInstallment) {
                studioInstallments[studio.name] += parseFloat(studio.secondInstallment);
            }
            if (studio.DateOfTheThirdInstallment === today && studio.thirdInstallment) {
                studioInstallments[studio.name] += parseFloat(studio.thirdInstallment);
            }
        });

        return { makeupInstallments, studioInstallments };
    };

    const { makeupInstallments, studioInstallments } = calculateTodayInstallmentsForCustomers(data);

    const combinedData = [
        ...(data?.makeups || []).map((item) => ({
            serviceType: "ميكاب",
            customerName: item.name,
            phone: item.phone,
            total: makeupInstallments[item.name] || 0,
            rest: item.rest,
            total_Price: item.total,
            status: item.status,
        })),
        ...(data?.studio || []).map((item) => ({
            serviceType: "استوديو",
            customerName: item.name,
            phone: item.phone,
            total: studioInstallments[item.name] || 0,
            rest: item.rest,
            total_Price: item.total,
            status: item.status,
        })),
        ...(data?.works || []).map((item) => ({
            serviceType: "شغل",
            customerName: item.employee?.employee_name || "",
            phone: "",
            total: item.total,
            status: "",
        })),
        ...(data?.expenses || []).map((item) => ({
            serviceType: "المصروفات",
            customerName: item.side || "",
            reason: item.reason || "",
            total: item.price,
            status: "",
        })),
        ...(data?.loans || []).map((item) => ({
            serviceType: "سلف الموظف",
            customerName: item.employee_name || "",
            reason: item.reason || "",
            total: item.price,
            status: "",
        })),
    ];

    const columns = [
        { name: "serviceType", label: "نوع الخدمة" },
        { name: "customerName", label: "اسم العميل" },
        { name: "phone", label: "رقم الهاتف" },
        { name: "reason", label: "سبب" },
        { name: "total", label: "إجمالي المدفوع" },
        { name: "rest", label: "الباقي" },
        { name: "total_Price", label: "إجمالي الفاتورة" },
        { name: "status", label: "الحالة" },
    ];

    const options = {
        filterType: "dropdown",
        selectableRows: "none",
        search: false,
        textLabels: {
            body: {
                noMatch: isLoading ? "جاري التحميل..." : "لا توجد بيانات.",
            },
        },
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex gap-4 items-center mt-4">
                <input
                    type="date"
                    value={date || ""}
                    onChange={(e) => setDate(e.target.value)}
                    className="border rounded p-2"
                />
                <button type="submit" className="bg-[#20b2aa] text-white p-2 w-[70px] flex justify-center rounded-lg text-lg font-semibold flex items-center">
                    {isLoading ? "جاري البحث..." : "بحث"}
                </button>
            </form>
            <div className="mt-4">
                {error && <p className="text-red-500">{error}</p>}
                <MUIDataTable title="التقارير اليومية" data={combinedData} columns={columns} options={options} />
                <Table>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} align="right">إجمالي الميكاب: {totalMakeup} جنيه</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align="right">إجمالي الاستوديو: {totalStudio} جنيه</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align="right">إجمالي الشغل: {totalWorks} جنيه</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align="right">إجمالي السلف: {totalLoans} جنيه</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align="right">إجمالي المصروفات: {totalExpenses} جنيه</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align="right">الباقي: {totalDaily} جنيه</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    );
};

export default ReportsDailySearch;
