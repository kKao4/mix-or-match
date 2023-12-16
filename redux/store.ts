import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlice";
import cardGameReducer from "./cardGameSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    cardGame: cardGameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
