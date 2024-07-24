import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { Pagination } from "antd";
import { useSearchStudioQuery } from "../../app/Feature/API/Search";
import { useDeleteStudioMutation, useGetStudiosQuery } from "../../app/Feature/API/Studio";
import UpdateStudio from "../UpdateForm/UpdateStudio";
import { useGetStudioDailyQuery } from "../../app/Feature/API/Daily";
import { IoPrint } from "react-icons/io5";
import PrintInvoice from "../Prints/PrintInvoice";
import { useReactToPrint } from "react-to-print";

const StudioTable = () => {
 const invoiceRef = useRef();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: employees, refetch: refetchEmployees } = useGetStudiosQuery(currentPage);
  const {
    data: searchedEmployees,
    isLoading: loadingSearch,
    refetch: refetchSearchResults,
  } = useSearchStudioQuery(searchQuery);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteStudioMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const { refetch: refetchStudioDaily } = useGetStudioDailyQuery();
  const [printInvoice, setPrintInvoice] = useState(null);

  useEffect(() => {
    if (employees?.data?.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [employees, currentPage]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };


  const handleEdit = async (employeeId) => {
    const employeeToEdit =
      searchQuery === ""
        ? employees.data.find((emp) => emp.id === employeeId)
        : searchedEmployees.studio.find((emp) => emp.id === employeeId);
    setEditEmployee(employeeToEdit);
  };


  
  const handlePrintRef = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const handlePrint = async (employeeId) => {
    const PrintInvoices =
      searchQuery === ""
        ? employees.data.find((emp) => emp.id === employeeId)
        : searchedEmployees.studio.find((emp) => emp.id === employeeId);
  
    setPrintInvoice(PrintInvoices);
  
    setTimeout(() => {
      handlePrintRef();
    }, 300);
  };

  const handleDelete = (employeeId) => {
    setDeleteEmployeeId(employeeId);
    setIsDeleteDialogOpen(true);
    refetchStudioDaily()
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteEmployee(deleteEmployeeId);
      setDeleteEmployeeId(null);
      setIsDeleteDialogOpen(false);
      refetchEmployees(); // Renamed from refetch to refetchEmployees for clarity
      refetchSearchResults(); // Renamed from refetchData to refetchSearchResults for clarity
      refetchStudioDaily()
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteEmployeeId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseEdit = () => {
    setEditEmployee(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setEditEmployee(null);
    refetchSearchResults(); // Renamed from refetchData to refetchSearchResults for clarity
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
      name: "category.name",
      label: "اسم الباكدج",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const studioData = searchQuery === ""
            ? employees?.data?.[tableMeta.rowIndex]
            : searchedEmployees?.studio?.[tableMeta.rowIndex];
          
          return studioData?.category?.name || "";
        },
      },
    },
    {
      name: "name",
      label: "اسم العميل",
    },
    {
      name: "phone",
      label: "رقم الهاتف",
    },
    {
      name: "address",
      label: "العنوان",
    },
    {
      name: "appropriate",
      label: "تاريخ المناسبه",
                    options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString("ar-EG");
          return `${formattedDate}`;
        },
        wrap: 'nowrap',
      },
    },
    {
      name: "receivedDate",
      label: "تاريخ الاستلام",
                    options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString("ar-EG");
          return `${formattedDate}`;
        },
        wrap: 'nowrap',
      },
    },
    {
      name: "notes",
      label: "مرتجع من الباكدج",
    },
    {
      name: "addService",
      label: "الخدمه الاضافيه",
    },
    {
      name: "priceService",
      label: "سعر الخدمه الاضافيه",
            options: {
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
        },
      },
    },
    {
      name: "total",
      label: "الاجمالي",
            options: {
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
        },
      },
    },
    {
      name: "pay",
      label: "المدفوع",
            options: {
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
        },
      },
    },
    {
      name: "rest",
      label: "الباقي",
            options: {
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
        },
      },
    },
    {
      label: "نوع الخصم",
      name: "discount.discount",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const studioData = searchQuery === ""
            ? employees?.data?.[tableMeta.rowIndex]
            : searchedEmployees?.studio?.[tableMeta.rowIndex];
          
          return studioData?.discount?.discount || "";
        },
      },
    },
    {
      label: "نسبه الخصم",
      name: "price",
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
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString("ar-EG");
          const formattedTime = date.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${formattedDate}(${formattedTime})`;
        },
        wrap: 'nowrap',
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
        wrap: 'nowrap',
      },
    },
    {
      name: "actions",
      label: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const adminId = 
          searchQuery
          ? searchedEmployees?.studio?.[tableMeta.rowIndex]?.id
          : employees?.data?.[tableMeta.rowIndex]?.id
          return (
            <>
                         <button onClick={() => handlePrint(adminId)} className="ml-5">
                <IoPrint
                  title="طباعه الفاتوره"
                  className="text-2xl text-black"
                />
              </button>
              <button onClick={() => handleEdit(adminId)} className="ml-5">
                <AiOutlineEdit
                  title="تعديل  البيانات"
                  className="text-2xl text-black"
                />
              </button>
              <button onClick={() => handleDelete(adminId)}>
                {isDeleting && deleteEmployeeId === adminId ? (
                  <Spinner />
                ) : (
                  <AiOutlineDelete
                    title="حذف العنصر"
                    className="text-2xl text-[#ef4444]"
                  />
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
        noMatch: loadingSearch ? "جاري البحث..." : "لا توجد بيانات مطابقة",
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

  const dataToDisplay = searchQuery ? searchedEmployees?.studio : employees?.data;

  return (
    <>
      <div className="mb-4 flex justify-between items-center w-[100%]">
        <input
          type="text"
          placeholder="ابحث اسم العميل"
          className="w-[100%] border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {employees ? (
        <>
          <MUIDataTable
            title={"تقارير الاستوديو"}
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
      <div style={{display:'none'}}>
      <PrintInvoice ref={invoiceRef} employee={printInvoice} />
      </div>
      {editEmployee && (
        <UpdateStudio
          isOpen={true}
          closeModal={handleCloseEdit}
          initialValues={editEmployee}
          refetchSearch={refetchSearchResults}
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

export default StudioTable;
