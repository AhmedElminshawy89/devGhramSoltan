import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLoading } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import {
  useGetAdminsQuery,
  useDeleteAdminMutation,
} from "../../app/Feature/API/Admin";
import UpdateAdmin from "../../Components/UpdateForm/UpdateAdmin";
import DeleteDialog from "../../Shared/DeleteDialog";

const AdminTable = () => {
  const { data: admins, refetch } = useGetAdminsQuery();
  const [deleteAdminId, setDeleteAdminId] = useState(null);
  const [deleteAdmin, { isLoading: isDeleting }] = useDeleteAdminMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);

  const handleEdit = (adminId) => {
    const adminToEdit = admins.find((admin) => admin.id === adminId);
    setEditAdmin(adminToEdit);
  };

  const handleDelete = (adminId) => {
    setDeleteAdminId(adminId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteAdmin(deleteAdminId);
      setDeleteAdminId(null);
      setIsDeleteDialogOpen(false);
      refetch();
    } catch (error) {
      // console.error("Error deleting admin:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteAdminId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseEdit = () => {
    setEditAdmin(null);
  };

  const columns = [
    {
      name: "name",
      label: "الاسم",
    },
    {
      name: "email",
      label: "البريد الالكتروني",
    },
    {
      name: "phone",
      label: "رقم الهاتف",
    },
    {
      name: "type",
      label: "نوع الادمن",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const adminType = value.toLowerCase();
          let displayText = "";
          if (adminType === "admin") {
            displayText = "تحكم جزئي";
          } else if (adminType === "super_admin") {
            displayText = "تحكم كامل";
          }
          return <span>{displayText}</span>;
        },
      },
    },
    {
      name: "created_at",
      label: "تاريخ العملية",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const createdAt = new Date(value);
          const formattedDate = createdAt.toLocaleDateString("ar-EG");
          return formattedDate;
        },
      },
    },
    {
      name: "updated_at",
      label: "تاريخ التعديل",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const updatedAt = new Date(value);
          const formattedDate = updatedAt.toLocaleDateString("ar-EG");
          return formattedDate;
        },
      },
    },
    {
      name: "actions",
      label: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const adminId = admins[tableMeta.rowIndex].id;
          return (
            <>
              <button onClick={() => handleEdit(adminId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(adminId)}>
                {isDeleting && deleteAdminId === adminId ? (
                  <AiOutlineLoading className="text-2xl animate-spin" />
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
        text: "صفوف محددة",
        delete: "حذف",
        deleteAria: "حذف الصفوف المحددة",
      },
    },
  };

  return (
    <>
      <MUIDataTable
        title={"تقارير الأدمن"}
        data={admins}
        columns={columns}
        options={options}
      />
      {editAdmin && (
        <UpdateAdmin
          isOpen={true}
          closeModal={handleCloseEdit}
          initialValues={editAdmin}
        />
      )}
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onDeleteConfirmed={handleDeleteConfirmed}
        loading={isDeleting}
      />
    </>
  );
};

export default AdminTable;
