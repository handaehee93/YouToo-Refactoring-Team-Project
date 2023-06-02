import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import loginReducer from '../slice/LoginSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;