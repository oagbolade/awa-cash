import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: PersistedState = {
  balanceVisible: false,
  biometrics: false,
  cardOnboard: false,
  email: '',
  onboarded: false,
  rememberMe: false,
};

const { actions, reducer } = createSlice({
  initialState,
  name: 'persisted',
  reducers: {
    setBalance: state => {
      state.balanceVisible = !state.balanceVisible;
    },
    setBiometric: (state: PersistedState, action: PayloadAction<boolean>) => {
      state.biometrics = action.payload;
    },
    setCardOnboard: state => {
      state.cardOnboard = true;
    },
    setEmail: (state: PersistedState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setOnboarded: (state: PersistedState, action: PayloadAction<boolean>) => {
      state.onboarded = action.payload;
    },
    setRememberMe: (state: PersistedState, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;

      if (!state.rememberMe) {
        state.email = '';
      }
    },
  },
});

export const {
  setOnboarded,
  setBiometric,
  setEmail,
  setCardOnboard,
  setRememberMe,
  setBalance,
} = actions;

export default reducer;
