import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
import AddDesignationModal from "../../pages/Modal/AddDesignationModal";
import UpdateDesignationModal from "../../pages/Modal/DesignationUpdateModal";
import { fetchDesignations, addDesignation} from "../../store/designationSlice";

const DesignationListing = () => {
  const dispatch = useDispatch();
  const designations = useSelector((state) => state.designations.designations);
  const status = useSelector((state) => state.designations.status);

  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);

  useEffect(() => {
    dispatch(fetchDesignations());
  }, [dispatch]);

  const handleAddDesignationClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseUpdateModal = () => {
    dispatch(fetchDesignations());
    setOpenUpdateModal(false);
  };

  const successCallback = () => {
    dispatch(fetchDesignations());
    handleCloseModal();
  };

  const handleAddDesignationSubmit = (designationData) => {
    dispatch(
      addDesignation({
        designationData: designationData,
        successCb: successCallback,
        errorCb: () => setOpenModal(false),
      })
    );
  };

  const handleDeleteClick = (designationId) => {
    console.log(designationId,"desination id");
    const url = `${import.meta.env.VITE_HRMS_URL}/deletedesignation`;
    return(
      axios.post(url,{id:designationId}).then(
        (res)=>{
          console.log(res,"res");
          dispatch(fetchDesignations());
          return res
        },
        (error)=>{
          console.log(error,"errrrrrr");
          return error
        }
      )
    )
   
  }

  const handleEditClick = (designationId) => {
    setSelectedDesignation(designations.find((des) => des.id === designationId));
    setOpenUpdateModal(true);
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
          Designations
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "darkviolet", "&:hover": { backgroundColor: "violet" } }}
          onClick={handleAddDesignationClick}
        >
          <AddIcon />
          Add Designation
        </Button>
      </Box>
      {status === "loading" && <CircularProgress />}
      {designations && designations.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl/No</TableCell>
                  <TableCell>Designation Name</TableCell>
                  <TableCell>Max casual leave</TableCell>
                  <TableCell>Max sick leaves</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {designations.map((designation, index) => (
                  <TableRow key={index} sx={{ cursor: "pointer" }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{designation.title}</TableCell>
                    <TableCell>{designation.max_casual_leave}</TableCell>
                    <TableCell>{designation.max_sick_leaves}</TableCell>

                    <TableCell>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditClick(designation.id)}
                        sx={{ color: "#5c6bc0" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteClick(designation.id)}
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
            <Alert severity="error">Error in fetching designations!!</Alert>
          )}
        </>
      ) : (
        <Alert severity="info">No designations found</Alert>
      )}

      <AddDesignationModal
        open={openModal}
        handleClose={handleCloseModal}
        onSubmit={handleAddDesignationSubmit}
      />

      {selectedDesignation && (
        <UpdateDesignationModal
          open={openUpdateModal}
          onClose={handleCloseUpdateModal}
          designation={selectedDesignation}
        />
      )}
    </section>
  );
};

export default DesignationListing;
