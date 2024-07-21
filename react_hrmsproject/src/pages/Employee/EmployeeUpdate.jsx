// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchEmployeeDetails, updateEmployeeDetails } from "../../store/employeeSlice";
// import { Box, Button, CircularProgress, TextField, Typography, Alert, Paper } from "@mui/material";

// const EmployeeUpdate = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const employeeDetails = useSelector((state) => state.employee.employeeDetails);
//   const detailsStatus = useSelector((state) => state.employee.detailsStatus);
//   const detailsError = useSelector((state) => state.employee.detailsError);
//   const updateStatus = useSelector((state) => state.employee.updateStatus);
//   const updateError = useSelector((state) => state.employee.updateError);

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     address: "",
//     designation_id: "",
//   });

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchEmployeeDetails(id));
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     if (employeeDetails) {
//       setFormData({
//         first_name: employeeDetails.first_name,
//         last_name: employeeDetails.last_name,
//         email: employeeDetails.email,
//         phone: employeeDetails.phone,
//         address: employeeDetails.address,
//         designation_id: employeeDetails.designation_id,
//       });
//     }
//   }, [employeeDetails]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   console.log(formData)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateEmployeeDetails({ id, updatedData: formData }));
//   };

//   if (detailsStatus === "loading") {
//     return <CircularProgress />;
//   }

//   if (detailsStatus === "failed") {
//     return <Alert severity="error">{detailsError}</Alert>;
//   }

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         padding: 2,
//         width: "700px",
//         maxHeight: "500px",
//       }}
//     >
//       <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
//         Update Employee
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="First Name"
//           name="first_name"
//           value={formData.first_name}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Last Name"
//           name="last_name"
//           value={formData.last_name}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Phone"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Address"
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Designation ID"
//           name="designation_id"
//           value={formData.designation_id}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             disabled={updateStatus === "loading"}
//           >
//             {updateStatus === "loading" ? <CircularProgress size={24} /> : "Update"}
//           </Button>
//         </Box>
//       </form>
//       {updateStatus === "succeeded" && (
//         <Alert severity="success">Employee updated successfully</Alert>
//       )}
//       {updateStatus === "failed" && (
//         <Alert severity="error">{updateError}</Alert>
//       )}
//     </Paper>
//   );
// };

// export default EmployeeUpdate;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEmployeeDetails, updateEmployeeDetails } from "../../store/employeeSlice";
import { Box, Button, CircularProgress, TextField, Typography, Alert, Paper } from "@mui/material";

const EmployeeUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const employeeDetails = useSelector((state) => state.employee.employeeDetails);
  const detailsStatus = useSelector((state) => state.employee.detailsStatus);
  const detailsError = useSelector((state) => state.employee.detailsError);
  const updateStatus = useSelector((state) => state.employee.updateStatus);
  const updateError = useSelector((state) => state.employee.updateError);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    designation_id: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (employeeDetails) {
      setFormData({
        first_name: employeeDetails.first_name,
        last_name: employeeDetails.last_name,
        email: employeeDetails.email,
        phone: employeeDetails.phone,
        address: employeeDetails.address,
        designation_id: employeeDetails.title,
      });
    }
  }, [employeeDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEmployeeDetails({ id, updatedData: formData }));
  };

  if (detailsStatus === "loading") {
    return <CircularProgress />;
  }

  if (detailsStatus === "failed") {
    return <Alert severity="error">{detailsError}</Alert>;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        width: "700px",
        maxHeight: "500px",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Update Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Designation ID"
          name="designation_id"
          value={formData.designation_id}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={updateStatus === "loading"}
          >
            {updateStatus === "loading" ? <CircularProgress size={24} /> : "Update"}
          </Button>
        </Box>
      </form>
      {updateStatus === "succeeded" && (
        <Alert severity="success">Employee updated successfully</Alert>
      )}
      {updateStatus === "failed" && (
        <Alert severity="error">{updateError}</Alert>
      )}
    </Paper>
  );
};

export default EmployeeUpdate;
