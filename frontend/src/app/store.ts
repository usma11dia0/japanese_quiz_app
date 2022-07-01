import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer } from "../redux/reducer";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    reducer: reducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
