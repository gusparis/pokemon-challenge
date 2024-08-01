import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@auth/jwt-auth.guard';
import { PokemonType } from '@pokemon-shared/dto';
import { PokemonTypeService } from '@pokemon-type/pokemon-type.service';

@ApiTags('types')
@Controller('types')
@UseGuards(JwtAuthGuard)
export class PokemonTypeController {
  constructor(private readonly pokemonTypeService: PokemonTypeService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch all Pokemon types.' })
  @ApiResponse({
    status: 200,
    description: 'All Pokemon type list.',
    type: [PokemonType],
  })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  findAllTypes() {
    return this.pokemonTypeService.findAllTypes();
  }
}
