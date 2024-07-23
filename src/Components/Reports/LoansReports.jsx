import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import { Pagination } from "antd";
import axios from "axios";
import host from "../../host/Host";
import { IoIosRefresh } from "react-icons/io";
import { useGetLoansQuery } from "../../app/Feature/API/Loans";

const LoansReports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [perPage, setPerPage] = useState();
  const [searchDateData, setSearchDateData] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false); // حالة تحميل البحث
  const [totals, setTotals] = useState({
    totalPriceLoans: 0,  });
  const { data: employees, isLoading: loadingEmployees } = useGetLoansQuery(currentPage);

  useEffect(() => {
    if (employees?.data?.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [employees, currentPage]);

  const calculateTotals = () => {
    if (searchDateData?.loan || employees?.data || []) {
     let totalPriceLoans = 0
  
      const dataToDisplay = searchDateData?.loan || employees?.data || [];
  
      dataToDisplay.forEach((item) => {
        totalPriceLoans += item.price || 0;
      });
  
      setTotals({
        totalPriceLoans,
      });
    }
  };
  
  
  useEffect(() => {
    calculateTotals();
  }, [searchDateData, employees?.data]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };

  const handleSearchDate = async (e) => {
    e.preventDefault();
    setLoadingSearch(true); // بدء تحميل البحث

    try {
      const response = await axios.post(`${host}/api/superAdmin/reports/SearchLoansReports`, {
        dateStart: startDate,
        dateEnd: endDate
      });

      setSearchDateData(response.data);
    } catch (error) {
      console.error('Error searching by date:', error);
    } finally {
      setLoadingSearch(false); // إنهاء تحميل البحث
    }
  };

  const handleResetSearch = () => {
    setStartDate('');
    setEndDate('');
    setSearchDateData(null);
  };

  const columns = [
    {
      name:'#',
      label:'',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "employee_name",
      label: "اسم الموظف",
    },
    {
      name: "reason",
      label: "سبب الصرف",
    },
    {
      name: "price",
      label: "المبلغ",
      options: {
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
        },
      },
    },
    {
      name: "created_at",
      label: "تاريخ العملية",
      options: {
        customBodyRender: (value) => {
          const date = value ? new Date(value) : new Date();
          const formattedDate = date.toLocaleDateString("ar-EG");
          const formattedTime = date.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${formattedDate} (${formattedTime})`;
        },
      },
    },
    {
      name: "updated_at",
      label: "تاريخ التحديث",
      options: {
        customBodyRender: (value) => {
          const date = value ? new Date(value) : new Date();
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
        noMatch:"لا توجد بيانات مطابقة",
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
    customFooter: () => (
      <>
      <tr>
              <td colSpan={3} className="font-semibold text-lg">
                <div className="flex justify-start gap-4 mt-2">
                  <span>إجمالي السلف:</span>
                  <span>{`${new Intl.NumberFormat("ar-EG").format(totals.totalPriceLoans)} جنيه`}</span>
                </div>
              </td>
            </tr>
      </>
          ),
  };

  const dataToDisplay = searchDateData?.loan || employees?.data || [];

  return (
    <>
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center w-full gap-4">
      <div className="flex flex-col md:flex-row gap-4 w-full items-center mt-2">
        <div className="flex gap-4 w-full items-center">
      من
          <input
            type="date"
            placeholder="من"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`shadow appearance-none
                border rounded w-full py-2 px-3 text-gray-700
                 leading-tight focus:outline-none focus:shadow-outline`}
          />
        </div>
        <div className="flex gap-4 w-full items-center">
          الي
          <input
            type="date"
            placeholder="الي"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`shadow appearance-none
                border rounded w-full py-2 px-3 text-gray-700
                 leading-tight focus:outline-none focus:shadow-outline`}
          />
        </div>
        <div className="flex gap-4 w-full items-center">
          <button onClick={handleSearchDate} disabled={loadingSearch}
          className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center">
            {loadingSearch ? "جاري البحث..." : "ابحث"}
          </button>
          <button onClick={handleResetSearch} disabled={loadingSearch}
          className="bg-[#f3c74d] text-black p-2 rounded-lg text-lg font-semibold flex items-center">
          <IoIosRefresh/>
          </button>
        </div>
        </div>
      </div>

      {loadingEmployees || loadingSearch ? (
        <div className="mt-[200px] mb-[200px] text-center">
          <Spinner />
        </div>
      ) : (
        <>
          <MUIDataTable
            title={"السلف"}
            data={dataToDisplay}
            columns={columns}
            options={options}
          />
          <Pagination
            current={currentPage}
            pageSize={employees.per_page}
            total={employees?.total || 0}
            onChange={handlePageChange}
            onShowSizeChange={(current, size) => {
              setCurrentPage(current);
              setPerPage(size);
            }}
          />
        </>
      )}
    </>
  );
};

export default LoansReports;
