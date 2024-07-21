import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees } from "../../store/employeeSlice";
import PropTypes from "prop-types";

const AddLeaveModal = ({ open, onClose, onSubmit }) => {
  AddLeaveModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const [employeeId, setEmployeeId] = useState("");
  const [leavesTaken, setLeavesTaken] = useState("");

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      employee_id: employeeId,
      leaves_taken: leavesTaken,
    });
    handleClose();
  };

  const handleClose = () => {
    setEmployeeId("");
    setLeavesTaken("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-leave-modal"
      aria-describedby="modal-to-add-leave"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Leave
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth variant="outlined" margin="normal" required>
            <InputLabel id="employee-label">Employee</InputLabel>
            <Select
              labelId="employee-label"
              id="employee"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              label="Employee"
            >
              {employees.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.first_name} {employee.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            fullWidth
            type="number"
            label="Leaves Taken"
            variant="outlined"
            margin="normal"
            value={leavesTaken}
            onChange={(e) => setLeavesTaken(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ backgroundColor: 'darkviolet', '&:hover': { backgroundColor: 'violet' } }}
          >
            <AddIcon />
            Add
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddLeaveModal;
