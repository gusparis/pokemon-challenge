import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { PokemonType } from '@pokemon-shared/entities';
import { getTypes } from '@services/api';

interface TypeState {
  loading: boolean;
  types: PokemonType[];
  error: string | null;
}

const initialState: TypeState = {
  loading: false,
  types: [],
  error: null,
};

export const fetchTypes = createAsyncThunk('types/fetchTypes', async () => {
  const response = await getTypes();
  return response;
});

const typeSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.types = [{ id: 0, type_name: 'All' }, ...action.payload];
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch types';
      });
  },
});

export default typeSlice.reducer;
