import React, { useState } from "react";
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

const PackageTable = () => {
  const { data: packages, refetch } = useGetCategoriesQuery();
  const [deletePackageId, setDeletePackageId] = useState(null);
  const [deletePackage, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();
  const [updateCategoryStatus] = useUpdateCategoryStatusMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editPackage, setEditPackage] = useState(null);
  const [loadingPackageId, setLoadingPackageId] = useState(null);

  const handleEdit = (packageId) => {
    const packageToEdit = packages.find((pkg) => pkg.id === packageId);
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
    } catch (error) {
      console.error("Error updating package status:", error);
    } finally {
      setLoadingPackageId(null);
    }
  };

  const columns = [
    {
      label: "اسم الباكدج",
      name: "name",
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
          const packageId = packages[tableMeta.rowIndex].id;
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
        customBodyRender: (value, tableMeta, updateValue) => {
          const startDate = new Date(value);
          return startDate.toLocaleDateString("ar-EG");
        },
      },
    },
    {
      name: "updated_at",
      label: "تاريخ التحديث",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const endDate = new Date(value);
          return endDate.toLocaleDateString("ar-EG");
        },
      },
    },
    {
      name: "actions",
      label: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const packageId = packages[tableMeta.rowIndex].id;
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
    setRowProps: (row, dataIndex, rowIndex) => {
      return {
        style: {
          backgroundColor: rowIndex % 2 === 0 ? "#f5f5f5" : "#ffffff",
        },
      };
    },
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

  return (
    <div className="mt-5">
      <MUIDataTable
        title={"الباكدجات"}
        data={packages || []}
        columns={columns}
        options={options}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onDeleteConfirmed={handleDeleteConfirmed}
        loading={isDeleting}
      />
      {editPackage && (
        <UpdatePackage
          isOpen={true}
          closeModal={handleCloseEdit}
          initialValues={editPackage}
        />
      )}
    </div>
  );
};

export default PackageTable;
