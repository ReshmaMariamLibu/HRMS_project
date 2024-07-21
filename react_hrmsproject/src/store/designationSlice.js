import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDesignations, postDesignation, updateDesignationDetails} from "../api/designation";

const initialState = {
  designations: [],
  designationDetails: {},
  status: "idle",
  error: null,
  detailsStatus: "idle",
  detailsError: null,
};

export const fetchDesignations = createAsyncThunk(
  "designations/fetchDesignations",
  async () => {
    const response = await getDesignations();
    return response;
  }
);

export const addDesignation = createAsyncThunk(
  'designations/add_designation',
  async ({ designationData, successCb, errorCb }, { rejectWithValue }) => {
    return postDesignation(designationData)
      .then(response => {
        if (successCb) successCb(response);
        return response;
      })
      .catch(error => {
        if (errorCb) errorCb(error);
        return rejectWithValue(error.response?.data?.message || error.message);
      });
  }
);

export const updateDesignation = createAsyncThunk(
  'designations/updateDesignation',
  async ({ data }) => {
    console.log(data, "designation update data");
    const response = await updateDesignationDetails(data); 
    console.log(response, "thunk");
    return response;
  }
);

const designationSlice = createSlice({
  name: "designations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designations = action.payload;
      })
      .addCase(fetchDesignations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addDesignation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDesignation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.designations.push(action.payload);
      })
      .addCase(addDesignation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateDesignation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDesignation.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.designations.findIndex(des => des.id === action.payload.id);
        if (index !== -1) {
          state.designations[index] = action.payload;
        }
      })
      .addCase(updateDesignation.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default designationSlice.reducer;
