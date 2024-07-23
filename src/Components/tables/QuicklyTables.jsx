import React, { useEffect, useRef, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { Pagination } from "antd";
import { useDeleteQuickworkMutation, useGetQuickworksQuery } from "../../app/Feature/API/QuickWorks";
import { useSearchWorkersQuery } from "../../app/Feature/API/Search";
import UpdateWorker from './../UpdateForm/UpdateWorker';
import UpdateQuickWorks from './../UpdateForm/UpdateQuickWorks';
import { IoPrint } from "react-icons/io5";
import PrintInvoice from "../Prints/PrintInvoice";
import { useReactToPrint } from "react-to-print";
import PrintInvoiceQuickWork from "../Prints/PrintInvoiceQuickWork";

const QuicklyTable = () => {
  const invoiceRef = useRef();
  const [printInvoice, setPrintInvoice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: packages, refetch } = useGetQuickworksQuery(currentPage);
  const {
    data: searchedPackages,
    isLoading: loadingSearch,
    refetch: refetchData,
  } = useSearchWorkersQuery(searchQuery);
  const [deletePackageId, setDeletePackageId] = useState(null);
  const [deletePackage, { isLoading: isDeleting }] =
  useDeleteQuickworkMutation();
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
        : searchedPackages.work.find((pkg) => pkg.id === packageId);
    setEditPackage(packageToEdit);
  };

  const handlePrintRef = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const handlePrint = async (packageId) => {
    const packageToInvoice =
      searchQuery === ""
        ? packages.data.find((pkg) => pkg.id === packageId)
        : searchedPackages.work.find((pkg) => pkg.id === packageId);
  
    setPrintInvoice(packageToInvoice);
  
    setTimeout(() => {
      handlePrintRef();
    }, 300);
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
      name:'#',
      label:'',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      label: "اسم الموظف",
      name:'employee.employee_name',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const studioData = searchQuery === ""
            ? packages?.data?.[tableMeta.rowIndex]
            : searchedPackages?.work?.[tableMeta.rowIndex];
          
          return studioData?.employee?.employee_name || "N/A";
        },
      },
    },
    {
      name: "job",
      label: "الشغلانه",
    },
    {
      name: "total",
      label: "السعر",
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
      label: "تاريخ العملية",
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
        customBodyRender: (value, tableMeta) => {
          const discountId =
          searchQuery === ""
            ? packages.data[tableMeta.rowIndex].id
            : searchedPackages?.work[tableMeta.rowIndex]?.id;
          return (
            <>
                         <button onClick={() => handlePrint(discountId)} className="ml-5">
                <IoPrint
                  title="طباعه الفاتوره"
                  className="text-2xl text-black"
                />
              </button>
              <button onClick={() => handleEdit(discountId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(discountId)}>
                {isDeleting && deletePackageId === discountId ? (
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
    ? searchedPackages?.work
    : packages?.data;

  return (
    <>
      <div className="mb-4 flex justify-between items-center w-[100%]">
        <input
          type="text"
          placeholder="ابحث ب اسم الموظف"
          className="w-[100%] border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {packages ? (
        <>
          <MUIDataTable
            title={"الشغل السريع"}
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
        <UpdateQuickWorks
          isOpen={true}
          initialValues={editPackage}
          closeModal={handleCloseEdit}
          refetchSearch={refetchData}
        />
      )}
      <div style={{display:'none'}}>
      <PrintInvoiceQuickWork ref={invoiceRef} employee={printInvoice} />
      </div>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onDeleteConfirmed={handleDeleteConfirmed}
        onClose={handleCancelDelete}
        loading={isDeleting}
      />
    </>
  );
};

export default QuicklyTable;
