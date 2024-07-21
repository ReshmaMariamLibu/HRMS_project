import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployees, postEmployee,getEmployeeDetails ,updateEmployeeDetails} from "../api/employees";

const initialState = {
  employees: [],
  employeeDetails: {},
  status: "idle",
  error: null,
  detailsStatus: "idle",
  detailsError: null,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await getEmployees();
    return response;
  }
);

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async ({employee,successCb,errorCb})=>{
    console.log(employee,"adddatra")
  const response = await postEmployee(employee,successCb,errorCb)
  return response;

  } 
);

export const fetchEmployeeDetails = createAsyncThunk(
  "employees/fetchEmployeeDetails",
  async (employeeId) => {
    const response = await getEmployeeDetails(employeeId);
    return response;
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({data }) => {
    console.log(data,"employee update data");
   
      const response = await updateEmployeeDetails(data);
      console.log(response.data,"thunk")
      return response.data;
  }
     
);


const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("Payload at case, ", action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchEmployeeDetails.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(fetchEmployeeDetails.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.employeeDetails = action.payload;
      })
      .addCase(fetchEmployeeDetails.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.detailsError = action.error.message;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateEmployee.rejected, (state) => {
        state.status = "failed";
      });
      
  },
});

export default employeeSlice.reducer;
