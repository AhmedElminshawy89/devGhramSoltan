import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { useLazySearchRentsQuery } from "../../app/Feature/API/Search";
import UpdateRental from "../UpdateForm/UpdateRents";
import { useDeleteRentsMutation, useUpdateRentsStatusMutation } from "../../app/Feature/API/Rents";

const RentsSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [triggerSearch, { isLoading }] = useLazySearchRentsQuery();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteRentsMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [updateCategoryStatus, { isLoading: LoadingStatus }] = useUpdateRentsStatusMutation();
  const [loadingPackageIds, setLoadingPackageIds] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchSearchResults = async () => {
    const result = await triggerSearch(searchQuery);
    setSearchData(result?.data?.rent || []);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults();
  };

  const handleStatusToggle = async (rentId) => {
    setLoadingPackageIds((prev) => [...prev, rentId]);

    try {
      const response = await updateCategoryStatus(rentId).unwrap();
      if (response.success) {
        await fetchSearchResults();
      } else {
        console.error("Error updating package status:", response.message);
      }
    } catch (error) {
      console.error("Error updating package status:", error);
    } finally {
      setLoadingPackageIds((prev) => prev.filter((id) => id !== rentId));
      await fetchSearchResults();
    }
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
    { label: "الاسم", name: "name" },
    { label: "الاسماء المستعاره", name: "category" },
    { label: "نوع التامين", name: "type_insurance" },
    { label: "قيمه التامين", name: "insurance" },
    {
      label: "الحاله",
      name: "status",
      options: {
        customBodyRender: (value, tableMeta) => {
          const packageId = searchData[tableMeta.rowIndex]?.id;
          const isLoading = loadingPackageIds.includes(packageId);

          return (
            <button
              onClick={() => handleStatusToggle(packageId)}
              className={`${
                isLoading ? "py-1 px-1 pb-1" : "py-1 px-4"
              } font-semibold text-lg rounded-full whitespace-nowrap ${
                value === "لم يتم الاسترجاع"
                  ? "bg-black text-white"
                  : "bg-[#f3c74d] text-black"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner />
              ) : value === "لم يتم الاسترجاع" ? (
                "لم يتم الاسترجاع"
              ) : (
                "تم الاسترجاع"
              )}
            </button>
          );
        },
      },
    },
    {
      name: "created_at",
      label: "تاريخ الايجار",
      options: {
        customBodyRender: (value) => {
          const date = new Date(value);
          const formattedDate = date.toLocaleDateString("ar-EG");
          const formattedTime = date.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${formattedDate} (${formattedTime})`;
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
          return `${formattedDate} (${formattedTime})`;
        },
      },
    },
    {
      name: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rentId = searchData[tableMeta.rowIndex]?.id;

          return (
            <>
              <button onClick={() => handleEdit(rentId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(rentId)}>
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
        noMatch: isLoading ? "جاري البحث..." : "لا توجد بيانات مطابقة",
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
          placeholder="ابحث اسم الموظف"
          className="w-1/2 border px-6 py-2 rounded-lg mr-2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="bg-[#f3c74d] text-black px-6 py-2 rounded-lg text-lg font-semibold flex items-center">
          {isLoading ? <Spinner /> : 'بحث'}
        </button>
      </form>

      {isLoading ? (
        <div className="mt-[200px] mb-[200px] text-center">
          <Spinner />
        </div>
      ) : (
        <MUIDataTable
          title={"نتائج البحث للايجار "}
          data={searchData}
          columns={columns}
          options={options}
        />
      )}

      {editEmployee && (
        <UpdateRental
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

export default RentsSearch;
