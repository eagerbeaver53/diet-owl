import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import apiClient from '../services/api-client';

// Types
type User = {
  name: string;
  email: string;
};

type InitialState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
  data: User;
  newUser: User;
};

// Initial State
const initialState: InitialState = {
  status: 'idle',
  error: null,
  data: {
    name: '',
    email: '',
  },
  newUser: {
    name: '',
    email: '',
  },
};

// Async Thunks
export const fetchUser = createAsyncThunk('userDetails', async () => {
  const response = await apiClient.get(
    'https://jsonplaceholder.typicode.com/users/1',
  );
  return response;
});

export const createUser = createAsyncThunk(
  'users/new',
  async (payload: User) => {
    const response = await apiClient.post(
      'https://jsonplaceholder.typicode.com/users',
      payload,
    );
    return response;
  },
);

// Slice
const dummyNetwokSlice = createSlice({
  name: 'dummyNetworkSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.name = action.payload.data.name;
        state.data.email = action.payload.data.email;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.newUser.name = action.payload.data.name;
        state.newUser.email = action.payload.data.email;
      });
  },
});

export const {} = dummyNetwokSlice.actions;

export default dummyNetwokSlice.reducer;
