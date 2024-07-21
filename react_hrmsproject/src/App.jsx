import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Sidebar from "./pages/Navbar/Navbar";
import Home from "./pages/home/Home";
import EmployeeListing from "./pages/Employee/EmployeeListing";
import DesignationListing from "./pages/Designation/DesignationListing";
import theme from "./theme";
import EmployeeDetails from "./pages/Employee/EmployeeDetails";
import Vcf from "./pages/Vcard/Vcf";

const MainContent = () => {
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  console.log(token);

  return (
    <>
      {/* Conditionally render Navbar */}
      {location.pathname !== "/" && <Sidebar />}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mt: 4,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          {token ? (
            <>
              <Route path="/employee" element={<EmployeeListing />} />
              <Route path="/employees/:id" element={<EmployeeDetails />} />
              <Route path="/designations" element={<DesignationListing />} />
              <Route path="/vcard/:id" element={<Vcf />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </Box>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          {/* <Sidebar /> */}
          <MainContent />
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
