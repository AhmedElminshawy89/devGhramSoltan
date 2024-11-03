import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { Pagination } from "antd";
import {
  useDeleteLoanMutation,
  useGetLoansQuery,
} from "../../app/Feature/API/Loans";
import UpdateLoans from "../UpdateForm/UpdateLoans";
import { OnlineStatusContext } from "../../Provider/OnlineStatusProvider";
import { useDispatch, useSelector } from "react-redux";
import { setOfflineLoans } from "../../app/Feature/offlineSlice";

const LoansTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const { data: loansOnline, refetch: refetchLoansOnline ,isLoading} =
    useGetLoansQuery(currentPage);
  const [deleteLoanId, setDeleteLoanId] = useState(null);
  const [deleteLoan, { isLoading: isDeleting }] = useDeleteLoanMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editLoan, setEditLoan] = useState(null);
  const isOnline = useContext(OnlineStatusContext);

  const loansOffline = useSelector((state) => state.offlineLoans.loans) || [ ];
  const dispatch = useDispatch();

  useEffect(() => {
    if (loansOnline?.data?.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [loansOnline, currentPage]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };

  const handleEdit = async (loanId) => {
    let loanToEdit;
    if (isOnline) {
      loanToEdit = loansOnline.data.find((loan) => loan.id === loanId)
    } else {
      loanToEdit = loansOffline.find((loan) => loan.id === loanId);
    }
    setEditLoan(loanToEdit);
  };

  const handleDelete = (loanId) => {
    setDeleteLoanId(loanId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      if (isOnline) {
        await deleteLoan(deleteLoanId);
        refetchLoansOnline();
      } else {
        const updatedLoans = loansOffline.filter(
          (loan) => loan.id !== deleteLoanId
        );
        dispatch(setOfflineLoans(updatedLoans));
        localStorage.setItem("backuploans", JSON.stringify(updatedLoans));
      }
      setDeleteLoanId(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting loan:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteLoanId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseEdit = () => {
    setEditLoan(null);
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
    {
      name: "actions",
      label: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta) => {
          const loanId = isOnline
            ? loansOnline?.data?.[tableMeta.rowIndex]?.id
            : loansOffline?.[tableMeta.rowIndex]?.id;
          return (
            <>
              <button onClick={() => handleEdit(loanId)} className="ml-5">
                <AiOutlineEdit
                  title="تعديل البيانات"
                  className="text-2xl text-black"
                />
              </button>
              <button onClick={() => handleDelete(loanId)}>
                {isDeleting && deleteLoanId === loanId ? (
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
      },
    }),
    textLabels: {
      body: {
        noMatch: isLoading
          ? "جاري البحث..."
          : "لا توجد بيانات مطابقة",
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

  const optionsOffline = {
    filterType: "dropdown",
    selectableRows: "none",
    sort: false,
    pagination: true,
    search: true,
    setRowProps: (row, dataIndex, rowIndex) => ({
      style: {
        backgroundColor: rowIndex % 2 === 0 ? "#f5f5f5" : "#ffffff",
      },
    }),
    textLabels: {
      body: {
        noMatch: isLoading
          ? "جاري البحث..."
          : "لا توجد بيانات مطابقة",
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

  const dataToDisplay = loansOnline?.data || loansOffline;

  return (
    <>

      {isOnline ? (
        loansOnline ? (
          <>
            <MUIDataTable
              title={"السلف"}
              data={dataToDisplay}
              columns={columns}
              options={options}
            />
            <Pagination
              current={currentPage}
              pageSize={loansOnline.per_page}
              total={loansOnline.total}
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
        )
      ) : (
        <MUIDataTable
          title={"السلف"}
          data={loansOffline}
          columns={columns}
          options={optionsOffline}
        />
      )}
      {editLoan && (
        <UpdateLoans
          isOpen={true}
          initialValues={editLoan}
          closeModal={handleCloseEdit}
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

export default LoansTable;
