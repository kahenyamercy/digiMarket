import * as React from "react";
import {Link} from "react-router-dom"
import { DataGrid } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const columns = [
  { field: "id", headerName: "ID", width: 30 },
  {
    field: "name",
    headerName: "Product Title",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
    renderCell: (params) => {
      return (
        <div className='flex justify-center'>
          <h6 className='bg-indigo-300 px-2 text-white rounded-full'>
            KES {params.row.price}
          </h6>
        </div>
      );
    },
  },
  {
    field: "unit",
    headerName: "Unit",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 250,
  },
  {
    field: "categories",
    headerName: "Categories",
    width: 100,
    renderCell: (params) => {
      const categories = params.row.categories.map((item) => item.name)
      return (
        <h6>{categories.join(',')}</h6>
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
          <Link to={`/shop/products/${params.row.id}`}>
            <VisibilityIcon className='text-blue-400 cursor-pointer' />
          </Link>
          <EditIcon className='text-green-400 cursor-pointer' />
          <DeleteOutlineOutlinedIcon className='text-red-400 cursor-pointer' />
        </div>
      );
    },
  },
];


export default function ProductsTable({list}) {
  return (
    <div className='grid grid-cols-1'>
      <div className='col-span-1'>
        <DataGrid
          rows={list}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
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
