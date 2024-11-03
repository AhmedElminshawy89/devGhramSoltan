import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLoading } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { Pagination } from "antd";
import UpdateEmployee from "./../UpdateForm/UpdateEmployee"; 
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from "../../app/Feature/API/Emplyee";

const EmployeeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  
  const { data: employees, refetch: refetchEmployees ,isLoading} = useGetEmployeesQuery(currentPage);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    if (employees?.data?.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [employees, currentPage]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };

  const handleEdit = async (employeeId) => {
    const employeeToEdit = employees.data.find((emp) => emp.id === employeeId)
    setEditEmployee(employeeToEdit);
  };

  const handleDelete = (employeeId) => {
    setDeleteEmployeeId(employeeId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteEmployee(deleteEmployeeId);
      setDeleteEmployeeId(null);
      setIsDeleteDialogOpen(false);
      refetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteEmployeeId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseEdit = () => {
    setEditEmployee(null);
  };

  const columns = [
    {
      name: "#",
      label: "",
      options: {
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "employee_name",
      label: "اسم الموظف",
    },
    {
      name: "num",
      label: "رقم البصمة",
      options: {
        customBodyRender: (value) => `${new Intl.NumberFormat("ar-EG").format(value)}`,
      },
    },
    {
      name: "phone",
      label: "رقم التليفون",
    },
    {
      name: "salary",
      label: "الراتب",
      options: {
        customBodyRender: (value) => `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`,
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
          const employeeId = employees?.data?.[tableMeta.rowIndex]?.id;

          if (employeeId) {
            return (
              <>
                <button onClick={() => handleEdit(employeeId)} className="ml-5">
                  <AiOutlineEdit className="text-2xl text-black" />
                </button>
                <button onClick={() => handleDelete(employeeId)}>
                  {isDeleting && deleteEmployeeId === employeeId ? (
                    <AiOutlineLoading className="text-2xl animate-spin" />
                  ) : (
                    <AiOutlineDelete className="text-2xl text-[#ef4444]" />
                  )}
                </button>
              </>
            );
          }
          return null;
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

  const dataToDisplay = employees?.data;

  return (
    <>
      {employees ? (
        <>
          <MUIDataTable
            title={"الموظفين الحاليين"}
            data={dataToDisplay}
            columns={columns}
            options={options}
          />
          <Pagination
            current={currentPage}
            pageSize={employees.per_page}
            total={employees.total}
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

      {editEmployee && (
        <UpdateEmployee
          isOpen={true}
          initialValues={editEmployee}
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

export default EmployeeTable;
