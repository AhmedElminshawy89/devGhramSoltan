import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { useLazySearchAdminQuery } from "../../app/Feature/API/Search";
import { useGetAllEmployeesQuery } from "../../app/Feature/API/Emplyee";
import { useDeleteAdminMutation } from "../../app/Feature/API/Admin";
import { RiLockPasswordFill } from "react-icons/ri";
import UpdateAdmin from "../UpdateForm/UpdateAdmin";
import UpdatePasswordAdmin from "../UpdateForm/UpdatePasswordAdmin";

const AdminSearch = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [triggerSearch, { isLoading: isSearching }] = useLazySearchAdminQuery();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteAdminMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const { data: allEmployee } = useGetAllEmployeesQuery();
  const [updatePasswordValue, setUpdatePasswordValue] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);

  const fetchSearchResults = async () => {
    const result = await triggerSearch(searchQuery);
    setSearchData(result?.data?.admin || []);
    console.log(result?.data?.admin );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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

  const handleCloseUpdatePassword = () => {
    setUpdatePassword(false);
  };
  const handleCancelDelete = () => {
    setDeleteEmployeeId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseEdit = async () => {
    setEditEmployee(null);
    await fetchSearchResults();
  };

  const handleUpdatePassword = (adminId) => {
    const adminToEdit = searchData.find((admin) => admin.id === adminId);
    setUpdatePasswordValue(adminToEdit);
    setUpdatePassword(true);
  };

  const columns = [
    {
      name:'#',
      label:'رقم',
      options: {
        customBodyRender: (value, tableMeta) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
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
        customBodyRender: (value) => value === "admin" ? "تحكم جزئي" : "تحكم كامل",
      },
    },
    {
      name: "created_at",
      label: "تاريخ العملية",
      options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          return `${date.toLocaleDateString("ar-EG")} (${date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })})`;
        },
      },
    },
    {
      name: "updated_at",
      label: "تاريخ التحديث",
      options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          return `${date.toLocaleDateString("ar-EG")} (${date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })})`;
        },
      },
    },
    {
      name: "actions",
      label: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta) => {
          const adminId = searchData[tableMeta.rowIndex]?.id;
          return (
            <>
              <button onClick={() => handleEdit(adminId)} className="ml-5">
                <AiOutlineEdit title="تعديل البيانات" className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(adminId)}>
                {isDeleting && deleteEmployeeId === adminId ? <Spinner /> : <AiOutlineDelete title="حذف العنصر" className="text-2xl text-[#ef4444]" />}
              </button>
              <button onClick={() => handleUpdatePassword(adminId)} className="mr-5">
                <RiLockPasswordFill title="تعديل كلمه المرور" className="text-2xl text-black" />
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
      <form onSubmit={handleSearchSubmit} className="mb-4 flex justify-start gap-4 items-center w-full">
        <input
          type="text"
          placeholder="ابحث بالاسم"
          className="w-1/2 border px-6 py-2 rounded-lg mr-2"
          value={searchQuery || ""}
          onChange={handleSearchChange}
        />
        <button type="submit" className="bg-[#20b2aa] text-white px-6 py-2 rounded-lg text-lg font-semibold flex items-center">
          {isSearching ? <Spinner /> : 'بحث'}
        </button>
      </form>

      {isSearching ? (
        <div className="mt-[200px] mb-[200px] text-center">
          <Spinner />
        </div>
      ) : (
        <MUIDataTable
          title={searchData.length ? "نتائج البحث للسلف" : ""}
          data={searchData}
          columns={columns}
          options={options}
        />
      )}

      {editEmployee && (
        <UpdateAdmin
          isOpen={true}
          initialValues={editEmployee}
          closeModal={handleCloseEdit}
        />
      )}
      {updatePassword && (
        <UpdatePasswordAdmin
          isOpen={true}
          closeModal={handleCloseUpdatePassword}
          initialValues={updatePasswordValue}
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

export default AdminSearch;
