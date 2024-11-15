import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { Pagination } from "antd";
import { useDeleteMakeupMutation, useGetMakeupsQuery } from "../../app/Feature/API/MakeUp";
import UpdateMakeUp from "../UpdateForm/UpdateMakeUp";
import { useGetMakeUpDailyQuery } from "../../app/Feature/API/Daily";
import { IoPrint } from "react-icons/io5";
import PrintInvoice from "../Prints/PrintInvoice";
import { useReactToPrint } from "react-to-print";
import { FaRegEye, FaMoneyBillAlt  } from "react-icons/fa";
import MakeUpInstallment from "../Forms/MakeUpInstallment";
import DetailsMakeUp from "./DetailsMakeUp";

const MakeUpTable = () => {
  const invoiceRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: employees, refetch: refetchEmployees ,isLoading} = useGetMakeupsQuery({page:currentPage,search:searchQuery});
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteMakeupMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [editMakeupInstallMent, setEditMakeupInstallMent] = useState(null);
  const [editMakeupDetails, setEditMakeupDetails] = useState(null);
  const [printInvoice, setPrintInvoice] = useState(null);
  const { refetch: refetchMakeUpDaily } = useGetMakeUpDailyQuery();

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
       employees.data.find((emp) => emp.id === employeeId)
    setEditEmployee(employeeToEdit);
  };
  const handleDetails = async (employeeId) => {
    const employeeToEdit =
       employees.data.find((emp) => emp.id === employeeId)
       setEditMakeupDetails(employeeToEdit);
  };

  const handleEditInstallMent = async (employeeId) => {
    const employeeToEdit =
    employees.data.find((emp) => emp.id === employeeId)
    setEditMakeupInstallMent(employeeToEdit);
  };

  const handlePrintRef = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const handlePrint = async (employeeId) => {
    const PrintInvoices =
    employees.data.find((emp) => emp.id === employeeId)

  
    setPrintInvoice(PrintInvoices);
  
    setTimeout(() => {
      handlePrintRef();
    }, 300);
  };
  


  const handleDelete = (employeeId) => {
    setDeleteEmployeeId(employeeId);
    setIsDeleteDialogOpen(true);
    refetchMakeUpDaily()
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteEmployee(deleteEmployeeId);
      setDeleteEmployeeId(null);
      setIsDeleteDialogOpen(false);
      refetchEmployees();
      refetchMakeUpDaily()
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
    setEditMakeupInstallMent(null);
    setEditMakeupDetails(null);
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
      name: "actions",
      label: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const adminId = employees?.data?.[tableMeta.rowIndex]?.id
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
              <button onClick={() => handleDetails(adminId)} className="ml-5">
                <FaRegEye
                  title="عرض  البيانات"
                  className="text-2xl text-black"
                />
              </button>
              <button onClick={() => handleEditInstallMent(adminId)} className="ml-5">
                <FaMoneyBillAlt 
                  title="تعديل  الاقساط"
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
    {
      name: "name",
      label: "اسم العميل",
    },
    {
      name: "category.name",
      label: "اسم الباكدج",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const studioData =employees?.data?.[tableMeta.rowIndex]
          
          return studioData?.category?.name || "";
        },
      },
    },
    // {
    //   name: "phone",
    //   label: "رقم الهاتف",
    // },
    // {
    //   name: "address",
    //   label: "العنوان",
    // },
    // {
    //   name: "appropriate",
    //   label: "تاريخ المناسبه",
    //                 options: {
    //     customBodyRender: (value) => {
    //       const date = new Date(value);
    //       const formattedDate = date.toLocaleDateString("ar-EG");
    //       return `${formattedDate}`;
    //     },
    //     wrap: 'nowrap',
    //   },
    // },
    // {
    //   name: "notes",
    //   label: "مرتجع من الباكدج",
    //   options: {
    //     customBodyRender: (value) => {
    //       if (!value || value.length === 0) {
    //         return 'لا يوجد';
    //       }
    //       return `${value.map((e) => e.key).join(', ')}`;
    //     },
    //     wrap: 'nowrap',
    //   }
      
    // },
    // {
    //   name: "addService",
    //   label: "الخدمه الاضافيه",
    // },
    // {
    //   name: "priceService",
    //   label: "سعر الخدمه الاضافيه",
    //         options: {
    //     customBodyRender: (value) => {
    //       return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
    //     },
    //   },
    // },
    {
      name: "total",
      label: "الاجمالي",
            options: {
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
        },
      },
    },
    // {
    //   name: "pay",
    //   label: "المدفوع",
    //         options: {
    //     customBodyRender: (value) => {
    //       return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
    //     },
    //   },
    // },
    {
      name: "totalPaid",
      label: "إجمالي المدفوع",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const studioData = employees?.data?.[tableMeta.rowIndex];
          const pay = studioData?.pay ? parseFloat(studioData.pay) : 0;
          const secondInstallment = studioData?.secondInstallment ? parseFloat(studioData.secondInstallment) : 0;
          const thirdInstallment = studioData?.thirdInstallment ? parseFloat(studioData.thirdInstallment) : 0;
          const totalPaid = pay + secondInstallment + thirdInstallment;
  
          return `${new Intl.NumberFormat("ar-EG").format(totalPaid)} جنيه`;
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
    // {
    //   label: "نوع الخصم",
    //   name: "discount.discount",
    //   options: {
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       const studioData = searchQuery === ""
    //         ? employees?.data?.[tableMeta.rowIndex]
    //         : searchedEmployees?.studio?.[tableMeta.rowIndex];
          
    //       return studioData?.discount?.discount || "";
    //     },
    //   },
    // },
    // {
    //   label: "نسبه الخصم",
    //   name: "price",
    //         options: {
    //     customBodyRender: (value) => {
    //       return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
    //     },
    //   },
    // },
    // {
    //   name: "created_at",
    //   label: "تاريخ العملية",
    //   options: {
    //     customBodyRender: (value) => {
    //       const date = new Date(value);
    //       const formattedDate = date.toLocaleDateString("ar-EG");
    //       const formattedTime = date.toLocaleTimeString("ar-EG", {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //       });
    //       return `${formattedDate}(${formattedTime})`;
    //     },
    //     wrap: 'nowrap',
    //   },
    // },
    // {
    //   name: "updated_at",
    //   label: "تاريخ التحديث",
    //   options: {
    //     customBodyRender: (value) => {
    //       const date = new Date(value);
    //       const formattedDate = date.toLocaleDateString("ar-EG");
    //       const formattedTime = date.toLocaleTimeString("ar-EG", {
    //         hour: "2-digit",
    //         minute: "2-digit",
    //       });
    //       return `${formattedDate}(${formattedTime})`;
    //     },
    //     wrap: 'nowrap',
    //   },
    // },
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

  const dataToDisplay = employees?.data;

  return (
    <>
      {employees ? (
        <>
          <MUIDataTable
            title={"تقارير ميكاب"}
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

export default MakeUpTable;
