import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEmployees, addEmployee } from "../../store/employeeSlice";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddEmployeeModal from "../../pages/Modal/AddEmployeeModal";
import UpdateEmployeeModal from "../../pages/Modal/UpdateEmployeeModal";
import { fetchDesignations } from "../../store/designationSlice";
import { fetchLeaves, addLeave } from "../../store/leaveSlice";
import AddLeaveModal from "../../pages/Modal/AddLeaveModal";

const EmployeeListing = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const status = useSelector((state) => state.employee.status);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
    dispatch(fetchDesignations());
  }, [dispatch, openModal,openUpdateModal]);

  const handleRowClick = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };

  const handleAddEmployeeClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  const successCallback = () => {
    dispatch(fetchEmployees());
    handleCloseModal();
  };

  const handleAddEmployeeSubmit = (employeeData) => {
    dispatch(
      addEmployee({
        employeeData: employeeData,
        successCb: successCallback,
        errorCb: () => setOpenModal(false),
      })
    );
  };

  const handleDeleteClick = (employeeId) => {
    const url = `${import.meta.env.VITE_HRMS_URL}/deleteemployee`;
    return axios.post(url, { id: employeeId }).then(
      (res) => {
        console.log(res, "res");
        dispatch(fetchEmployees());
        return res;
      },
      (error) => {
        console.log(error, "errrrrrr");
        return error;
      }
    );
  };
  const handleEditClick = (employeeId) => {
    console.log("update", employeeId);
    setSelectedEmployee(employees.find((emp) => emp.id == employeeId));
    setOpenUpdateModal(true);
  };

  const handleAddLeaveClick = () => {
    setOpenLeaveModal(true);
  };

  const handleCloseLeaveModal = () => {
    setOpenLeaveModal(false);
  };

  const successCallbackLeave = () => {
    console.log("Leave added successfully");
    handleCloseLeaveModal();
    dispatch(fetchLeaves());
  };

  const handleAddLeaveSubmit = (leaveData) => {
    dispatch(
      addLeave({
        leaveData: leaveData,
        successCb: successCallbackLeave,
        errorCb: () => setOpenLeaveModal(false),
      })
    );
  };

  return (
    <section>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", margin: "30px" }}
        >
          Employees
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "darkviolet",
            "&:hover": { backgroundColor: "violet" },
            marginRight: "20px",
          }}
          onClick={handleAddEmployeeClick}
        >
          <AddIcon />
          Add Employee
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "darkviolet",
            "&:hover": { backgroundColor: "violet" },
          }}
          onClick={handleAddLeaveClick}
        >
          <AddIcon />
          Add Leave
        </Button>
      </Box>
      {status === "loading" && <CircularProgress />}
      {employees && employees.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl/No</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee, index) => (
                  <TableRow
                    key={index}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(employee.id)}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {employee.first_name} {employee.last_name}
                    </TableCell>

                    <TableCell>
                      <IconButton
                        aria-label="edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(employee.id);
                        }}
                        sx={{ color: "#5c6bc0" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(employee.id);
                        }}
                        sx={{ color: "#ef5350" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {status === "failed" && (
            <Alert severity="error">Error in adding employee!!.</Alert>
          )}
        </>
      ) : (
        <Alert severity="info">No employees found</Alert>
      )}

      <AddEmployeeModal
        open={openModal}
        handleClose={handleCloseModal}
        onSubmit={handleAddEmployeeSubmit}
      />

      {selectedEmployee && (
        <UpdateEmployeeModal
          open={openUpdateModal}
          onClose={handleCloseUpdateModal}
          employee={selectedEmployee}
          // DesignationData={designations}
        />
      )}
      <AddLeaveModal
        open={openLeaveModal}
        onClose={handleCloseLeaveModal}
        onSubmit={handleAddLeaveSubmit}
      />
    </section>
  );
};

export default EmployeeListing;
