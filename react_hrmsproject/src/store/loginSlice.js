import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login,register} from '../api/login';

export const registerThunk = createAsyncThunk(
  'auth/register',
  async ({ data, successCb = () => {} }, { rejectWithValue }) => {
    try {
      const response = await register(data);
      if (response) {
        successCb();
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginthunk = createAsyncThunk(
  'login/login',
  async ({ data, successCb = () => {} }, { rejectWithValue }) => {
    try {
      const response = await login(data);
      if (response.status === 200) {
        successCb(); 
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);


const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginthunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginthunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem('authToken', 'hrms');
      })
      .addCase(loginthunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("Rejected:", action.payload); 
      })

      .addCase(registerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("Registration Rejected:", action.payload);
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
