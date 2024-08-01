import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BattleController } from '@battle/battle.controller';
import { BattleService } from '@battle/battle.service';
import { Pokemon } from '@pokemon-shared/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  providers: [BattleService],
  controllers: [BattleController],
})
export class BattleModule {}
