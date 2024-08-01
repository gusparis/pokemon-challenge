import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BattleResponseDto, Pokemon } from '@pokemon-shared/entities';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>
  ) {}

  async battle(
    attackerId: number,
    defenderId: number
  ): Promise<BattleResponseDto> {
    const attacker = await this.pokemonRepository.findOne({
      where: { id: attackerId },
      relations: ['type', 'weakness', 'resistance', 'rarity'],
    });
    const defender = await this.pokemonRepository.findOne({
      where: { id: defenderId },
      relations: ['type', 'weakness', 'resistance', 'rarity'],
    });
    if (!attacker || !defender) {
      throw new NotFoundException('Pokemon not found');
    }
    const originalAttack = attacker.attack;
    let modifiedAttack = originalAttack;
    if (defender.weakness && defender.weakness.id === attacker.type.id) {
      modifiedAttack *= 2; // Double damage for weakness
    }
    if (defender.resistance && defender.resistance.id === attacker.type.id) {
      modifiedAttack /= 2; // Half damage for resistance
    }
    if (modifiedAttack === originalAttack) {
      modifiedAttack = undefined;
    }
    const success = (modifiedAttack || originalAttack) >= defender.hp;
    return {
      success,
      originalAttack,
      modifiedAttack,
    };
  }
}
