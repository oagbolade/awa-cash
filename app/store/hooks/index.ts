import {
  TypedUseSelectorHook,
  useDispatch as useRRDispatch,
  useSelector as useRRSelector,
} from 'react-redux';

import type { AppDispatch, AppStateType } from '../store';

export const useDispatch = (): AppDispatch => useRRDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppStateType> = useRRSelector;
