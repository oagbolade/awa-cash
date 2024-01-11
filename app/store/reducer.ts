import { combineReducers } from 'redux';

import { auth, persisted, theme } from './features';

import { apiReducer, apiReducerPath } from 'service/config';

export default combineReducers({
  [apiReducerPath]: apiReducer,
  auth,
  persisted,
  theme,
});
