import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginthunk } from "../../store/loginSlice";

const LoginModal = ({ open, onClose, successlogin }) => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });
  const handleSuccess = () => {
    successlogin();
    console.log('Login successful!')
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginthunk({ data:credential, successCb: () => handleSuccess() }));
  };

  return (
    <Modal open={open} onClose={onClose}>
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={credential.username}
            onChange={(event) =>
              setCredential({ ...credential, username: event.target.value })
            }
          />
          <p>{credential.username}</p>
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            type="password"
            value={credential.password}
            onChange={(event) =>
              setCredential({ ...credential, password: event.target.value })
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  successlogin:PropTypes.func

};

export default LoginModal;
