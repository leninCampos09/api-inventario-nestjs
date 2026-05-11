import { IsIn, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovementDto {
  @ApiProperty({ example: 'entrada' })
  @IsIn(['entrada', 'salida'])
  type!: 'entrada' | 'salida';

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  productId!: number;
}
