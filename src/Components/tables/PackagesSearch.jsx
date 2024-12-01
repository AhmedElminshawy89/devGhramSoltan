import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { useLazySearchCategoryQuery } from "../../app/Feature/API/Search";
import UpdateRental from "../UpdateForm/UpdateRents";
import { useDeleteCategoryMutation, useUpdateCategoryStatusMutation } from "../../app/Feature/API/Package";
import UpdatePackage from "../UpdateForm/UpdatePackage";

const PackagesSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [triggerSearch, { isLoading }] = useLazySearchCategoryQuery();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteCategoryMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [updateCategoryStatus, { isLoading: LoadingStatus }] = useUpdateCategoryStatusMutation();
  const [loadingPackageIds, setLoadingPackageIds] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchSearchResults = async () => {
    const result = await triggerSearch(searchQuery);
    setSearchData(result?.data?.category || []);
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
      name: "name",
    },
    {
      label: "نوع الباكدج",
      name: "type",
    },
    {
      label: "صورة الباكدج",
      name: "photo",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          return (
            <img
              src={`${value}`}
              alt="package"
              style={{
                width: "50px",
                height: "50px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          );
        },
      },
    },
    {
      label: "وصف الباكدج",
      name: "desc",
      options: {
        customBodyRender: (value) => {
          return (
            <div style={{ whiteSpace: 'break-spaces',minWidth:'400px' }}>
              {value}
            </div>
          );
        },
      },
    },
    {
      label: "سعر الباكدج",
      name: "price",
      options: {
        customBodyRender: (value) => {
          return `${new Intl.NumberFormat("ar-EG").format(value)} جنيه`;
        },
      },
    },
    {
        label: "حالة العرض",
        name: "status",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            const packageId = searchData[tableMeta.rowIndex]?.id;
            const isLoading = loadingPackageIds.includes(packageId) && LoadingStatus;
            return (
              <button
                onClick={() => handleStatusToggle(packageId, value)}
                className={`${
                  isLoading ? "py-1 px-1 pb-1" : "py-1 px-4"
                } font-semibold text-lg rounded-full whitespace-nowrap ${
                  value === "off"
                    ? "bg-white text-[#20b2aa] border border-[#20b2aa]"
                    : "bg-[#20b2aa] text-white"
                }`}
              >
                {isLoading ? (
                  <Spinner />
                ) : value === "off" ? (
                  "لم يتم العرض"
                ) : (
                  "تم العرض"
                )}
              </button>
            );
          },
        },
      },
      
    {
      label: "تاريخ البداية",
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
          const packageId = searchData[tableMeta.rowIndex]?.id
          return (
            <>
              <button onClick={() => handleEdit(packageId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(packageId)}>
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
          placeholder="ابحث اسم الباكدج"
          className="w-1/2 border px-6 py-2 rounded-lg mr-2"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className="bg-[#20b2aa] text-white px-6 py-2 rounded-lg text-lg font-semibold flex items-center">
          {isLoading ? <Spinner /> : 'بحث'}
        </button>
      </form>

      {isLoading ? (
        <div className="mt-[200px] mb-[200px] text-center">
          <Spinner />
        </div>
      ) : (
        <MUIDataTable
          title={"نتائج البحث للباكدجات "}
          data={searchData}
          columns={columns}
          options={options}
        />
      )}

      {editEmployee && (
        <UpdatePackage
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

export default PackagesSearch;
