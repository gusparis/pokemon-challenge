import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('rarity')
export class Rarity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'The ID of the rarity' })
  id?: number;

  @Column({ nullable: false })
  @ApiProperty({ example: 'Common', description: 'The name of the rarity' })
  rarity_name?: string;
}
