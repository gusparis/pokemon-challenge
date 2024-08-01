import { ApiProperty } from '@nestjs/swagger';

export class BattleResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indicates if the attacker won the battle',
  })
  success?: boolean;

  @ApiProperty({
    example: 160,
    description: 'The original attack value of the attacker',
  })
  originalAttack?: number;

  @ApiProperty({
    example: 320,
    description: 'The modified attack value of the attacker',
  })
  modifiedAttack?: number;
}
