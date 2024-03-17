import { configureStore } from "@reduxjs/toolkit";
import { User } from "../types/user/User";
import { authReducer } from "./auth.slice";

export interface UserStore {
  user: User;
  isAuth: boolean;
  isLoading: boolean;
  error: null | string;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: [
          "payload.config",
          "payload.request",
          "payload.headers",
          "error",
          "meta.arg",
        ],
      },
    }),
});

export type rootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
