import React, { useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineLoading,
} from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import DeleteDialog from "../../Shared/DeleteDialog";
import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "../../app/Feature/API/Emplyee";
import UpdateEmployee from "../UpdateForm/UpdateEmployee";

const EmployeeTable = () => {
  const { data: employees, refetch } = useGetEmployeesQuery();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] =
    useDeleteEmployeeMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const handleEdit = (employeeId) => {
    const employeeToEdit = employees.find(
      (employee) => employee.id === employeeId
    );
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
      refetch();
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
      name: "employee_name",
      label: "اسم الموظف",
    },
    {
      name: "num",
      label: "رقم البصمة",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const formattedSalary = `${new Intl.NumberFormat("ar-EG").format(
            value
          )}`;
          return formattedSalary;
        },
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
        customBodyRender: (value, tableMeta, updateValue) => {
          const formattedSalary = `${new Intl.NumberFormat("ar-EG").format(
            value
          )} جنيه`;
          return formattedSalary;
        },
      },
    },
    {
      name: "created_at",
      label: "تاريخ البدء",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const startDate = new Date(value);
          const formattedDate = startDate.toLocaleDateString("ar-EG");
          return formattedDate;
        },
      },
    },
    {
      name: "updated_at",
      label: "تاريخ الانتهاء",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const endDate = new Date(value);
          const formattedDate = endDate.toLocaleDateString("ar-EG"); 
          return formattedDate;
        },
      },
    },
    {
      name: "actions",
      label: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const employeeId = employees[tableMeta.rowIndex].id;
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
        title={"تقارير الموظفين"}
        data={employees}
        columns={columns}
        options={options}
      />
      {editEmployee && (
        <UpdateEmployee
          isOpen={true}
          closeModal={handleCloseEdit}
          initialValues={editEmployee}
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

export default EmployeeTable;
