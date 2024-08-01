import { BattleResponseDto } from '@pokemon-shared/dto';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { battle } from '@services/api';

interface BattleState {
  loading: boolean;
  battleResult: BattleResponseDto | null;
  error: string | null;
}

const initialState: BattleState = {
  loading: false,
  battleResult: null,
  error: null,
};

export const battlePokemon = createAsyncThunk<
  any,
  { attackerId: number; defenderId: number }
>('battle/battlePokemon', async ({ attackerId, defenderId }) => {
  const response = await battle(attackerId, defenderId);
  return response;
});

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(battlePokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        battlePokemon.fulfilled,
        (state, action: PayloadAction<BattleResponseDto>) => {
          state.loading = false;
          state.battleResult = action.payload;
        }
      )
      .addCase(battlePokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to battle pokemon';
      });
  },
});

export default battleSlice.reducer;
