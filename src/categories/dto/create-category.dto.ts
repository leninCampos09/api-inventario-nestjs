import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electrónica' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'Descripción' })
  @IsOptional()
  @IsString()
  description?: string;
}
