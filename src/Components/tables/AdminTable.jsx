import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { Pagination } from "antd";
import { useSearchAdminQuery } from "../../app/Feature/API/Search";
import { useDeleteAdminMutation, useGetAdminsQuery } from "../../app/Feature/API/Admin";
import UpdateAdmin from './../UpdateForm/UpdateAdmin';
import { RiLockPasswordFill } from 'react-icons/ri';
import UpdatePasswordAdmin from './../UpdateForm/UpdatePasswordAdmin';

const AdminTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: employees, refetch: refetchEmployees } = useGetAdminsQuery(currentPage); // Renamed from packages to employees for clarity
  const {
    data: searchedEmployees,
    isLoading: loadingSearch,
    refetch: refetchSearchResults,
  } = useSearchAdminQuery(searchQuery);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteAdminMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null); // Renamed from editPackage to editEmployee for clarity
  const [updatePasswordValue, setUpdatePasswordValue] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);

  useEffect(() => {
    if (employees?.data?.length === 0 && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [employees, currentPage]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };
  const handleUpdatePassword = (adminId) => {
    const adminToEdit = employees?.data?.find((admin) => admin.id === adminId);
    setUpdatePasswordValue(adminToEdit);
    setUpdatePassword(true);
  };

  const handleCloseUpdatePassword = () => {
    setUpdatePassword(false);
  };

  const handleEdit = async (employeeId) => {
    const employeeToEdit =
      searchQuery === ""
        ? employees.data.find((emp) => emp.id === employeeId)
        : searchedEmployees.admin.find((emp) => emp.id === employeeId);
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
        customBodyRender: (value, tableMeta, updateValue) => {
          const adminId = (employees?.data || searchedEmployees?.admin)?.[
            tableMeta.rowIndex
          ]?.id;
          return (
            <>
              <button onClick={() => handleEdit(adminId)} className="ml-5">
                <AiOutlineEdit
                  title="تعديل  البيانات"
                  className="text-2xl text-black"
                />
              </button>
              <button onClick={() => handleDelete(adminId)}>
                {isDeleting && deleteEmployeeId === adminId ? (
                  <Spinner />
                ) : (
                  <AiOutlineDelete
                    title="حذف العنصر"
                    className="text-2xl text-[#ef4444]"
                  />
                )}
              </button>
              <button onClick={() => handleUpdatePassword(adminId)} className="mr-5">
                <RiLockPasswordFill
                  title="تعديل كلمه المرور"
                  className="text-2xl text-black"
                />
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

  const dataToDisplay = searchQuery ? searchedEmployees?.admin : employees?.data;

  return (
    <>
      <div className="mb-4 flex justify-between items-center w-[100%]">
        <input
          type="text"
          placeholder=" ابحث اسم الادمن او البريد الالكتروني"
          className="w-[100%] border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {employees ? (
        <>
          <MUIDataTable
            title={"المسئوليين الحاليين"}
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
        <UpdateAdmin
          isOpen={true}
          initialValues={editEmployee}
          closeModal={handleCloseEdit}
          refetchSearch={refetchSearchResults}
        />
      )}
      {updatePassword && (
        <UpdatePasswordAdmin
          isOpen={true}
          closeModal={handleCloseUpdatePassword}
          initialValues={updatePasswordValue}
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

export default AdminTable;
