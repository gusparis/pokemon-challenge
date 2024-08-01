import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsUrl, IsOptional } from 'class-validator';

export class CreatePokemonDto {
  @ApiProperty({ example: 'Pikachu', description: 'The name of the Pokemon' })
  @IsString()
  name?: string;

  @ApiProperty({ example: 2, description: 'The ID of the Pokemon type' })
  @IsInt()
  type_id?: number;

  @ApiProperty({ example: 60, description: 'The HP of the Pokemon' })
  @IsInt()
  hp?: number;

  @ApiProperty({ example: 55, description: 'The attack value of the Pokemon' })
  @IsInt()
  attack?: number;

  @ApiProperty({ example: 40, description: 'The defense value of the Pokemon' })
  @IsInt()
  defense?: number;

  @ApiProperty({
    example: 8,
    description: 'The ID of the Pokemon weakness type',
    required: false,
  })
  @IsOptional()
  @IsInt()
  weakness_id?: number;

  @ApiProperty({
    example: 5,
    description: 'The ID of the Pokemon resistance type',
    required: false,
  })
  @IsOptional()
  @IsInt()
  resistance_id?: number;

  @ApiProperty({ example: 1, description: 'The retreat cost of the Pokemon' })
  @IsInt()
  retreat_cost?: number;

  @ApiProperty({ example: 1, description: 'The ID of the rarity type' })
  @IsInt()
  rarity_id?: number;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'The image URL of the Pokemon',
    required: false,
  })
  @IsOptional()
  @IsUrl()
  image_url?: string;
}
