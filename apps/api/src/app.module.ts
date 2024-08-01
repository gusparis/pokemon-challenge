import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '@auth/auth.module';
import { BattleModule } from '@battle/battle.module';
import { Pokemon, PokemonType, Rarity, User } from '@pokemon-shared/entities';
import { PokemonModule } from '@pokemon/pokemon.module';
import { PokemonTypeModule } from '@pokemon-type/pokemon-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Pokemon, PokemonType, Rarity, User],
      synchronize: false,
    }),
    AuthModule,
    PokemonModule,
    PokemonTypeModule,
    BattleModule,
  ],
})
export class AppModule {}
