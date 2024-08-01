import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { Pokemon } from '@pokemon-shared/entities';
import { BattleService } from './battle.service';

const mockPokemonRepository = () => ({
  findOne: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('BattleService', () => {
  let service: BattleService;
  let repository: MockRepository<Pokemon>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BattleService,
        {
          provide: getRepositoryToken(Pokemon),
          useFactory: mockPokemonRepository,
        },
      ],
    }).compile();

    service = module.get<BattleService>(BattleService);
    repository = module.get<MockRepository<Pokemon>>(
      getRepositoryToken(Pokemon)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return battle result with double damage for weakness', async () => {
    const attacker = {
      id: 1,
      name: 'Charizard',
      attack: 100,
      type: { id: 1, type_name: 'Fire' },
      hp: 180,
      weakness: { id: 6, type_name: 'Water' },
      resistance: null,
      rarity: { id: 3, rarity_name: 'Rare' },
    } as Pokemon;
    const defender = {
      id: 2,
      name: 'Bulbasaur',
      attack: 50,
      type: { id: 7, type_name: 'Grass' },
      hp: 45,
      weakness: { id: 1, type_name: 'Fire' },
      resistance: null,
      rarity: { id: 1, rarity_name: 'Common' },
    } as Pokemon;

    repository.findOne.mockResolvedValueOnce(attacker);
    repository.findOne.mockResolvedValueOnce(defender);

    const result = await service.battle(1, 2);
    expect(result.success).toBe(true);
    expect(result.originalAttack).toBe(100);
    expect(result.modifiedAttack).toBe(200);
  });

  it('should return battle result with half damage for resistance', async () => {
    const attacker = {
      id: 1,
      name: 'Charizard',
      attack: 100,
      type: { id: 1, type_name: 'Fire' },
      hp: 180,
      weakness: { id: 6, type_name: 'Water' },
      resistance: null,
      rarity: { id: 3, rarity_name: 'Rare' },
    } as Pokemon;
    const defender = {
      id: 2,
      name: 'Squirtle',
      attack: 50,
      type: { id: 6, type_name: 'Water' },
      hp: 44,
      weakness: { id: 7, type_name: 'Grass' },
      resistance: { id: 1, type_name: 'Fire' },
      rarity: { id: 1, rarity_name: 'Common' },
    } as Pokemon;

    repository.findOne.mockResolvedValueOnce(attacker);
    repository.findOne.mockResolvedValueOnce(defender);

    const result = await service.battle(1, 2);
    expect(result.success).toBe(true);
    expect(result.originalAttack).toBe(100);
    expect(result.modifiedAttack).toBe(50);
  });

  it('should throw NotFoundException if any Pokemon is not found', async () => {
    repository.findOne.mockResolvedValueOnce(null);

    await expect(service.battle(1, 2)).rejects.toThrow(NotFoundException);
  });

  it('should return battle result with undefined modifiedAttack if no modification', async () => {
    const attacker = {
      id: 1,
      name: 'Charizard',
      attack: 100,
      type: { id: 1, type_name: 'Fire' },
      hp: 180,
      weakness: { id: 6, type_name: 'Water' },
      resistance: null,
      rarity: { id: 3, rarity_name: 'Rare' },
    } as Pokemon;
    const defender = {
      id: 2,
      name: 'Onix',
      attack: 40,
      type: { id: 3, type_name: 'Rock' },
      hp: 90,
      weakness: { id: 7, type_name: 'Grass' },
      resistance: null,
      rarity: { id: 2, rarity_name: 'Uncommon' },
    } as Pokemon;

    repository.findOne.mockResolvedValueOnce(attacker);
    repository.findOne.mockResolvedValueOnce(defender);

    const result = await service.battle(1, 2);
    expect(result.success).toBe(true);
    expect(result.originalAttack).toBe(100);
    expect(result.modifiedAttack).toBeUndefined();
  });
});
