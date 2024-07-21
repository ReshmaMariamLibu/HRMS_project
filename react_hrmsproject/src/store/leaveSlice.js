import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLeaves, postLeaves } from "../api/leave"; 

const initialState = {
  leaves: [],
  status: "idle",
  error: null,
};

export const fetchLeaves = createAsyncThunk(
  "leaves/fetchLeaves",
  async () => {
    const response = await getLeaves();
    return response;
  }
);

export const addLeave = createAsyncThunk(
  'leaves/addLeave',
  async ({ leaveData, successCb, errorCb }, { rejectWithValue }) => {
    try {
      const response = await postLeaves(leaveData);
      if (successCb) successCb(response);
      return response;
    } catch (error) {
      if (errorCb) errorCb(error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const leaveSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaves.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeaves.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaves = action.payload;
      })
      .addCase(fetchLeaves.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addLeave.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLeave.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leaves.push(action.payload);
      })
      .addCase(addLeave.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default leaveSlice.reducer;
