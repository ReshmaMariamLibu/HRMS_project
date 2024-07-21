import { configureStore } from "@reduxjs/toolkit";
import  loginReducer from "./loginSlice"
import employeeReducer from './employeeSlice';
import designationReducer from "./designationSlice";
import leaveReducer from "./leaveSlice"


export const store = configureStore({
  reducer: {
    authority: loginReducer,
    employee:employeeReducer,
    designations: designationReducer,
    leaves:leaveReducer
    


  },
});