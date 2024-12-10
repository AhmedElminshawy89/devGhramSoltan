import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Pagination } from "antd";
import Spinner from "../../Shared/Spinner";
import { useGetHairDailyQuery } from "../../app/Feature/API/Daily";
import { useLocation } from "react-router-dom";
import {  useSearchHairDateQuery} from "../../app/Feature/API/Search";

const HairTableDaily = () => {
    const location = useLocation()
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: employees, refetch: refetchEmployees , isLoading} = useGetHairDailyQuery(currentPage);
    const {
    data: searchedEmployees,
    isLoading: loadingSearch,
    refetch: refetchSearchResults,
  } = useSearchHairDateQuery(searchQuery);
  console.log('searchedEmployees',searchedEmployees)
  useEffect(() => {
    refetchEmployees();
  }, [refetchEmployees]);
  useEffect(() => {
    if (employees?.hairs?.data?.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [employees, currentPage]);


  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    refetchSearchResults()
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
      name: "name",
      label: "اسم العميل",
    },
    {
      name: "typeHair",
      label: "النوع",
options: {
  customBodyRender: (value, tableMeta, updateValue) => {
    let studioData;
    if (searchQuery === "") {
      studioData = employees?.hairs?.data?.[tableMeta.rowIndex];
      return studioData?.typeHair || "لا يوجد";
    } else {
      studioData = searchedEmployees?.hairs?.[tableMeta.rowIndex];
      return studioData?.typeHair || "";
    }
  },
},
    },
    {
        name: "priceHair",
        label: "السعر",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            let studioData;
        
            if (searchQuery === "") {
              const studioData = employees?.hairs?.data?.[tableMeta.rowIndex]
              return studioData?.priceHair || "لا يوجد";
            } else {
              studioData = searchedEmployees?.hairs?.[tableMeta.rowIndex];
              return studioData?.priceHair || "";
            }
          },
        },
      }
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
      },
    }),
    textLabels: {
      body: {
        noMatch: isLoading ? "جاري البحث..." : "لا توجد بيانات مطابقة",
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

  const searchOptions = {
    filterType: "dropdown",
    selectableRows: "none",
    sort: false,
    pagination: false,
    search: false,
  };

  const dataToDisplay = searchQuery ? searchedEmployees?.hairs :employees?.hairs?.data

  return (
    <>
     {location.pathname==='/moderator/reservations/daily'&&(
      <div className="mb-4 flex justify-center items-center w-[300px] relative sm:flex-row flex-col">
        <input
          type="date"
          placeholder="ابحث اسم العميل"
          className="w-[300px] relative border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {searchQuery&&(
          <button className=" text-gray-500 py-2 px-3 rounded-lg  text-xl font-medium flex items-center absolute right-[26px]"
          onClick={()=>setSearchQuery('')}>x</button>
        )}
      </div>
        )}
      {employees ? (
        <>
          <MUIDataTable
            title={"تقارير الشعر"}
            data={dataToDisplay}
            columns={columns}
            options={options}
          />
          <Pagination
            current={currentPage}
            pageSize={employees.per_page}
            total={employees.total}
            onChange={handlePageChange}
            onShowSizeChange={(current, size) => {
              setCurrentPage(current);
              setPerPage(size);
            }}
          />
        </>
      ) : (
        <div className="mt-[200px] mb-[200px] text-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default HairTableDaily;
