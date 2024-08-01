import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PokemonType } from '@pokemon-shared/entities';
import { PokemonTypeController } from '@pokemon-type/pokemon-type.controller';
import { PokemonTypeService } from '@pokemon-type/pokemon-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonType])],
  providers: [PokemonTypeService],
  controllers: [PokemonTypeController],
})
export class PokemonTypeModule {}
