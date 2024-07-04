import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import DeleteDialog from "../../Shared/DeleteDialog";
import {
  useDeleteDiscountMutation,
  useGetDiscountsQuery,
} from "../../app/Feature/API/Discount";
import Spinner from "../../Shared/Spinner";
import UpdateDiscount from "../UpdateForm/UpdateDiscount";

const DiscountTable = () => {
  const { data: discounts, refetch } = useGetDiscountsQuery();
  const [deleteDiscountId, setDeleteDiscountId] = useState(null);
  const [deleteDiscount, { isLoading: isDeleting }] =
    useDeleteDiscountMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editDiscount, setEditDiscount] = useState(null);

  const handleEdit = (discountId) => {
    const discountToEdit = discounts.find(
      (discount) => discount.id === discountId
    );
    setEditDiscount(discountToEdit);
  };

  const handleDelete = (discountId) => {
    setDeleteDiscountId(discountId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteDiscount(deleteDiscountId).unwrap();
      setDeleteDiscountId(null);
      setIsDeleteDialogOpen(false);
      refetch();
    } catch (error) {
      console.error("Error deleting discount:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDiscountId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseEdit = () => {
    setEditDiscount(null);
  };

  const columns = [
    {
      name: "discount",
      label: "نوع الخصم",
    },
    {
      name: "price",
      label: "نسبه الخصم",
      options: {
        customBodyRender: (value) => {
          const formattedPrice = `${new Intl.NumberFormat("ar-EG").format(
            value
          )} جنيه`;
          return formattedPrice;
        },
      },
    },
    {
      name: "created_at",
      label: "تاريخ العمليه",
      options: {
        customBodyRender: (value) =>
          new Date(value).toLocaleDateString("ar-EG"),
      },
    },
    {
      name: "updated_at",
      label: "تاريخ التحديث",
      options: {
        customBodyRender: (value) =>
          new Date(value).toLocaleDateString("ar-EG"),
      },
    },
    {
      name: "actions",
      label: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta) => {
          const discountId = discounts[tableMeta.rowIndex].id;
          return (
            <>
              <button onClick={() => handleEdit(discountId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(discountId)}>
                {isDeleting && deleteDiscountId === discountId ? (
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
        text: "صفوف محددة",
        delete: "حذف",
        deleteAria: "حذف الصفوف المحددة",
      },
    },
  };

  return (
    <>
      <MUIDataTable
        title={"تقارير الخصومات الحالية"}
        data={discounts || []}
        columns={columns}
        options={options}
      />
      {editDiscount && (
        <UpdateDiscount
          isOpen={true}
          closeModal={handleCloseEdit}
          initialValues={editDiscount}
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

export default DiscountTable;
