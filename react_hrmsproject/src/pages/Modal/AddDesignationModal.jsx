import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';

const AddDesignationModal = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [maxCasualLeave, setMaxCasualLeave] = useState(0);
  const [maxSickLeaves, setMaxSickLeaves] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ 
      title: name, 
      max_casual_leave: maxCasualLeave, 
      max_sick_leaves: maxSickLeaves 
    });
    handleModalClose();
  };

  const handleModalClose = () => {
    setName('');
    setMaxCasualLeave(0);
    setMaxSickLeaves(0);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="add-designation-modal"
      aria-describedby="modal-to-add-designation"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Designation
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Designation Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            type="number"
            label="Max Casual Leave"
            variant="outlined"
            margin="normal"
            value={maxCasualLeave}
            onChange={(e) => setMaxCasualLeave(e.target.value)}
          />
          <TextField
            required
            fullWidth
            type="number"
            label="Max Sick Leaves"
            variant="outlined"
            margin="normal"
            value={maxSickLeaves}
            onChange={(e) => setMaxSickLeaves(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: 'darkviolet', '&:hover': { backgroundColor: 'violet' } }} >
            <AddIcon />
            Add
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

AddDesignationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddDesignationModal;

