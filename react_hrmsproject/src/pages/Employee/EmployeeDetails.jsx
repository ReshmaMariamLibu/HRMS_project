import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployeeDetails } from "../../store/employeeSlice";
import { CircularProgress, Typography, Alert, Paper, Button,Box} from "@mui/material";

const EmployeeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const employeeDetails = useSelector((state) => state.employee.employeeDetails);


  const detailsStatus = useSelector((state) => state.employee.detailsStatus);
  const detailsError = useSelector((state) => state.employee.detailsError);
  console.log(id,"id")

  useEffect(() => {
    
      dispatch(fetchEmployeeDetails(id));
    
       
  },[ dispatch,id]);


  if (detailsStatus === "loading") {
    return <CircularProgress />;
  }

  if (detailsStatus === "failed") {
    return <Alert severity="error">{detailsError}</Alert>;
  }

  const handleGenerateVCard = () => {
    navigate(`/vcard/${id}`);
  };

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
        {employeeDetails.first_name} {employeeDetails.last_name}
      </Typography>
      <hr />
      <Typography variant="body1" sx={{ textAlign: "center", mt: 6 }}>
        <strong>Email:</strong> {employeeDetails.email}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        <strong>Phone:</strong> {employeeDetails.phone}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        <strong>Address:</strong> {employeeDetails.address}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        <strong>Designation:</strong> {employeeDetails.designation}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        <strong>Leaves Taken:</strong> {employeeDetails.leaves}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleGenerateVCard}>
          Generate QR
        </Button>
      </Box>


    </Paper>
  );
};

export default EmployeeDetails;
