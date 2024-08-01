import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchPokemons, fetchTypes } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';

import { Pagination } from '@components/Pagination';
import { PokemonCard } from '@components/PokemonCard';
import PokemonDetail from '@components/PokemonDetail';
import TypeSelector from '@components/TypeSelector';
import BattleModal from '@components/BattleModal';
import { Pokemon } from '@pokemon-shared/entities';

import { AppContainer, CardGrid, SearchContainer } from './PokemonAppStyles';

const PokemonApp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pokemons, loading, error } = useSelector(
    (state: RootState) => state.pokemon
  );

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const paramType = searchParams.get('type');
  const paramName = searchParams.get('name');

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [searchTerm, setSearchTerm] = useState(paramName || '');

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchPokemons({
        page: currentPage - 1,
        params: { type: paramType, name: paramName },
      })
    );
  }, [dispatch, currentPage, paramType, paramName]);

  const handleSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('type', 'all');
        if (searchTerm) {
          searchParams.set('name', searchTerm);
        } else {
          searchParams.delete('name');
        }
        navigate(`?${searchParams.toString()}`);
      }
    },
    [navigate, location, searchTerm]
  );

  const onPageChange = useCallback(
    (page: number) => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('page', (page + 1).toString());
      navigate(`?${searchParams.toString()}`);
    },
    [navigate, location]
  );

  const handleTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const type = e.target.value;
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('type', type);
      navigate(`?${searchParams.toString()}`);
    },
    [navigate, location]
  );

  const onPressPokemon = useCallback((pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  }, []);

  return (
    <AppContainer>
      <SearchContainer>
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
        <TypeSelector selectedType={paramType} {...{ handleTypeChange }} />
      </SearchContainer>
      {loading && <p>Loading...</p>}
      {pokemons?.data && (
        <>
          <CardGrid>
            {pokemons.data.map((pokemon: Pokemon) => (
              <PokemonCard {...{ pokemon, onPressPokemon }} key={pokemon.id} />
            ))}
          </CardGrid>
          <Pagination
            currentPage={currentPage - 1}
            totalPages={
              pokemons.count && pokemons.take
                ? Math.ceil(pokemons.count / pokemons.take)
                : 0
            }
            onPageChange={onPageChange}
          />
        </>
      )}
      <BattleModal
        show={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      >
        {selectedPokemon && <PokemonDetail pokemon={selectedPokemon} />}
      </BattleModal>
    </AppContainer>
  );
};

export default PokemonApp;
