import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

import { Pokemon } from '../entities';

export class PokemonResponseDto {
  @ApiProperty({
    type: () => [Pokemon],
    description: 'The Pokemon list',
  })
  data?: Pokemon[];
  @ApiProperty({ example: 1, description: 'Total amount of Pokemons found.' })
  @IsInt()
  count?: number;
  @ApiProperty({ example: 0, description: 'Offset' })
  @IsInt()
  skip?: number;
  @ApiProperty({ example: 1, description: 'Amount to fetch' })
  @IsInt()
  take?: number;
}
