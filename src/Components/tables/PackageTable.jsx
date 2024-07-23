import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryStatusMutation,
} from "../../app/Feature/API/Package";
import DeleteDialog from "../../Shared/DeleteDialog";
import UpdatePackage from "../UpdateForm/UpdatePackage";
import { Pagination } from "antd";
import { useSearchCategoryQuery } from "../../app/Feature/API/Search";
import { useGetSubCategoriesQuery } from "../../app/Feature/API/SubPackage";

const PackageTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: packages, refetch } = useGetCategoriesQuery(currentPage);
  const { refetch:refetchSubPackage } = useGetSubCategoriesQuery(currentPage);
  const { data: searchedPackages, isLoading: loadingSearch, refetch: refetchSearch } =
    useSearchCategoryQuery(searchQuery);
  const [deletePackageId, setDeletePackageId] = useState(null);
  const [deletePackage, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [updateCategoryStatus] = useUpdateCategoryStatusMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editPackage, setEditPackage] = useState(null);
  const [loadingPackageId, setLoadingPackageId] = useState(null);

  useEffect(() => {
    if (packages?.data?.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [packages, currentPage]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };

  const handleEdit = (packageId) => {
    const packageToEdit =
      searchQuery === ""
        ? packages.data.find((pkg) => pkg.id === packageId)
        : searchedPackages?.category.find((pkg) => pkg.id === packageId);
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
      refetchSearch();
      refetchSubPackage();
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

  const handleStatusToggle = async (packageId, currentStatus) => {
    setLoadingPackageId(packageId);
    try {
      await updateCategoryStatus(packageId);
      refetch();
      refetchSearch();
      refetchSubPackage();
    } catch (error) {
      console.error("Error updating package status:", error);
    } finally {
      setLoadingPackageId(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset page to 1 when search query changes
    refetchSearch();
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
      label: "اسم الباكدج",
      name: "name",
    },
    {
      label: "نوع الباكدج",
      name: "type",
    },
    {
      label: "صورة الباكدج",
      name: "photo",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return (
            <img
              src={value}
              alt="package"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          );
        },
      },
    },
    {
      label: "وصف الباكدج",
      name: "desc",
      options: {
        customBodyRender: (value) => {
          return (
            <div style={{ whiteSpace: 'break-spaces',minWidth:'400px' }}>
              {value}
            </div>
          );
        },
      },
    },
    {
      label: "سعر الباكدج",
      name: "price",
    },
    {
      label: "حالة العرض",
      name: "status",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const packageId = (packages?.data || searchedPackages?.category)?.[
            tableMeta.rowIndex
          ]?.id;
          const isLoading = loadingPackageId === packageId;
          return (
            <button
              onClick={() => handleStatusToggle(packageId, value)}
              className={`${
                isLoading ? "py-1 px-1 pb-1" : "py-1 px-4"
              } font-semibold text-lg rounded-full whitespace-nowrap ${
                value === "off"
                  ? "bg-black text-white"
                  : "bg-[#f3c74d] text-black"
              }`}
            >
              {isLoading ? (
                <Spinner />
              ) : value === "off" ? (
                "لم يتم العرض"
              ) : (
                "تم العرض"
              )}
            </button>
          );
        },
      },
    },
    {
      label: "تاريخ البداية",
      name: "created_at",
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
        customBodyRender: (value, tableMeta, updateValue) => {
          const packageId = (packages?.data || searchedPackages?.category)?.[
            tableMeta.rowIndex
          ]?.id;
          return (
            <>
              <button onClick={() => handleEdit(packageId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(packageId)}>
                {isDeleting && deletePackageId === packageId ? (
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
    setRowProps: (row, dataIndex, rowIndex) => {
      return {
        style: {
          backgroundColor: rowIndex % 2 === 0 ? "#f5f5f5" : "#ffffff",
        },
      };
    },
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
    ? searchedPackages?.category
    : packages?.data;
  return (
    <>
      <div className="mb-4 flex justify-between items-center w-[100%]">
        <input
          type="text"
          placeholder="ابحث ب اسم الباكدج"
          className=" w-[100%] border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {packages ? (
        <>
          <MUIDataTable
            title={"الباكدجات"}
            data={dataToDisplay}
            columns={columns}
            options={options}
          />
          <Pagination
            current={currentPage}
            pageSize={packages.per_page}
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
        <UpdatePackage
          isOpen={true}
          initialValues={editPackage}
          closeModal={handleCloseEdit}
          refetchSearch = {refetchSearch}
      refetchSubPackage={refetchSubPackage}
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

export default PackageTable;
