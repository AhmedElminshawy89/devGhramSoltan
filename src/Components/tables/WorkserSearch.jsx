import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { useLazySearchJobQuery } from "../../app/Feature/API/Search";
import { useGetAllEmployeesQuery } from "../../app/Feature/API/Emplyee";
import UpdateWorker from "../UpdateForm/UpdateWorker";
import { useDeleteWorkerMutation } from "../../app/Feature/API/Workers";
import UpdateDiscount from "../UpdateForm/UpdateDiscount";

const WorkersSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [triggerSearch, { isLoading: isSearching }] = useLazySearchJobQuery();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteWorkerMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  const fetchSearchResults = async () => {
    const result = await triggerSearch(searchQuery);
    setSearchData(result?.data?.job || []);
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
      name: '#',
      label: '',
      options: {
        customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "name",
      label: "الاسم",
    },
    {
      name: "price",
      label: "السعر",
      options: {
        customBodyRender: (value) => `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`,
      },
    },
    {
      name: "created_at",
      label: "تاريخ العمليه",
      options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          return `${date.toLocaleDateString("ar-EG")} (${date.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          })})`;
        },
      },
    },
    {
      name: "updated_at",
      label: "تاريخ التحديث",
      options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          return `${date.toLocaleDateString("ar-EG")} (${date.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          })})`;
        },
      },
    },
    {
      name: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta) => {
          const workerId = searchData[tableMeta.rowIndex]?.id;
          return (
            <>
              <button onClick={() => handleEdit(workerId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(workerId)}>
                <AiOutlineDelete className="text-2xl text-[#ef4444]" />
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
          name="clientName"
          placeholder="ابحث ب نوع الخصم"
          className="w-1/2 border px-6 py-2 rounded-lg mr-2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="bg-[#f3c74d] text-black px-6 py-2 rounded-lg text-lg font-semibold flex items-center">
          {isSearching ? <Spinner /> : "بحث"}
        </button>
      </form>

      {isSearching ? (
        <div className="mt-[200px] mb-[200px] text-center">
          <Spinner />
        </div>
      ) : (
        <MUIDataTable
          title={searchData.length ? "نتائج البحث للخصومات" : ""}
          data={searchData}
          columns={columns}
          options={options}
        />
      )}

      {editEmployee && (
        <UpdateDiscount
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

export default WorkersSearch;
