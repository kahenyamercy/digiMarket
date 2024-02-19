import * as React from "react";
import { Link } from "react-router-dom";
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
      width: 200,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
      renderCell: (params) => {
        return (
          <div className='flex justify-center'>
            <h6 className='bg-slate-100 px-2 text-indigo-400 rounded'>
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
              <h6 className='bg-slate-100 px-2 text-indigo-400 rounded'>
                Paid
              </h6>
            ) : (
              <h6 className='bg-red-400 px-2 text-white rounded-full'>
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
            <div onClick={handleModal}>
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
    const handleModal = () => {
      dispatch(openOrderModal());
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
