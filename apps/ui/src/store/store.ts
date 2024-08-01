import { configureStore } from '@reduxjs/toolkit';

import pokemonReducer from './slices/pokemonSlice';
import battleReducer from './slices/battleSlice';
import typeReducer from './slices/typeSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    battle: battleReducer,
    types: typeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './slices/pokemonSlice';
export * from './slices/battleSlice';
export * from './slices/typeSlice';
export * from './slices/authSlice';

export default store;
