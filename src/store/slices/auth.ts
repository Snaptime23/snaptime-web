import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthStateType = 'logged_in' | 'not_logged_in';

// Define a type for the slice state
interface AuthState {
  authKey: string | null;
  state: AuthStateType;
}

const authKey = localStorage.getItem('authKey');

// Define the initial state using that type
const initialState: AuthState = {
  authKey: authKey,
  state: authKey ? 'logged_in' : 'not_logged_in',
};

export const authStateSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    logInAction: (state, action: PayloadAction<{ authKey: string }>) => {
      state.authKey = action.payload.authKey;
      state.state = 'logged_in';
      localStorage.setItem('authKey', action.payload.authKey);
    },
    logOutAction: (state) => {
      state.authKey = null;
      state.state = 'not_logged_in';
      localStorage.removeItem('authKey');
    },
  },
});

const authStateReducer = authStateSlice.reducer;
export { authStateReducer };

// Action creators are generated for each case reducer function
export const { logInAction, logOutAction } = authStateSlice.actions;
