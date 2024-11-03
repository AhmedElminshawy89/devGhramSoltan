import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { useLazySearchEmployeeQuery } from "../../app/Feature/API/Search";
import UpdateEmployee from "../UpdateForm/UpdateEmployee";
import { useDeleteEmployeeMutation, useGetAllEmployeesQuery } from "../../app/Feature/API/Emplyee";
import Select from "react-select";

const EmployeeSearch = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [triggerSearch, { isLoading: isSearching }] = useLazySearchEmployeeQuery();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteEmployeeMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const { data: allEmployee } = useGetAllEmployeesQuery();

  const fetchSearchResults = async () => {
    const result = await triggerSearch(searchQuery?.value);
    setSearchData(result?.data?.employee || []);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  const handleEdit = (employeeId) => {
    const employeeToEdit = searchData.find((emp) => emp.id === employeeId);
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
      await fetchSearchResults();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteEmployeeId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseEdit = async () => {
    setEditEmployee(null);
    await fetchSearchResults();
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
          const employeeId = searchData[tableMeta.rowIndex]?.id;

          if (employeeId) {
            return (
              <>
                <button onClick={() => handleEdit(employeeId)} className="ml-5">
                  <AiOutlineEdit className="text-2xl text-black" />
                </button>
                <button onClick={() => handleDelete(employeeId)}>
                    <AiOutlineDelete className="text-2xl text-[#ef4444]" />
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
        border: "1px solid #e0e0e0",
      },
    }),
    textLabels: {
      body: {
        noMatch: isSearching ? "جاري البحث..." : "لا توجد بيانات مطابقة",
      },
      pagination: {
        next: "الصفحة التالية",
        previous: "الصفحة السابقة",
      },
    },
  };

  return (
    <>
      <form onSubmit={handleSearchSubmit} className="mb-4 flex justify-start gap-4 items-center w-full max-w-[600px]">
        <Select
          id="employeeName"
          value={searchQuery}
          required
          onChange={setSearchQuery}
          options={
            allEmployee?.map((employee) => ({
              label: employee.employee_name,
              value: employee.employee_name,
            })) || []
          }
          className="flex-1 shadow border-gray-400 rounded"
          placeholder="اختر اسم الموظف"
        />
        <button type="submit" className="bg-[#f3c74d] text-black px-6 py-2 rounded-lg text-lg font-semibold flex items-center">
          {isSearching ? <Spinner /> : 'بحث'}
        </button>
      </form>

      {isSearching ? (
        <div className="mt-[200px] mb-[200px] text-center">
          <Spinner />
        </div>
      ) : (
        <MUIDataTable
          title={searchData.length ? "نتائج البحث للموظفين" : ""}
          data={searchData}
          columns={columns}
          options={options}
        />
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

export default EmployeeSearch;
