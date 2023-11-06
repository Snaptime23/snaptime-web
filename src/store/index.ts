import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authStateReducer } from './slices/auth.ts';
import { counterReducer } from './slices/couter.ts';
import { loginStateReducer } from './slices/loginState.ts';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authStateReducer,
    loginState: loginStateReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use this instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const counterStateSelector = (state: RootState) => state.counter;
export const useSelectCounterState = () => useAppSelector(counterStateSelector);

export const authStateSelector = (state: RootState) => state.auth;
export const useSelectAuthState = () => useAppSelector(authStateSelector);

export const loginStateSelector = (state: RootState) => state.loginState;
export const useSelectLoginState = () => useAppSelector(loginStateSelector);

export { store };

// @ts-expect-error FIXME: for debug
window.store = store;
