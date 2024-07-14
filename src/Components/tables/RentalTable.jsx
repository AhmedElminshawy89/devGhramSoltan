import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import { useContext, useState } from "react";
import {
  useDeleteRentsMutation,
  useGetRentsQuery,
  useUpdateRentsStatusMutation,
} from "../../app/Feature/API/Rents";
import { OnlineStatusContext } from "../../Provider/OnlineStatusProvider";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateCategoryStatusMutation } from "../../app/Feature/API/Package";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { Pagination } from "antd";
import { setOfflineRents } from "../../app/Feature/offlineRentsSlice";
import UpdateRental from "../UpdateForm/UpdateRents";

const RentalTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: loansOnline, refetch: refetchLoansOnline } =
    useGetRentsQuery(currentPage);
  const [deleteLoanId, setDeleteLoanId] = useState(null);
  const [deleteLoan, { isLoading: isDeleting }] = useDeleteRentsMutation();
  const [updateCategoryStatus,{isLoading:LoadingStatus}] = useUpdateRentsStatusMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editLoan, setEditLoan] = useState(null);
  const [loadingPackageIds, setLoadingPackageIds] = useState([]); 

  const isOnline = useContext(OnlineStatusContext);
  const dispatch = useDispatch();
  const offlineRents = useSelector((state) => state.offlineRents.rents) || [];

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
          : "";
    } else {
      loanToEdit = offlineRents.find((loan) => loan.id === loanId);
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
        const updatedLoans = offlineRents.filter(
          (loan) => loan.id !== deleteLoanId
        );
        dispatch(setOfflineRents(updatedLoans));
        localStorage.setItem("backuprents", JSON.stringify(updatedLoans));
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

  const handleStatusToggle = async (rentId) => {
    setLoadingPackageIds((prev) => [...prev, rentId]);

    try {
      const response = await updateCategoryStatus(rentId).unwrap();
      if (response.success) {
        refetchLoansOnline();
      } else {
        console.error("Error updating package status:", response.message);
      }
    } catch (error) {
      console.error("Error updating package status:", error);
    } finally {
      setLoadingPackageIds((prev) => prev.filter((id) => id !== rentId));
    }
  };
  
  

  const columns = [
    { label: "الاسم", name: "name" },
    { label: "الاسماء المستعاره", name: "category" },
    { label: "نوع التامين", name: "type_insurance" },
    { label: "قيمه التامين", name: "insurance" },
    {
      label: "الحاله",
      name: "status",
      options: {
        customBodyRender: (value, tableMeta) => {
          const packageId = loansOnline?.data?.[tableMeta.rowIndex]?.id;
          const isLoading = loadingPackageIds.includes(packageId);

          return (
            <button
              onClick={() => handleStatusToggle(packageId)}
              className={`${
                isLoading ? "py-1 px-1 pb-1" : "py-1 px-4"
              } font-semibold text-lg rounded-full whitespace-nowrap ${
                value === "لم يتم الاسترجاع"
                  ? "bg-black text-white"
                  : "bg-[#f3c74d] text-black"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner />
              ) : value === "لم يتم الاسترجاع" ? (
                "لم يتم الاسترجاع"
              ) : (
                "تم الاسترجاع"
              )}
            </button>
          );
        },
      },
    },
    {
      name: "created_at",
      label: "تاريخ الايجار",
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
      name: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const loanId =
            loansOnline?.data[rowIndex]?.id || offlineRents[rowIndex]?.id;

          return (
            <>
              <button onClick={() => handleEdit(loanId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(loanId)}>
                <AiOutlineDelete className="text-2xl text-[#ef4444]" />
              </button>
            </>
          );
        },
      },
    },
  ];

  const columnsOffline = [  
    { label: "الاسم", name: "name" },
    { label: "الاسماء المستعاره", name: "category" },
    { label: "نوع التامين", name: "type_insurance" },
    { label: "قيمه التامين", name: "insurance" },
    {
      label: "الحاله",
      name: "status",
      options: {
        customBodyRender: (value, tableMeta) => {
          const packageId = loansOnline?.data?.[tableMeta.rowIndex]?.id;
          const isLoading = loadingPackageIds.includes(packageId);

          return (
            <p  
              className={`${
                isLoading ? "py-1 px-1 pb-1" : "py-1 px-4"
              } font-semibold text-lg rounded-full whitespace-nowrap ${
                value === "لم يتم الاسترجاع"
                  ? "bg-black text-white"
                  : "bg-[#f3c74d] text-black"
              }`}
            >
              {isLoading ? (
                <Spinner />
              ) : value === "لم يتم الاسترجاع" ? (
                "لم يتم الاسترجاع"
              ) : (
                "تم الاسترجاع"
              )}
            </p>
          );
        },
      },
    },
    {
      name: "created_at",
      label: "تاريخ الايجار",
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
      name: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const loanId =offlineRents[rowIndex]?.id;

          return (
            <>
              <button onClick={() => handleEdit(loanId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(loanId)}>
                <AiOutlineDelete className="text-2xl text-[#ef4444]" />
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
        noMatch: "لا توجد بيانات مطابقة",
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
        noMatch:  "لا توجد بيانات مطابقة",
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

  // const dataToDisplay = searchQuery
  //   ? loansOnline?.data
  //   : loansOnline?.data || offlineRents;

  return (
    <>
      {isOnline ? (
        loansOnline ? (
          <>
            <MUIDataTable
              title={"الايجارات"}
              data={loansOnline?.data}
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
          title={"الايجارات"}
          data={offlineRents}
          columns={columnsOffline}
          options={optionsOffline}
        />
      )}
      {editLoan && (
        <UpdateRental
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

export default RentalTable;
