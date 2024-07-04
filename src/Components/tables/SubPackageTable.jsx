import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
  useUpdateSubCategoryMutation,
} from "../../app/Feature/API/SubPackage";
import UpdateSubPackage from "../UpdateForm/UpdateSubPackage";

const SubPackageTable = () => {
  const { data: subPackages, refetch } = useGetSubCategoriesQuery();
  const [deleteSubPackageId, setDeleteSubPackageId] = useState(null);
  const [deleteSubPackage, { isLoading: isDeleting }] =
    useDeleteSubCategoryMutation();
  const [updateSubPackageStatus] = useUpdateSubCategoryMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editSubPackage, setEditSubPackage] = useState(null);
  const [loadingSubPackageId, setLoadingSubPackageId] = useState(null);

  const handleEdit = (subPackageId) => {
    const subPackageToEdit = subPackages.find(
      (subPkg) => subPkg.id === subPackageId
    );
    setEditSubPackage(subPackageToEdit);
  };

  const handleDelete = (subPackageId) => {
    setDeleteSubPackageId(subPackageId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteSubPackage(deleteSubPackageId);
      setDeleteSubPackageId(null);
      setIsDeleteDialogOpen(false);
      refetch();
    } catch (error) {
      console.error("Error deleting subpackage:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteSubPackageId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseEdit = () => {
    setEditSubPackage(null);
  };

  const handleStatusToggle = async (subPackageId, currentStatus) => {
    setLoadingSubPackageId(subPackageId);
    try {
      await updateSubPackageStatus(subPackageId);
      refetch();
    } catch (error) {
      console.error("Error updating subpackage status:", error);
    } finally {
      setLoadingSubPackageId(null);
    }
  };

  const columns = [
    {
      label: "اسم  الباكدج",
      name: "category_id",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          // const formattedSalary = `${new Intl.NumberFormat("ar-EG").format(
          //   value
          // )} جنيه`;
          return value;
        },
      },
    },
    {
      label: "الصنف",
      name: "item",
    },
    {
      label: "سعر  الباكدج",
      name: "price",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const formattedSalary = `${new Intl.NumberFormat("ar-EG").format(
            value
          )} جنيه`;
          return formattedSalary;
        },
      },
    },
    {
      label: "تاريخ العمليه",
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
          const subPackageId = subPackages[tableMeta.rowIndex].id;
          return (
            <>
              <button onClick={() => handleEdit(subPackageId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(subPackageId)}>
                {isDeleting && deleteSubPackageId === subPackageId ? (
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
        title={"الساب باكدجات"}
        data={subPackages || []}
        columns={columns}
        options={options}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onDeleteConfirmed={handleDeleteConfirmed}
        loading={isDeleting}
      />
      {editSubPackage && (
        <UpdateSubPackage
          isOpen={true}
          closeModal={handleCloseEdit}
          initialValues={editSubPackage}
        />
      )}
    </div>
  );
};

export default SubPackageTable;
