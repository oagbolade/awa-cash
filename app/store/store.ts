import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import reducer from './reducer';
import { reduxStorage } from './storage';

import { apiMiddleware } from 'service/config';

const persistConfig = {
  blacklist: __DEV__ ? undefined : ['auth'],
  key: 'root',
  storage: reduxStorage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    apiMiddleware,
  ],
  reducer: persistedReducer,
});

// eslint-disable-next-line prefer-const
export let persistor = persistStore(store);

export default store;

export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<typeof store.getState>;
