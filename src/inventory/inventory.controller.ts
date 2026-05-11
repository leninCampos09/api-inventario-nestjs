import { Body, Controller, Get, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private service: InventoryService) {}

  @Post('movements')
  @ApiOperation({ summary: 'Create inventory movement' })
  createMovement(@Body() dto: CreateMovementDto) {
    return this.service.createMovement(dto);
  }

  @Get('movements')
  @ApiOperation({ summary: 'List inventory movements' })
  findAll() {
    return this.service.findAll();
  }
}
