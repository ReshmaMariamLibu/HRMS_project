import { useState, useRef } from "react";
import { Container, Typography, Box, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginModal from "../Modal/LoginModal";
import RegisterModal from "../Modal/RegisterModal";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import hrmsImage from "../../assets/images/HRMS.png";
import hrmsImage1 from "../../assets/images/hrms2.png";
import hrmsImage2 from "../../assets/images/hrms3.png";
import hrmsImage3 from "../../assets/images/hrms4.png";
import hrmsImage4 from "../../assets/images/hrms5.png";
import hrmsImage5 from "../../assets/images/hrms6.jpeg";

const images = [
  hrmsImage,
  hrmsImage1,
  hrmsImage2,
  hrmsImage3,
  hrmsImage4,
  hrmsImage5,
];

const Home = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleOpenRegisterModal = () => {
    setOpenRegisterModal(true);
  };

  const successLogin = () => {
    navigate("/employee");
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleCloseRegisterModal = () => {
    setOpenRegisterModal(false);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        paddingLeft: "100px",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          padding: 4,
          marginLeft: "100px",
        }}
      >
        <Container>
          <Typography variant="h2" gutterBottom>
            HRMS Portal
          </Typography>
          <Typography variant="body1">Welcome to our HRMS!!!</Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginTop: 2,
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenRegisterModal}
            >
              Register
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenLoginModal}
            >
              Login
            </Button>
          </Box>
          <LoginModal
            open={openLoginModal}
            onClose={handleCloseLoginModal}
            successlogin={successLogin}
          />
          <RegisterModal
            open={openRegisterModal}
            onClose={handleCloseRegisterModal}
            successRegister={handleCloseRegisterModal}
          />
        </Container>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          marginRight: "100px",
        }}
      >
        <IconButton
          onClick={scrollLeft}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            margin: "20px",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "lightgray",
            },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "scroll",
            width: "80%",
            height: "80%",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <img
                src={image}
                alt={`HRMS ${index + 1}`}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={scrollRight}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            margin: "20px",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "lightgray",
            },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Home;
