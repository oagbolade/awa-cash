import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: ThemeState = {
  theme: 'light',
  useSystemTheme: false,
};

const { actions, reducer } = createSlice({
  initialState,
  name: 'theme',
  reducers: {
    setTheme: (state: ThemeState, action: PayloadAction<Theme>) => {
      state.useSystemTheme = false;

      state.theme = action.payload;
    },
    setUseSystemTheme: (state: ThemeState, action: PayloadAction<boolean>) => {
      state.useSystemTheme = action.payload;
    },
  },
});

export const { setTheme } = actions;

export default reducer;
