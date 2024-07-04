import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import MUIDataTable from "mui-datatables";
import DeleteDialog from "../../Shared/DeleteDialog";
import {
  useDeleteWorkerMutation,
  useGetWorkersQuery,
} from "../../app/Feature/API/Workers";
import Spinner from "../../Shared/Spinner";
import UpdateWorker from "../UpdateForm/UpdateWorker";

const WorkersTable = () => {
  const { data: workers, refetch, isLoading: isWorkersLoading } = useGetWorkersQuery();
  console.log(workers)
  const [deleteWorkerId, setDeleteWorkerId] = useState(null);
  const [deleteWorker, { isLoading: isDeleting }] = useDeleteWorkerMutation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editWorker, setEditWorker] = useState(null);

  const handleEdit = (workerId) => {
    const workerToEdit = workers.find((worker) => worker.id === workerId);
    setEditWorker(workerToEdit);
  };

  const handleDelete = (workerId) => {
    setDeleteWorkerId(workerId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteWorker(deleteWorkerId);
      setDeleteWorkerId(null);
      setIsDeleteDialogOpen(false);
      refetch();
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteWorkerId(null);
    setIsDeleteDialogOpen(false);
  };

  const handleCloseEdit = () => {
    setEditWorker(null);
  };

  const columns = [
    {
      name: "name",
      label: "الاسم",
    },
    {
      name: "price",
      label: "السعر",
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
      name: "created_at",
      label: "تاريخ البدء",
      options: {
        customBodyRender: (value) => {
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
        customBodyRender: (value) => {
          const endDate = new Date(value);
          const formattedDate = endDate.toLocaleDateString("ar-EG");
          return formattedDate;
        },
      },
    },
    {
      name: "تنفيذ",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          const workerId = workers[rowIndex]?.id;
          return (
            <>
              <button onClick={() => handleEdit(workerId)} className="ml-5">
                <AiOutlineEdit className="text-2xl text-black" />
              </button>
              <button onClick={() => handleDelete(workerId)}>
                {isDeleting && deleteWorkerId === workerId ? (
                  <Spinner />
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
        noMatch: isWorkersLoading ? "جاري التحميل..." : "لا توجد بيانات مطابقة",
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
        title={"تقارير الشغل الاضافي"}
        data={workers}
        columns={columns}
        options={options}
      />
      {editWorker && (
        <UpdateWorker
          isOpen={true}
          closeModal={handleCloseEdit}
          initialValues={editWorker}
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

export default WorkersTable;
