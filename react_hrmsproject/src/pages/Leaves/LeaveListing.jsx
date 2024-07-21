import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from '@mui/material';
import { fetchLeaves, addLeave } from '../../store/leaveSlice';
import AddIcon from '@mui/icons-material/Add';
import AddLeaveModal from '../../pages/Modal/AddLeaveModal';

const LeaveListing = () => {
  const dispatch = useDispatch();
  const leaves = useSelector((state) => state.leaves.leaves);
  const status = useSelector((state) => state.leaves.status);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchLeaves());
  }, [dispatch]);

  const handleAddLeaveClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const successCallback = () => {
    console.log('Leave added successfully');
    handleCloseModal();
    dispatch(fetchLeaves());
  };

  const handleAddLeaveSubmit = (leaveData) => {
    dispatch(
      addLeave({
        leaveData: leaveData,
        successCb: successCallback,
        errorCb: () => setOpenModal(false),
      })
    );
  };

  return (
    <section>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', margin: '30px' }}>
          Leaves
        </Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'darkviolet', '&:hover': { backgroundColor: 'violet' } }}
          onClick={handleAddLeaveClick}
        >
          <AddIcon />
          Add Leave
        </Button>
      </Box>
      {status === 'loading' && <CircularProgress />}
      {leaves && leaves.length > 0 ? (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Leave ID</TableCell>
                  <TableCell>Employee First_name</TableCell>
                  <TableCell>Leaves Taken</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaves.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>{leave.id}</TableCell>
                    <TableCell>{leave.employee.first_name}</TableCell>
                    <TableCell>{leave.leaves_taken}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {status === 'failed' && <Alert severity="error">Error in fetching leaves.</Alert>}
        </>
      ) : (
        <Alert severity="info">No leaves found</Alert>
      )}

      <AddLeaveModal open={openModal} onClose={handleCloseModal} onSubmit={handleAddLeaveSubmit} />
    </section>
  );
};

export default LeaveListing;

