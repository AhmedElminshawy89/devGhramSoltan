import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLoading } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { Pagination } from "antd";
import { useSearchEmployeeQuery } from "../../app/Feature/API/Search";
import UpdateEmployee from "./../UpdateForm/UpdateEmployee"; // Corrected path
import { useDeleteEmployeeMutation, useGetEmployeesQuery } from "../../app/Feature/API/Emplyee";

const EmployeeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: employees, refetch: refetchEmployees } = useGetEmployeesQuery(currentPage); // Renamed from packages to employees for clarity
  const {
    data: searchedEmployees,
    isLoading: loadingSearch,
    refetch: refetchSearchResults,
  } = useSearchEmployeeQuery(searchQuery);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null); // Renamed from editPackage to editEmployee for clarity

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
    const employeeToEdit =
      searchQuery === ""
        ? employees.data.find((emp) => emp.id === employeeId)
        : searchedEmployees.employee.find((emp) => emp.id === employeeId);
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
      refetchEmployees(); // Renamed from refetch to refetchEmployees for clarity
      refetchSearchResults(); // Renamed from refetchData to refetchSearchResults for clarity
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setEditEmployee(null);
    refetchSearchResults(); // Renamed from refetchData to refetchSearchResults for clarity
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
      name: "employee_name",
      label: "اسم الموظف",
    },
    {
      name: "num",
      label: "رقم البصمة",
      options: {
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)}`;
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
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
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
          const employee = searchQuery
          ? searchedEmployees?.employee?.[tableMeta.rowIndex]?.id
          : employees?.data?.[tableMeta.rowIndex]?.id
          if (employee) {
            return (
              <>
                <button onClick={() => handleEdit(employee)} className="ml-5">
                  <AiOutlineEdit className="text-2xl text-black" />
                </button>
                <button onClick={() => handleDelete(employee)}>
                  {isDeleting && deleteEmployeeId === employee ? (
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

  const dataToDisplay = searchQuery ? searchedEmployees?.employee : employees?.data;

  return (
    <>
      <div className="mb-4 flex justify-between items-center w-[100%]">
        <input
          type="text"
          placeholder="ابحث اسم الموظف"
          className="w-[100%] border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

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
          refetchSearch={refetchSearchResults}
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
