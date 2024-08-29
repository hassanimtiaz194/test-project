import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Box,
  IconButton,
  OutlinedInput,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";
import StudentModal from "./StudentModal";

export default function BasicTable({ students, updateSearchParams }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    updateSearchParams("pagination", rowsPerPage);
    updateSearchParams("search", search);
    updateSearchParams("order", order);
    updateSearchParams("orderBy", orderBy);
  }, [page, rowsPerPage, search, order, orderBy]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  const handleIconClick = (event, action, studentId) => {
    event.stopPropagation();
    if (action === "edit") {
      console.log(`Edit ${studentId}`);
    } else if (action === "flag") {
      console.log(`Flag ${studentId}`);
    } else if (action === "delete") {
      console.log(`Delete ${studentId}`);
    }
  };

  const sortedStudents = students
    .sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
    })
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                display: "flex",
                padding: "10px",
                gap: 2,
                width: "200%",
              }}
            >
              <OutlinedInput
                sx={{ width: "100%" }}
                placeholder="Search here..."
                value={search}
                onChange={handleSearchChange}
              />
            </TableRow>
            <TableRow
              sx={{
                borderTop: "solid 1px #efefef",
                backgroundColor: "#edf1f5",
                fontSize: "10px",
                height: "10px",
              }}
            >
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">
                <TableSortLabel
                  active={orderBy === "age"}
                  direction={orderBy === "age" ? order : "asc"}
                  onClick={() => handleSort("age")}
                >
                  Age
                </TableSortLabel>
              </TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStudents.map((student) => (
              <TableRow
                key={student.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={() => handleRowClick(student)}
                hover
              >
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar alt={student.name} src={student.image} />
                    {student.name}
                  </Box>
                </TableCell>
                <TableCell align="left">{student.age}</TableCell>
                <TableCell align="left">{student.gender}</TableCell>
                <TableCell align="left">{student.email}</TableCell>
                <TableCell align="left">{student.phone}</TableCell>
                <TableCell align="left">
                  {student.address.street}, {student.address.city},{" "}
                  {student.address.zip}, {student.address.country}
                </TableCell>
                <TableCell>
                  <IconButton
                    type="outlined"
                    color="primary"
                    onClick={(event) =>
                      handleIconClick(event, "edit", student.id)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    onClick={(event) =>
                      handleIconClick(event, "flag", student.id)
                    }
                  >
                    <FlagIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={(event) =>
                      handleIconClick(event, "delete", student.id)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          sx={{ borderTop: "solid 1px #efefef" }}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <StudentModal
        open={modalOpen}
        onClose={handleCloseModal}
        student={selectedStudent}
      />
    </>
  );
}
