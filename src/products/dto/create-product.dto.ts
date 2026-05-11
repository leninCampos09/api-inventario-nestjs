import { IsString, IsOptional, IsNumber, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Manzana' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Fruta fresca' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1.5 })
  @IsNumber()
  price!: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  stock!: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  categoryId?: number;
}
