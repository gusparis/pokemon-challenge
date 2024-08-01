import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PokemonResponseDto } from '@pokemon-shared/dto';
import { Pokemon } from '@pokemon-shared/entities';
import { RootState } from '@store/store';
import { getPokemons, fetchAll } from '@services/api';

interface PokemonState {
  loading: boolean;
  pokemons: PokemonResponseDto | null;
  error: string | null;
  allPokemons: Pokemon[];
}

const initialState: PokemonState = {
  loading: false,
  pokemons: null,
  error: null,
  allPokemons: [],
};

export const fetchPokemons = createAsyncThunk<
  PokemonResponseDto,
  { page: number; params?: any }
>('pokemon/fetchPokemons', async ({ page = 0, params = {} }, { getState }) => {
  const state = getState() as RootState;
  const selectedType = state.types.types;
  const newParams = {
    ...params,
    type: params.type
      ? selectedType.find((type) => type.type_name === params.type)?.id
      : 0,
  };
  const response = await getPokemons(page, newParams);
  return response;
});

export const catchThemAll = createAsyncThunk(
  'pokemon/catchThemAll',
  async () => {
    const response = await fetchAll();
    return response;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPokemons.fulfilled,
        (state, action: PayloadAction<PokemonResponseDto>) => {
          state.loading = false;
          state.pokemons = action.payload;
        }
      )
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pokemons';
      })
      .addCase(catchThemAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        catchThemAll.fulfilled,
        (state, action: PayloadAction<Pokemon[]>) => {
          state.loading = false;
          state.allPokemons = action.payload;
        }
      )
      .addCase(catchThemAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to search pokemons';
      });
  },
});

export default pokemonSlice.reducer;
