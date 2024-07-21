import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { updateDesignation,fetchDesignations } from "../../store/designationSlice";

const UpdateDesignationModal = ({ open, onClose, designation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id:designation.id ?? "",
    title: designation?.title || "",
    max_casual_leave: designation?.max_casual_leave || "",
    max_sick_leaves: designation?.max_sick_leaves || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateDesignation({ id: designation.id, data: formData }));
      dispatch(fetchDesignations());
      onClose();
    } catch (error) {
      console.error("Failed to update designation:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: "white",
          margin: "auto",
          maxWidth: 500,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Update Designation
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Max Casual Leave"
            name="max_casual_leave"
            value={formData.max_casual_leave}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Max Sick Leaves"
            name="max_sick_leaves"
            value={formData.max_sick_leaves}
            onChange={handleChange}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={onClose}>
              Close
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

UpdateDesignationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  designation: PropTypes.object.isRequired,
};

export default UpdateDesignationModal;
