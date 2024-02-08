import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const rows = [
  {
    id: 1,
    name: "Water Melon",
    categories: "Fruits, Vegetables",
    price: "40",
    unit: "1Kg",
  },
  {
    id: 2,
    name: "Machungwa Tamu Sana",
    categories: "Fruits, Vegetables",
    price: "70",
    unit: "1Kg",
  },
];

export default function ProductTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Product Title</TableCell>
            <TableCell align='left'>Price</TableCell>
            <TableCell align='left'>Unit</TableCell>
            <TableCell align='left'>Categories</TableCell>
            <TableCell align='left'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='left'>{row.price}</TableCell>
              <TableCell align='left'>{row.unit}</TableCell>
              <TableCell align='left'>{row.categories}</TableCell>
              <TableCell align='left'>
                <div className='flex gap-3 items-center'>
                  <VisibilityIcon className='text-blue-400 cursor-pointer' />
                  <EditIcon className='text-green-400 cursor-pointer' />
                  <DeleteOutlineOutlinedIcon className='text-red-400 cursor-pointer' />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
