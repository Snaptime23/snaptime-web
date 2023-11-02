import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Video } from '../../models/video.ts';

// Define a type for the slice state
interface VideoScrollerState {
  currentFocused: number;
  virtualVideoList: Video[];
  renderedVideoList: Video[];
}

// Define the initial state using that type
const initialState: VideoScrollerState = {
  currentFocused: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

const counterReducer = counterSlice.reducer;
export { counterReducer };

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
