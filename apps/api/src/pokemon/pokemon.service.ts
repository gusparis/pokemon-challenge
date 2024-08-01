import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { FindOptionsWhere, Repository } from 'typeorm';

import {
  CreatePokemonDto,
  PokemonResponseDto,
  UpdatePokemonDto,
} from '@pokemon-shared/dto';
import { Pokemon } from '@pokemon-shared/entities';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    const pokemon = plainToInstance(Pokemon, createPokemonDto);
    return this.pokemonRepository.save(pokemon);
  }

  async findByFilter(
    skip: number,
    take: number,
    filters?: FindOptionsWhere<Pokemon>
  ): Promise<PokemonResponseDto> {
    const [data, count] = await this.pokemonRepository.findAndCount({
      where: filters,
      relations: ['type', 'weakness', 'resistance', 'rarity'],
      skip,
      take,
    });
    return { data, count };
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      select: ['id', 'name'],
    });
  }

  async findOne(id: number): Promise<Pokemon> {
    return this.pokemonRepository.findOne({
      where: { id },
      relations: ['type', 'weakness', 'resistance', 'rarity'],
    });
  }

  async update(
    id: number,
    updatePokemonDto: UpdatePokemonDto
  ): Promise<Pokemon> {
    const pokemon = plainToInstance(Pokemon, updatePokemonDto);
    await this.pokemonRepository.update(id, pokemon);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.pokemonRepository.delete(id);
  }
}
