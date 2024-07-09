import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { Pagination } from "antd";
import { useDeleteWorkerMutation, useGetWorkersQuery } from "../../app/Feature/API/Workers";
import UpdateWorker from './../UpdateForm/UpdateWorker';
import { useSearchJobQuery } from "../../app/Feature/API/Search";

const WorkTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: packages, refetch } = useGetWorkersQuery(currentPage);
  const {
    data: searchedPackages,
    isLoading: loadingSearch,
    refetch: refetchData,
  } = useSearchJobQuery(searchQuery);
  const [deletePackageId, setDeletePackageId] = useState(null);
  const [deletePackage, { isLoading: isDeleting }] =
    useDeleteWorkerMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editPackage, setEditPackage] = useState(null);

  useEffect(() => {
    if (packages?.data?.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [packages, currentPage]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };

  const handleEdit = async (packageId) => {
    const packageToEdit =
      searchQuery === ""
        ? packages.data.find((pkg) => pkg.id === packageId)
        : searchedPackages.job.find((pkg) => pkg.id === packageId);
    setEditPackage(packageToEdit);
  };

  const handleDelete = (packageId) => {
    setDeletePackageId(packageId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deletePackage(deletePackageId);
      setDeletePackageId(null);
      setIsDeleteDialogOpen(false);
      refetch();
      refetchData();
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeletePackageId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseEdit = () => {
    setEditPackage(null);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setEditPackage(null);
    refetchData();
  };

  const columns = [
    {
      name: "name",
      label: "الاسم",
    },
    {
      name: "price",
      label: "السعر",
      options: {
        customBodyRender: (value) => {
          const formattedSalary = `${new Intl.NumberFormat("ar-EG").format(
            value
          )} جنيه`;
          return formattedSalary;
        },
      },
    },
    {
      name: "created_at",
      label: "تاريخ العمليه",
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
      name: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta) => {
          const workerId = (packages?.data || searchedPackages?.job)?.[
            tableMeta.rowIndex
          ]?.id;
          return (
            <>
              <button onClick={() => handleEdit(workerId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(workerId)}>
                {isDeleting && deletePackageId === workerId ? (
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

  const dataToDisplay = searchQuery
    ? searchedPackages?.job
    : packages?.data;

  return (
    <>
      <div className="mb-4 flex justify-between items-center w-[100%]">
        <input
          type="text"
          placeholder="ابحث ب اسم الشغل"
          className="w-[100%] border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {packages ? (
        <>
          <MUIDataTable
            title={"الشغل الاضافي"}
            data={dataToDisplay}
            columns={columns}
            options={options}
          />
          <Pagination
            current={currentPage}
            pageSize={perPage}
            total={packages.total}
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

      {editPackage && (
        <UpdateWorker
          isOpen={true}
          initialValues={editPackage}
          closeModal={handleCloseEdit}
          refetchSearch={refetchData}
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

export default WorkTable;
