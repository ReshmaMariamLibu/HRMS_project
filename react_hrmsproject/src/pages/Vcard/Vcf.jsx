import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { saveAs } from "file-saver";
import vCardsJS from "vcards-js";
import { Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeDetails } from "../../store/employeeSlice";

const Vcf = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const employeeDetails = useSelector((state) => state.employee.employeeDetails);
  const [vCardString, setVCardString] = useState("");
  useEffect(() => {
    if (id) {
      dispatch(fetchEmployeeDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (employeeDetails) {
      generateVCard(employeeDetails);
    }
  }, [employeeDetails]);

  const generateVCard = (details) => {
    const vCard = vCardsJS();
    vCard.firstName = details.first_name;
    vCard.lastName = details.last_name;
    vCard.organization = "Hamon Technologies";
    vCard.workPhone = details.phone;
    vCard.email = details.email;
    vCard.address = details.address;
    vCard.title = details.designation;  

    const vCardString = vCard.getFormattedString();
    setVCardString(vCardString);
  };
  
  const saveAsVCard = () => {
    const blob = new Blob([vCardString], { type: "text/vcard" });
    saveAs(blob, `${employeeDetails.first_name}_${employeeDetails.last_name}_contact.vcf`);
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
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
        Generate QRCode
      </Typography>
      {vCardString && (
        <div style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={saveAsVCard} sx={{ mb: 2 }}>
            Download Details
          </Button>
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Scan this QR Code to get the contact details:
          </Typography>
          <QRCode value={vCardString} size={256} />
        </div>
      )}
    </Paper>
  );
};

export default Vcf;
