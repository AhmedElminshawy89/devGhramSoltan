import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import Spinner from "../../Shared/Spinner";
import DeleteDialog from "../../Shared/DeleteDialog";
import { useLazySearchDiscountQuery } from "../../app/Feature/API/Search";
import { useDeleteDiscountMutation, useGetallDiscountsWithoutPaginationQuery } from "../../app/Feature/API/Discount";
import UpdateDiscount from "../UpdateForm/UpdateDiscount";
import Select from "react-select";

const DiscountSearch = () => {
  const [searchData, setSearchData] = useState([]);
  const [triggerSearch, { isLoading: isSearching }] = useLazySearchDiscountQuery();
  const [deleteEmployeeId, setDeleteEmployeeId] = useState(null);
  const [deleteEmployee, { isLoading: isDeleting }] = useDeleteDiscountMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const { data: getAllDiscount } = useGetallDiscountsWithoutPaginationQuery("");
  const [discountType, setDiscountType] = useState(null);

  const fetchSearchResults = async () => {
    const result = await triggerSearch(discountType?.value);
    setSearchData(result?.data?.discount || []);
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
      name:'#',
      label:'',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "discount",
      label: "نوع الخصم",
    },
    {
      name: "price",
      label: "نسبة الخصم",
      options: {
        customBodyRender: (value) => {
          const formattedPrice = `${new Intl.NumberFormat("ar-EG").format(
            value
          )} جنيه`;
          return formattedPrice;
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
          const discountId = searchData[tableMeta.rowIndex].id
          return (
            <>
              <button onClick={() => handleEdit(discountId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(discountId)}>
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
      <form onSubmit={handleSearchSubmit} className="mb-4 flex justify-start gap-4 items-center w-full max-w-[600px]">
      <Select
        id="discount"
        value={discountType}
        onChange={(selectedOption) => setDiscountType(selectedOption)}
        options={getAllDiscount?.map((discount) => ({
            label: discount.discount,
            value: discount.discount,
        }))}
        className={`shadow ${!discountType ? "border-red-500" : "border-gray-400"} rounded flex-1`}
        placeholder="اختر الخصم"
        />
        <button type="submit" className="bg-[#20b2aa] text-white px-6 py-2 rounded-lg text-lg font-semibold flex items-center">
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

export default DiscountSearch;
