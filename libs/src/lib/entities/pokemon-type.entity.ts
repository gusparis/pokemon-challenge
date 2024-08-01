import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('pokemon_type')
export class PokemonType {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The ID of the Pokemon type' })
  id?: number;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Fire', description: 'The name of the Pokemon type' })
  type_name?: string;
}
