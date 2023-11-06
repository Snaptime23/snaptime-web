import { createSlice } from '@reduxjs/toolkit';

type LoginStatus = boolean;

// Define a type for the slice state
interface LoginState {
  value: LoginStatus;
}

// Define the initial state using that type
const initialState: LoginState = {
  value: false,
};

export const loginStateSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

const loginStateReducer = loginStateSlice.reducer;
export { loginStateReducer };

// Action creators are generated for each case reducer function
export const { login, logout } = loginStateSlice.actions;
