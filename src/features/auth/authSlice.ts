import { authAPI } from '@app/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const login = createAsyncThunk('auth/login', async () => {
  try {
    const response = await authAPI.login();
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const refreshToken = createAsyncThunk('auth/refresh-token', async () => {
  try {
    const response = await authAPI.refreshToken();
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
});

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message ?? null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload.token;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.error = action.error.message ?? null;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      console.log(action.payload!.token);
      state.token = action.payload!.token;
    });
  },
});

export default authSlice.reducer;
