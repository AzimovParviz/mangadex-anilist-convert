import {
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
} from "@reduxjs/toolkit";
import mangadexReducer from "../features/mangadex/mangadexSlice";
import anilistReducer from "../features/anilist/anilistSlice";

export const store = configureStore({
  reducer: {
    mangadex: mangadexReducer,
    anilist: anilistReducer,
  },
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      mangadex: mangadexReducer,
      anilist: anilistReducer,
    },
    preloadedState,
  });
};
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
