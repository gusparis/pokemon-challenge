import React from 'react';
import {
  CardContainer,
  CardHeader,
  CardTitle,
  CardImage,
  CardStats,
  CardInfo,
  CardText,
  CardAttribute,
  CardFooter,
} from './PokemonCardStyles';
import { Pokemon } from '@pokemon-shared/*';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPressPokemon: (pokemon: Pokemon) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onPressPokemon,
}) => {
  return (
    <CardContainer onClick={() => onPressPokemon(pokemon)}>
      <CardHeader>
        <CardTitle>{pokemon.name}</CardTitle>
        <CardStats>HP {pokemon.hp}</CardStats>
      </CardHeader>
      <CardImage src={pokemon.image_url} alt={pokemon.name} />
      <CardInfo>
        <CardText>ATTACK: {pokemon.attack}</CardText>
      </CardInfo>
      <CardFooter>
        <CardAttribute>Weakness: {pokemon.weakness?.type_name}</CardAttribute>
        <CardAttribute>
          Resistance: {pokemon.resistance?.type_name}
        </CardAttribute>
        <CardAttribute>Retreat Cost: {pokemon.retreat_cost}</CardAttribute>
      </CardFooter>
    </CardContainer>
  );
};
