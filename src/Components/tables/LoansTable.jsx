import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { Pagination } from "antd";
import { useSearchLoansQuery } from "../../app/Feature/API/Search";
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
  const [perPage, setPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: loansOnline, refetch: refetchLoansOnline } =
    useGetLoansQuery(currentPage);
  const {
    data: searchedLoansOnline,
    isLoading: loadingSearchOnline,
    refetch: refetchSearchResultsOnline,
  } = useSearchLoansQuery(searchQuery);
  const [deleteLoanId, setDeleteLoanId] = useState(null);
  const [deleteLoan, { isLoading: isDeleting }] = useDeleteLoanMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editLoan, setEditLoan] = useState(null);
  const isOnline = useContext(OnlineStatusContext);

  const loansOffline = useSelector((state) => state.offlineLoans.loans) || [ ];
  const dispatch = useDispatch();


  useEffect(() => {
    const syncOfflineLoans = async () => {
      if (!isOnline && loansOffline.length === 0) {
        const offlineData = JSON.parse(localStorage.getItem("backuploans")) || [];
        dispatch(setOfflineLoans(offlineData));
      } else if (isOnline && loansOffline.length > 0) {
        const updatedLoans = [];
        for (const loan of loansOffline) {
          try {
            await saveLoan(loan);
            updatedLoans.push(loan.id);
          } catch (error) {
            console.error("Failed to sync loan:", error);
          }
        }
        const remainingLoans = loansOffline.filter(
          (item) => !updatedLoans.includes(item.id)
        );
        dispatch(setOfflineLoans(remainingLoans));
        localStorage.setItem("backuploans", JSON.stringify(remainingLoans));
      }
    };

    syncOfflineLoans();
  }, [isOnline]);
  

  const saveLoan = async (loan) => {
    try {
      await saveLoan(loan);
      const updatedLoans = loansOffline.filter((item) => item.id !== loan.id);
      dispatch(setOfflineLoans(updatedLoans));
      localStorage.setItem("backuploans", JSON.stringify(updatedLoans));
    } catch (error) {
      console.error("Failed to sync loan:", error);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };

  const handleEdit = async (loanId) => {
    let loanToEdit;
    if (isOnline) {
      loanToEdit =
        searchQuery === ""
          ? loansOnline.data.find((loan) => loan.id === loanId)
          : searchedLoansOnline?.loan.find((loan) => loan.id === loanId);
    } else {
      loanToEdit = loansOffline.find((loan) => loan.id === loanId);
    }
    setEditLoan(loanToEdit);
    // console.log('loans_offline',loansOffline.id)
    // console.log('offline',loanToEdit)
    // console.log('offlineId',loanId)
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
        refetchSearchResultsOnline();
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    refetchSearchResultsOnline();
  };
  const columns = [
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
            ? searchQuery
              ? searchedLoansOnline?.loan?.[tableMeta.rowIndex]?.id
              : loansOnline?.data?.[tableMeta.rowIndex]?.id
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
        noMatch: loadingSearchOnline
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
        noMatch: loadingSearchOnline
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

  const dataToDisplay = searchQuery
    ? searchedLoansOnline?.loan
    : loansOnline?.data || loansOffline;

  return (
    <>
      {isOnline && (
        <div className="mb-4 flex justify-between items-center w-[100%]">
          <input
            type="text"
            placeholder="ابحث اسم الموظف"
            className="w-[100%] border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      )}
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
              pageSize={perPage}
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
          refetchSearch={refetchSearchResultsOnline}
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
