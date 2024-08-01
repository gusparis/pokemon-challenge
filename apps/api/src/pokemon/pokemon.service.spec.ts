import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '@pokemon-shared/entities';
import {
  CreatePokemonDto,
  UpdatePokemonDto,
  PokemonResponseDto,
} from '@pokemon-shared/dto';
import { plainToInstance } from 'class-transformer';

describe('PokemonService', () => {
  let service: PokemonService;
  let repository: Repository<Pokemon>;

  const mockPokemonRepository = {
    save: jest.fn(),
    findAndCount: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: getRepositoryToken(Pokemon),
          useValue: mockPokemonRepository,
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    repository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and save a new pokemon', async () => {
      const createPokemonDto: CreatePokemonDto = {
        name: 'Pikachu',
        type_id: 2,
        hp: 35,
        attack: 55,
        defense: 40,
        weakness_id: 8,
        resistance_id: 5,
        rarity_id: 1,
      };
      const savedPokemon = { id: 1, ...createPokemonDto };

      mockPokemonRepository.save.mockResolvedValue(savedPokemon);

      const result = await service.create(createPokemonDto);

      expect(mockPokemonRepository.save).toHaveBeenCalledWith(
        plainToInstance(Pokemon, createPokemonDto)
      );
      expect(result).toEqual(savedPokemon);
    });
  });

  describe('findByFilter', () => {
    it('should return a list of pokemons with count based on filters', async () => {
      const filters = { name: 'Pikachu' };
      const pokemonList = [{ id: 1, name: 'Pikachu', type: 'Electric' }];
      const count = 1;

      mockPokemonRepository.findAndCount.mockResolvedValue([
        pokemonList,
        count,
      ]);

      const result: PokemonResponseDto = await service.findByFilter(
        0,
        10,
        filters
      );

      expect(mockPokemonRepository.findAndCount).toHaveBeenCalledWith({
        where: filters,
        relations: ['type', 'weakness', 'resistance', 'rarity'],
        skip: 0,
        take: 10,
      });
      expect(result).toEqual({ data: pokemonList, count });
    });
  });

  describe('findAll', () => {
    it('should return a list of all pokemons with only id and name', async () => {
      const pokemonList = [
        { id: 1, name: 'Pikachu' },
        { id: 2, name: 'Charizard' },
      ];

      mockPokemonRepository.find.mockResolvedValue(pokemonList);

      const result = await service.findAll();

      expect(mockPokemonRepository.find).toHaveBeenCalledWith({
        select: ['id', 'name'],
      });
      expect(result).toEqual(pokemonList);
    });
  });

  describe('findOne', () => {
    it('should return a pokemon by id with relations', async () => {
      const pokemon = {
        id: 1,
        name: 'Pikachu',
        type: { type_name: 'Electric' },
        weakness: [],
        resistance: [],
        rarity: 'Common',
      };

      mockPokemonRepository.findOne.mockResolvedValue(pokemon);

      const result = await service.findOne(1);

      expect(mockPokemonRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['type', 'weakness', 'resistance', 'rarity'],
      });
      expect(result).toEqual(pokemon);
    });
  });

  describe('update', () => {
    it('should update a pokemon and return the updated entity', async () => {
      const updatePokemonDto: UpdatePokemonDto = {
        name: 'Raichu',
        type_id: 2,
        hp: 60,
        attack: 90,
        defense: 55,
        weakness_id: 8,
        resistance_id: 5,
        rarity_id: 1,
      };
      const updatedPokemon = { id: 1, ...updatePokemonDto };

      mockPokemonRepository.update.mockResolvedValue(undefined);
      mockPokemonRepository.findOne.mockResolvedValue(updatedPokemon);

      const result = await service.update(1, updatePokemonDto);

      expect(mockPokemonRepository.update).toHaveBeenCalledWith(
        1,
        plainToInstance(Pokemon, updatePokemonDto)
      );
      expect(result).toEqual(updatedPokemon);
    });
  });

  describe('remove', () => {
    it('should delete a pokemon by id', async () => {
      mockPokemonRepository.delete.mockResolvedValue(undefined);

      await service.remove(1);

      expect(mockPokemonRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
