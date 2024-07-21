import { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { login } from '../../api/login';

const LoginModal = ({ open, onClose }) => {
  LoginModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(
        username,
        password,
        (successData) => {
          setMessage(`Login successful, welcome ${successData.username}!`);
        },
        (error) => {
          setMessage(error.response?.data?.error || 'Login failed');
        }
      );
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleModalClose = () => {
    setUsername('');
    setPassword('');
    setMessage('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="login-modal"
      aria-describedby="modal-to-login"
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            fullWidth
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
        {message && <Typography variant="body2" color="error">{message}</Typography>}
      </Box>
    </Modal>
  );
};

export default LoginModal;
