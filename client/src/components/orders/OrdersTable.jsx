import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import moment from "moment";
import { useDispatch } from "react-redux";
import { openOrderModal } from "../../redux/slices/orderSlices";

export default function OrdersTable({ list }) {
  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "full_name",
      headerName: "Customer Name",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      renderCell: (params) => {
        return (
          <div className='flex justify-center'>
            <h6 className='px-2 text-indigo-400 rounded'>
              KES {params.row.amount}
            </h6>
          </div>
        );
      },
    },
    {
      field: "order_paid",
      headerName: "Paid",
      width: 100,
      renderCell: (params) => {
        return (
          <div className='flex justify-center'>
            {params.row.order_paid ? (
              <h6 className='px-2 text-green-500 text-xs'>
                Paid
              </h6>
            ) : (
              <h6 className='px-2 text-gray-600 text-xs'>
                Not Paid
              </h6>
            )}
          </div>
        );
      },
    },
    {
      field: "order_delivered",
      headerName: "Delivered",
      width: 100,
      renderCell: (params) => {
        return (
          <div className='w-full flex justify-center'>
            {params.row.order_delivered ? (
              <h6 className='w-full text-gray-600 text-xs px-2 rounded'>
                Delivered
              </h6>
            ) : (
              <h6 className='w-full text-gray-600 text-xs px-2 rounded'>
                Not delivered
              </h6>
            )}
          </div>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Date Created",
      width: 250,
      renderCell: (params) => {
        const formattedDate = moment(params.row.created_at).format(
          "MMMM Do YYYY, h:mm:ss a"
        );
        return (
          <div className='flex justify-center'>
            <h6 className='bg-slate-100 px-2 text-indigo-400 py-1 rounded-md'>
              {formattedDate}
            </h6>
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className='flex gap-3 items-center'>
            <div onClick={() => handleModal(params.row.id)}>
              <VisibilityIcon className='text-blue-400 cursor-pointer' />
            </div>
            <EditIcon className='text-green-400 cursor-pointer' />
            <DeleteOutlineOutlinedIcon className='text-red-400 cursor-pointer' />
          </div>
        );
      },
    },
  ];
  
  const dispatch = useDispatch();
    const handleModal = (orderId) => {
      dispatch(openOrderModal(orderId));
    };
  return (
    <div className='grid grid-cols-1'>
      <div className='col-span-1'>
        <DataGrid
          rows={list}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20]}
          // checkboxSelection
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
          }}
        />
      </div>
    </div>
  );
}
