
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import thunk from 'redux-thunk'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(), // This includes redux-thunk by
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
