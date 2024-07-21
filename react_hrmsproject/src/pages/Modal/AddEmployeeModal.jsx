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
import { fetchDesignations } from "../../store/designationSlice";
import PropTypes from "prop-types";
import { addEmployee } from "../../store/employeeSlice";

const AddEmployeeModal = ({ open, handleClose }) => {
  AddEmployeeModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
  };

  const dispatch = useDispatch();
    const designations = useSelector((state) => state.designations.designations);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [designation, setDesignation] = useState("");
    const [customDesignation, setCustomDesignation] = useState("");
    const [isCustomDesignation, setIsCustomDesignation] = useState(false);

  useEffect(() => {
    dispatch(fetchDesignations());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addEmployee({
        employee: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          address: address,
          designation: isCustomDesignation ? customDesignation : designation,
        },
        successCb: (data) => {
          console.log("Employee added successfully:", data);
          handleModalClose();
        },
        errorCb: (error) => {
          console.log("Error adding employee:", error);
        },
      })
    );
  };

  const handleModalClose = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setDesignation("");
    setCustomDesignation("");
    setIsCustomDesignation(false);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="add-employee-modal"
      aria-describedby="modal-to-add-employee"
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
          Add Employee
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="First Name"
            variant="outlined"
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            type="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Phone"
            variant="outlined"
            margin="normal"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Address"
            variant="outlined"
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" margin="normal" required>
            <InputLabel id="designation-label">Designation</InputLabel>
            <Select
              labelId="designation-label"
              id="designation"
              value={isCustomDesignation ? customDesignation : designation}
              onChange={(e) => {
                setDesignation(e.target.value);
                setIsCustomDesignation(false);
              }}
              label="Designation"
            >
              {designations.map((designation, index) => (
                <MenuItem key={index} value={designation.title}>
                  {designation.title}
                </MenuItem>
              ))}
            </Select>
            <p style={{ cursor: "pointer" }}>
              Designation not in the list ..?{" "}
              <span onClick={() => setIsCustomDesignation(true)}>
                <u>click here</u>
              </span>
            </p>
          </FormControl>
          {isCustomDesignation && (
            <TextField
              required
              fullWidth
              label="Custom Designation"
              variant="outlined"
              margin="normal"
              value={customDesignation}
              onChange={(e) => setCustomDesignation(e.target.value)}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "darkviolet","&:hover": { backgroundColor: "violet" },
          
            }}
          >
            <AddIcon />
            Add
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddEmployeeModal;
