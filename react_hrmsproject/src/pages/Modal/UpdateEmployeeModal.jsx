// import { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { updateEmployeeDetails } from "../../api/employees";
// import { useDispatch } from "react-redux";
// import { fetchEmployees } from "../../store/employeeSlice";
// import PropTypes from "prop-types";

// const UpdateEmployeeModal = ({ open, onClose, employee, onUpdate }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({ ...employee });
//   console.log(formData,"update form data");
//   useEffect(() => {
//     setFormData({ ...employee });
//   }, [employee]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateEmployeeDetails(formData.id, formData);
//       onUpdate();
//       onClose();
//       dispatch(fetchEmployees());
//     } catch (error) {
//       console.error("Failed to update employee:", error);
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={{ p: 4, backgroundColor: "white", margin: "auto", maxWidth: 500 }}>
//         <Typography variant="h6" gutterBottom>
//           Update Employee
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="First Name"
//             name="first_name"
//             value={formData.first_name || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Last Name"
//             name="last_name"
//             value={formData.last_name || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Email"
//             name="email"
//             value={formData.email || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Address"
//             name="address"
//             value={formData.address || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Phone"
//             name="phone"
//             value={formData.phone || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Designation"
//             name="designation_id"
//             value={formData.designation_id || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Max Casual Leave"
//             name="max_casual_leave"
//             value={formData.max_casual_leave || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Max Sick Leaves"
//             name="max_sick_leaves"
//             value={formData.max_sick_leaves || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Leaves Taken"
//             name="leaves_taken"
//             value={formData.leaves_taken || ""}
//             onChange={handleChange}
//           />
//           <Button type="submit" variant="contained" color="primary">
//             Update
//           </Button>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// UpdateEmployeeModal.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   employee: PropTypes.object.isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

// export default UpdateEmployeeModal;

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Typography,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import { updateEmployeeDetails } from "../../api/employees";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchEmployees, updateEmployee } from "../../store/employeeSlice";
// import PropTypes from "prop-types";
// import axios from 'axios';
//   import { fetchDesignations } from "../../store/designationSlice";

// const UpdateEmployeeModal = ({ open, onClose }) => {

//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({});
//   const [designations, setDesignations] = useState([]);

//   const employees = useSelector((state)=>state.employee.employees)

//   useEffect(() => {
//     dispatch(fetchEmployees())
//     setFormData(...employees);
//     const fetchDesignations = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_HRMS_URL}/designations`);
//         setDesignations(response.data);
//       } catch (error) {
//         console.error("Failed to fetch designations:", error);
//       }
//     };
//     fetchDesignations();
//   }, [dispatch,employees]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     dispatch(
//       updateEmployee({
//         data:formData
//       }

//       )
//     )
//   };

//   return (
//     <Modal open={open}
//      onClose={onClose}>
//       <Box sx={{ p: 4, backgroundColor: "white", margin: "auto", maxWidth: 500 }}>
//         <Typography variant="h6" gutterBottom>
//           Update Employee
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="First Name"
//             name="first_name"
//             value={formData.first_name || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Last Name"
//             name="last_name"
//             value={formData.last_name || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Email"
//             name="email"
//             value={formData.
//             email || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Address"
//             name="address"
//             value={formData.address || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Phone"
//             name="phone"
//             value={formData.phone || ""}
//             onChange={handleChange}
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Designation</InputLabel>
//             <Select
//               name="designation"
//               value={formData.designation || ""}
//               onChange={handleChange}
//             >
//               {designations.map((designation,index) => (
//                 <MenuItem key={index} value={designation.title}>
//                   {designation.title}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Max Casual Leave"
//             name="max_casual_leave"
//             value={formData.max_casual_leave || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Max Sick Leaves"
//             name="max_sick_leaves"
//             value={formData.max_sick_leaves || ""}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Leaves Taken"
//             name="leaves_taken"
//             value={formData.leaves_taken || ""}
//             onChange={handleChange}
//           />
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//             <Button type="submit" variant="contained" color="primary">
//               Update
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// UpdateEmployeeModal.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   employee: PropTypes.object.isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };

// export default UpdateEmployeeModal;

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
// import axios from "axios";
import { updateEmployee } from "../../store/employeeSlice";

const UpdateEmployeeModal = ({ open, onClose, employee }) => {
  const dispatch = useDispatch();
  const designation = useSelector((state) => state.designations.designations);

  const [formData, setFormData] = useState({});

  console.log(formData, "up fromdata ");
  // const [designation, setDesignation] = useState(designations);

  // useEffect(() => {
  //   dispatch(fetchDesignations());
  //   if (employee) {
  //     setFormData(employee);
  //   }

  //   dispatch(fetchDesignations());
  //   if (DesignationData ) {
  //     setDesignations(DesignationData)
  //   }

  // }, [employee,DesignationData,dispatch]);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee, dispatch]);

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
      dispatch(updateEmployee({ id: employee.id, data: formData }));
      onClose();
    } catch (error) {
      console.error("Failed to update employee:", error);
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
          Update Employee
        </Typography>
        <form>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="first_name"
            value={formData.first_name || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="last_name"
            value={formData.last_name || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Designation</InputLabel>
            <Select
              name="designation"
              value={formData.designation || ""}
              onChange={handleChange}
            >
              {designation.map((item, index) => (
                <MenuItem key={index} value={item.title}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {designation.title}
          <TextField
            fullWidth
            margin="normal"
            label="Max Casual Leave"
            name="max_casual_leave"
            value={formData.max_casual_leave || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Max Sick Leaves"
            name="max_sick_leaves"
            value={formData.max_sick_leaves || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Leaves Taken"
            name="leaves_taken"
            value={formData.leaves_taken || ""}
            onChange={handleChange}
          />
          <Box
            sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 4 }}
          >
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Update
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={onclose}
            >
              close
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

UpdateEmployeeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  employee: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
};

export default UpdateEmployeeModal;
