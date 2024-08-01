import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { PokemonType } from './pokemon-type.entity';
import { Rarity } from './rarity.entity';

@Entity('pokemon')
export class Pokemon {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The ID of the Pokemon' })
  id?: number;

  @Column()
  @ApiProperty({ example: 'Pikachu', description: 'The name of the Pokemon' })
  name?: string;

  @ManyToOne(() => PokemonType)
  @JoinColumn({ name: 'type_id' })
  @ApiProperty({
    type: () => PokemonType,
    description: 'The type of the Pokemon',
  })
  type?: PokemonType;

  @Column()
  @ApiProperty({ example: 60, description: 'The HP of the Pokemon' })
  hp?: number;

  @Column()
  @ApiProperty({ example: 55, description: 'The attack value of the Pokemon' })
  attack?: number;

  @Column()
  @ApiProperty({ example: 40, description: 'The defense value of the Pokemon' })
  defense?: number;

  @ManyToOne(() => PokemonType)
  @JoinColumn({ name: 'weakness_id' })
  @ApiProperty({
    type: () => PokemonType,
    description: 'The weakness of the Pokemon',
  })
  weakness?: PokemonType;

  @ManyToOne(() => PokemonType)
  @JoinColumn({ name: 'resistance_id' })
  @ApiProperty({
    type: () => PokemonType,
    description: 'The resistance of the Pokemon',
  })
  resistance?: PokemonType;

  @Column()
  @ApiProperty({ example: 1, description: 'The retreat cost of the Pokemon' })
  retreat_cost?: number;

  @ManyToOne(() => Rarity)
  @JoinColumn({ name: 'rarity_id' })
  @ApiProperty({ type: () => Rarity, description: 'The rarity of the Pokemon' })
  rarity?: Rarity;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'The image URL of the Pokemon',
  })
  image_url?: string;
}
