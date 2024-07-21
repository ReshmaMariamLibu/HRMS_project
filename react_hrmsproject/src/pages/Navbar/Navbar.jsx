import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  CssBaseline,
  IconButton,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Sidebar = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const drawerWidth = 240;

  return (
    <>
      <CssBaseline />
      <Drawer
        variant="persistent"
        anchor="left"
        open={isOpen}
        sx={{
          width: isOpen ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            transition: "width 0.3s",
            display: "flex",
            flexDirection: "column", 
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Box>HRMS</Box>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft />
            </IconButton>
          </Box>
          <List sx={{ flexGrow: 1 }}>
            {!token && (
              <ListItem button component={RouterLink} to="/">
                <ListItemText primary="Home" />
              </ListItem>
            )}
            <ListItem button component={RouterLink} to="/employee">
              <ListItemText primary="Employees" />
            </ListItem>
            <ListItem button component={RouterLink} to="/designations">
              <ListItemText primary="Designation" />
            </ListItem>
          </List>
          {token && (
            <Box sx={{ p: 2, mt: "auto" }}>
              <Button variant="contained" fullWidth onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
      {!isOpen && (
        <Box
          sx={{
            position: "fixed",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            p: 1,
          }}
        >
          <Button variant="contained" onClick={toggleDrawer}>
            <ChevronRight />
          </Button>
        </Box>
      )}
    </>
  );
};

export default Sidebar;
