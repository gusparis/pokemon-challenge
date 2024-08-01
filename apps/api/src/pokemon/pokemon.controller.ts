import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';

import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import {
  CreatePokemonDto,
  PokemonResponseDto,
  UpdatePokemonDto,
} from '@pokemon-shared/dto';
import { Pokemon } from '@pokemon-shared/entities';
import { PokemonService } from '@pokemon/pokemon.service';

@ApiTags('pokemons')
@Controller('pokemons')
@UseGuards(JwtAuthGuard)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Pokemon' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Pokemon,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Pokemons by filter.' })
  @ApiResponse({
    status: 200,
    description: 'Return all pokemons.',
    type: PokemonResponseDto,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of records to skip',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Number of records to take',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Name of the Pokemon',
  })
  @ApiQuery({
    name: 'type_id',
    required: false,
    type: Number,
    description: 'Type ID of the Pokemon',
  })
  @ApiQuery({
    name: 'rarity_id',
    required: false,
    type: Number,
    description: 'Rarity ID of the Pokemon',
  })
  @ApiQuery({
    name: 'min_hp',
    required: false,
    type: Number,
    description: 'Minimum HP of the Pokemon',
  })
  @ApiQuery({
    name: 'max_hp',
    required: false,
    type: Number,
    description: 'Maximum HP of the Pokemon',
  })
  async findByFilter(
    @Query('skip') skip = 0,
    @Query('take') take = 10,
    @Query('name') name?: string,
    @Query('type_id') type_id?: number,
    @Query('rarity_id') rarity_id?: number,
    @Query('min_hp') min_hp?: number,
    @Query('max_hp') max_hp?: number
  ) {
    const filters: FindOptionsWhere<Pokemon> = {};
    if (name) filters.name = ILike(`%${name}%`);
    if (type_id && type_id != 0) filters.type = { id: type_id };
    if (rarity_id) filters.rarity = { id: rarity_id };
    if (min_hp) filters.hp = MoreThanOrEqual(min_hp);
    if (max_hp) filters.hp = LessThanOrEqual(max_hp);

    const result = await this.pokemonService.findByFilter(skip, take, filters);
    return {
      data: result.data,
      count: result.count,
      skip,
      take,
    };
  }

  @Get('/all')
  @ApiOperation({ summary: 'Find all Pokemons.' })
  @ApiResponse({
    status: 200,
    description: 'Return the all the Pokemons.',
    type: [Pokemon],
  })
  async findAll() {
    return await this.pokemonService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Pokemon by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the Pokemon' })
  @ApiResponse({
    status: 200,
    description: 'Return the Pokemon.',
    type: Pokemon,
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Pokemon by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the Pokemon' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Pokemon,
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(+id, updatePokemonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Pokemon by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the Pokemon' })
  @ApiResponse({
    status: 200,
    description: 'The Pokemon has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}
