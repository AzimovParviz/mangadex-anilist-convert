import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import mangadexReducer from "../features/mangadex/mangadexSlice";
import anilistReducer from "../features/anilist/anilistSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    mangadex: mangadexReducer,
    anilist: anilistReducer,
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
