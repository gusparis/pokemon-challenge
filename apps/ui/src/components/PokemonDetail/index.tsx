import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState, AppDispatch } from '@store/store';
import { battlePokemon, catchThemAll } from '@store/slices';

import {
  DetailContainer,
  DetailImage,
  DetailInfo,
  DetailName,
  BattleButton,
  BattleLabel,
  BattleSelect,
  BattleSelector,
  BattleResult,
} from './PokemonDetailStyles';

interface PokemonDetailProps {
  pokemon: any;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { allPokemons } = useSelector((state: RootState) => state.pokemon);
  const { battleResult, loading } = useSelector(
    (state: RootState) => state.battle
  );
  const [selectedDefender, setSelectedDefender] = useState<number | null>(null);

  useEffect(() => {
    dispatch(catchThemAll());
  }, [dispatch]);

  const handleBattle = useCallback(() => {
    if (selectedDefender !== null) {
      dispatch(
        battlePokemon({ attackerId: pokemon.id, defenderId: selectedDefender })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, selectedDefender]);

  return (
    <DetailContainer>
      <DetailImage src={pokemon.image_url} alt={pokemon.name} />
      <DetailName>{pokemon.name}</DetailName>
      <DetailInfo>
        <strong>Type:</strong> {pokemon.type.type_name}
      </DetailInfo>
      <DetailInfo>
        <strong>HP:</strong> {pokemon.hp}
      </DetailInfo>
      <DetailInfo>
        <strong>Attack:</strong> {pokemon.attack}
      </DetailInfo>
      <DetailInfo>
        <strong>Defense:</strong> {pokemon.defense}
      </DetailInfo>
      <BattleSelector>
        <BattleLabel>Select a Pokemon to battle:</BattleLabel>
        <BattleSelect
          id="battle-select"
          onChange={(e) => setSelectedDefender(Number(e.target.value))}
        >
          <option value="">Select...</option>
          {allPokemons
            .filter((p) => p.id !== pokemon.id)
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </BattleSelect>
      </BattleSelector>
      <BattleButton
        onClick={handleBattle}
        disabled={loading || selectedDefender === null}
      >
        {loading ? 'Battling...' : 'Battle'}
      </BattleButton>
      {battleResult && (
        <BattleResult>
          <p>
            <strong>Battle Result:</strong>
          </p>
          <p>
            <strong>Success:</strong> {battleResult.success ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Original Attack:</strong> {battleResult.originalAttack}
          </p>
          {battleResult.modifiedAttack !== undefined && (
            <p>
              <strong>Modified Attack:</strong> {battleResult.modifiedAttack}
            </p>
          )}
        </BattleResult>
      )}
    </DetailContainer>
  );
};

export default PokemonDetail;
