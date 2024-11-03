import React, { useRef, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { useDeleteMakeupMutation } from "../../app/Feature/API/MakeUp";
import UpdateMakeUp from "../UpdateForm/UpdateMakeUp";
import { useGetMakeUpDailyQuery } from "../../app/Feature/API/Daily";
import { IoPrint } from "react-icons/io5";
import PrintInvoice from "../Prints/PrintInvoice";
import { useReactToPrint } from "react-to-print";
import { FaRegEye, FaMoneyBillAlt } from "react-icons/fa";
import MakeUpInstallment from "../Forms/MakeUpInstallment";
import DetailsMakeUp from "./DetailsMakeUp";
import { useLazySearchMakeUpQuery } from "../../app/Feature/API/Search";

const MakeupSearch = () => {
  const invoiceRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [triggerSearch, { isLoading }] = useLazySearchMakeUpQuery();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteMakeupMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [editMakeupInstallMent, setEditMakeupInstallMent] = useState(null);
  const [editMakeupDetails, setEditMakeupDetails] = useState(null);
  const [printInvoice, setPrintInvoice] = useState(null);
  const { refetch: refetchMakeUpDaily } = useGetMakeUpDailyQuery();

  const handleSearchChange = (e) => {
    const name = e.target.value;
    setSearchQuery(name);
  };

  const fetchSearchResults = async () => {
    const result = await triggerSearch(searchQuery);
    setSearchData(result?.data?.makeups?.data || []);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  const handleEdit = (employeeId) => {
    const employeeToEdit = searchData.find((emp) => emp.id === employeeId);
    setEditEmployee(employeeToEdit);
  };

  const handleDetails = (employeeId) => {
    const employeeToEdit = searchData.find((emp) => emp.id === employeeId);
    setEditMakeupDetails(employeeToEdit);
  };

  const handleEditInstallMent = (employeeId) => {
    const employeeToEdit = searchData.find((emp) => emp.id === employeeId);
    setEditMakeupInstallMent(employeeToEdit);

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
    setEditMakeupInstallMent(null);
    setEditMakeupDetails(null);
    await fetchSearchResults();

  };

  const columns = [
    {
      name: '#',
      label: '',
      options: {
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "actions",
      label: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta) => {
          const adminId = searchData[tableMeta.rowIndex]?.id;
          return (
            <>
              <button onClick={() => handlePrint(adminId)} className="ml-5">
                <IoPrint title="طباعه الفاتوره" className="text-2xl text-black" />
              </button>
              <button onClick={() => handleEdit(adminId)} className="ml-5">
                <AiOutlineEdit title="تعديل البيانات" className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDetails(adminId)} className="ml-5">
                <FaRegEye title="عرض البيانات" className="text-2xl text-black" />
              </button>
              <button onClick={() => handleEditInstallMent(adminId)} className="ml-5">
                <FaMoneyBillAlt title="تعديل الاقساط" className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(adminId)}>
                {isDeleting && deleteEmployeeId === adminId ? (
                  <Spinner />
                ) : (
                  <AiOutlineDelete title="حذف العنصر" className="text-2xl text-[#ef4444]" />
                )}
              </button>
            </>
          );
        },
      },
    },
    {
      name: "name",
      label: "اسم العميل",
    },
    {
      name: "category.name",
      label: "اسم الباكدج",
      options: {
        customBodyRender: (value, tableMeta) => searchData[tableMeta.rowIndex]?.category?.name || "",
      },
    },
    {
      name: "total",
      label: "الاجمالي",
      options: {
        customBodyRender: (value) => `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`,
      },
    },
    {
      name: "pay",
      label: "المدفوع",
      options: {
        customBodyRender: (value) => `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`,
      },
    },
    {
      name: "rest",
      label: "الباقي",
      options: {
        customBodyRender: (value) => `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`,
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
          placeholder="ابحث اسم العميل"
          className="w-1/2 border px-6 py-2 rounded-lg mr-2"
          value={searchQuery.clientName}
          onChange={handleSearchChange}
        />
        <button type="submit" className="bg-[#f3c74d] text-black px-6 py-2 rounded-lg text-lg font-semibold flex items-center">
          {isLoading?<Spinner/>:'بحث'}
        </button>
      </form>

      {isLoading ? (
        <div className="mt-[200px] mb-[200px] text-center">
          <Spinner />
        </div>
      ) : (
        <MUIDataTable
          title={"نتائج البحث للميكاب"}
          data={searchData}
          columns={columns}
          options={options}
        />
      )}
      
      <div style={{ display: 'none' }}>
        <PrintInvoice ref={invoiceRef} employee={printInvoice} />
      </div>

      {editEmployee && (
        <UpdateMakeUp
          isOpen={true}
          closeModal={handleCloseEdit}
          initialValues={editEmployee}
        />
      )}
      {editMakeupInstallMent && (
        <MakeUpInstallment
          isOpen={true}
          closeModal={handleCloseEdit}
          initialValues={editMakeupInstallMent}
        />
      )}
      {editMakeupDetails && (
        <DetailsMakeUp
          isOpen={true}
          closeModal={handleCloseEdit}
          initialValues={editMakeupDetails}
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

export default MakeupSearch;
