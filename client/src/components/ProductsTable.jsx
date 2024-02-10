import * as React from "react";
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
        <div className="flex justify-center">
          <h6 className="bg-indigo-300 px-2 text-white rounded-full">
            KES {params.row.price}
          </h6>
        </div>
      )
    }
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
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    renderCell: (params) => {
      return (
        <div className='flex gap-3 items-center'>
          <VisibilityIcon className='text-blue-400 cursor-pointer' />
          <EditIcon className='text-green-400 cursor-pointer' />
          <DeleteOutlineOutlinedIcon className='text-red-400 cursor-pointer' />
        </div>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    name: "Water Melon",
    price: 40,
    unit: "1Kg",
    categories: "water melon",
    description: "Sweet water melon, ready for the market.",
  },
  {
    id: 2,
    name: "Water Melon - Grade B",
    categories: "water melon",
    description: "Sweet water melon for Grade B, ready for the market.",
    price: "40",
    unit: "1Kg",
  },
  {
    id: 3,
    name: "Machungwa Tamu Sana",
    categories: "Oranges",
    description: "Machungwa Kutoka Ukambani, ready for the market.",
    price: "70",
    unit: "1Kg",
  },
];

export default function ProductsTable() {
  return (
    <div className='grid grid-cols-1'>
      <div className='col-span-1'>
        <DataGrid
          rows={rows}
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
