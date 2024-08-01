import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PokemonType } from '@pokemon-shared/dto';

@Injectable()
export class PokemonTypeService {
  constructor(
    @InjectRepository(PokemonType)
    private readonly pokemonTypeRepository: Repository<PokemonType>
  ) {}

  async findAllTypes(): Promise<PokemonType[]> {
    return await this.pokemonTypeRepository.find();
  }
}
