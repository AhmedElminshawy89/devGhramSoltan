import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { useLazySearchCategoryQuery, useLazySearchSubCategoryQuery } from "../../app/Feature/API/Search";
import {  useUpdateCategoryStatusMutation } from "../../app/Feature/API/Package";
import UpdateSubPackage from "../UpdateForm/UpdateSubPackage";
import { useDeleteSubCategoryMutation } from "../../app/Feature/API/SubPackage";

const SubPackagesSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [triggerSearch, { isLoading }] = useLazySearchSubCategoryQuery();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteSubCategoryMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [updateCategoryStatus, { isLoading: LoadingStatus }] = useUpdateCategoryStatusMutation();
  const [loadingPackageIds, setLoadingPackageIds] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchSearchResults = async () => {
    const result = await triggerSearch(searchQuery);
    setSearchData(result?.data?.subCategory || []);
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
      name: "category.data.name",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowData = searchData
          const subPackage = rowData[tableMeta.rowIndex];
          return subPackage?.category?.name || "";
        },
      },
    },
    {
      label: "نوع الباكدج",
      name: "category.data.type",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowData =  searchData 
          const subPackage = rowData[tableMeta.rowIndex];
          return subPackage?.category?.type || "";
        },
      },
    },
    {
      label: "الصنف",
      name: "item",
    },
    {
      label: "سعر الباكدج",
      name: "price",
      options: {
        customBodyRender: (value) => {
          const formattedSalary = `${new Intl.NumberFormat("ar-EG").format(
            value
          )} جنيه`;
          return formattedSalary;
        },
      },
    },
    {
      label: "تاريخ العملية",
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
      label: "تاريخ التحديث",
      name: "updated_at",
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
          const packageId = searchData[tableMeta.rowIndex].id
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
          title={"نتائج البحث للباكدجات الفرعيه"}
          data={searchData}
          columns={columns}
          options={options}
        />
      )}

      {editEmployee && (
        <UpdateSubPackage
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

export default SubPackagesSearch;
