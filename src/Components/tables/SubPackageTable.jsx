import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import UpdateSubPackage from "../UpdateForm/UpdateSubPackage";
import { Pagination } from "antd";
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
} from "../../app/Feature/API/SubPackage";

const SubPackageTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const { data: packages, refetch ,isLoading} = useGetSubCategoriesQuery(currentPage);
  const [deletePackageId, setDeletePackageId] = useState(null);
  const [deletePackage, { isLoading: isDeleting }] =
    useDeleteSubCategoryMutation();
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
    const packageToEdit = packages.data.find((pkg) => pkg.id === packageId)
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
      name: "category.data.name",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowData = packages.data
          const subPackage = rowData[tableMeta.rowIndex];
          return subPackage?.category?.name || "";
        },
      },
    },
    {
      label: "نوع الباكدج",
      name: "category.data.type",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowData =  packages.data 
          const subPackage = rowData[tableMeta.rowIndex];
          return subPackage?.category?.type || "";
        },
      },
    },
    {
      label: "الصنف",
      name: "item",
    },
    {
      label: "سعر الباكدج",
      name: "price",
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
      label: "تاريخ العملية",
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
      label: "تاريخ التحديث",
      name: "updated_at",
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
        customBodyRender: (value, tableMeta) => {
          const packageId = packages.data[tableMeta.rowIndex].id
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
    setRowProps: (row, dataIndex, rowIndex) => ({
      style: {
        backgroundColor: rowIndex % 2 === 0 ? "#f5f5f5" : "#ffffff",
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

  const dataToDisplay = packages?.data;

  return (
    <>
      {packages ? (
        <>
          <MUIDataTable
            title={"الباكدجات الفرعيه"}
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
        <UpdateSubPackage
          isOpen={true}
          initialValues={editPackage}
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

export default SubPackageTable;