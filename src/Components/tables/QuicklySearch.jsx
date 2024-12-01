import React, { useRef, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { useGetMakeUpDailyQuery } from "../../app/Feature/API/Daily";
import { IoPrint } from "react-icons/io5";
import PrintInvoice from "../Prints/PrintInvoice";
import { useReactToPrint } from "react-to-print";
import { useLazySearchWorkersQuery } from "../../app/Feature/API/Search";
import UpdateQuicklyWorks from "../UpdateForm/UpdateQuickWorks";
import { useDeleteQuickworkMutation } from "../../app/Feature/API/QuickWorks";
import PrintInvoiceQuickWork from "../Prints/PrintInvoiceQuickWork";

const QuicklySearch = () => {
  const invoiceRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [triggerSearch, { isLoading }] = useLazySearchWorkersQuery();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteQuickworkMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [printInvoice, setPrintInvoice] = useState(null);
  const { refetch: refetchMakeUpDaily } = useGetMakeUpDailyQuery();

  const handleSearchChange = (e) => {
    const name = e.target.value;
    setSearchQuery(name);
    console.log('searchData', searchData.find((emp) => emp.id))
  };

  const fetchSearchResults = async () => {
    const result = await triggerSearch(searchQuery);
    setSearchData(result?.data?.work || []);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  const handleEdit = (employeeId) => {
    const employeeToEdit = searchData.find((emp) => emp.id === employeeId);
    setEditEmployee(employeeToEdit);
  };
  const handlePrintRef = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const handlePrint = async(employeeId) => {
    const printData = searchData.find((emp) => emp.id === employeeId);
    setPrintInvoice(printData);

    setTimeout(() => {
      handlePrintRef();
    }, 300);
    await fetchSearchResults();
  };

  const handleDelete = (employeeId) => {
    setDeleteEmployeeId(employeeId);
    setIsDeleteDialogOpen(true);
    refetchMakeUpDaily();
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteEmployee(deleteEmployeeId);
      setDeleteEmployeeId(null);
      setIsDeleteDialogOpen(false);
      refetchMakeUpDaily();
      await fetchSearchResults();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteEmployeeId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseEdit = async() => {
    setEditEmployee(null);
    await fetchSearchResults();

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
      label: "اسم الموظف",
      name:'employee.employee_name',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const studioData =  searchData[tableMeta.rowIndex]
          
          return studioData?.employee?.employee_name || "N/A";
        },
      },
    },
    {
      name: "job",
      label: "الشغلانه",
    },
    {
      name: "total",
      label: "السعر",
      options: {
        customBodyRender: (value) => {
          const formattedPrice = `${new Intl.NumberFormat("ar-EG").format(
            value
          )} جنيه`;
          return formattedPrice;
        },
      },
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
          return `${formattedDate}(${formattedTime})`;
        },
      },
    },
    {
      name: "updated_at",
      label: "تاريخ التحديث",
      options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString("ar-EG");
          const formattedTime = date.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${formattedDate}(${formattedTime})`;
        },
      },
    },
    {
      name: "actions",
      label: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta) => {
          const discountId =  searchData[tableMeta.rowIndex]?.id;
          return (
            <>
            <button onClick={() => handlePrint(discountId)} className="ml-5">
                <IoPrint
                  title="طباعه الفاتوره"
                  className="text-2xl text-black"
                />
              </button>
              <button onClick={() => handleEdit(discountId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(discountId)}>
                {isDeleting && deleteEmployeeId === discountId ? (
                  <Spinner />
                ) : (
                  <AiOutlineDelete className="text-2xl text-[#ef4444]" />
                )}
              </button>
            </>
          );
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

  return (
    <>
      <form onSubmit={handleSearchSubmit} className="mb-4 flex justify-start gap-4 items-center w-full">
        <input
          type="text"
          name="clientName"
          placeholder="ابحث اسم الموظف"
          className="w-1/2 border px-6 py-2 rounded-lg mr-2"
          value={searchQuery.clientName}
          onChange={handleSearchChange}
        />
        <button type="submit" className="bg-[#20b2aa] text-white px-6 py-2 rounded-lg text-lg font-semibold flex items-center">
          {isLoading?<Spinner/>:'بحث'}
        </button>
      </form>

      {isLoading ? (
        <div className="mt-[200px] mb-[200px] text-center">
          <Spinner />
        </div>
      ) : (
        <MUIDataTable
          title={"نتائج البحث للشغل السريع"}
          data={searchData}
          columns={columns}
          options={options}
        />
      )}
      
      <div style={{ display: 'none' }}>
      <PrintInvoiceQuickWork ref={invoiceRef} employee={printInvoice} />
      </div>

      {editEmployee && (
        <UpdateQuicklyWorks
          isOpen={true}
          closeModal={handleCloseEdit}
          initialValues={editEmployee}
        />
      )}
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onDeleteConfirmed={handleDeleteConfirmed}
        onClose={handleCancelDelete}
        loading={isDeleting}
      />
    </>
  );
};

export default QuicklySearch;
