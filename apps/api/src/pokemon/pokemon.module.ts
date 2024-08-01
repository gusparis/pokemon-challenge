import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PokemonService } from '@pokemon/pokemon.service';
import { PokemonController } from '@pokemon/pokemon.controller';
import { Pokemon, PokemonType, Rarity } from '@pokemon-shared/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, PokemonType, Rarity])],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
