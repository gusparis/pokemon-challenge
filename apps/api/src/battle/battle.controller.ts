import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';

import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { BattleService } from '@battle/battle.service';
import { BattleResponseDto } from '@pokemon-shared/dto';

@ApiTags('battles')
@Controller('battles')
@UseGuards(JwtAuthGuard)
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @Get()
  @ApiOperation({ summary: 'Battle two Pokemon' })
  @ApiResponse({
    status: 200,
    description: 'Battle result',
    type: BattleResponseDto,
  })
  @ApiQuery({
    name: 'attackerId',
    required: false,
    type: Number,
    description: 'Attacker Pokemon ID',
  })
  @ApiQuery({
    name: 'defenderId',
    required: false,
    type: Number,
    description: 'Defender Pokemon ID',
  })
  async battle(
    @Query('attackerId') attackerId: number,
    @Query('defenderId') defenderId: number
  ) {
    return this.battleService.battle(attackerId, defenderId);
  }
}
