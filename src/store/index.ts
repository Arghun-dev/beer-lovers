import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { beersService } from 'services/beersService';

// Reducers
const combinedReducers = combineReducers({
  [beersService.reducerPath]: beersService.reducer,
});

export const store = configureStore({
  reducer: combinedReducers,

  devTools: process.env.NODE_ENV !== 'production',

  // Enabeling caching, invalidation, polling, and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([beersService.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
