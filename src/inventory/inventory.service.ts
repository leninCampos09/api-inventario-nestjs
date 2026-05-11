import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovementDto } from './dto/create-movement.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async createMovement(dto: CreateMovementDto) {
    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Product not found');

    const newStock = dto.type === 'entrada' ? product.stock + dto.quantity : product.stock - dto.quantity;
    if (newStock < 0) throw new BadRequestException('Stock cannot be negative');

    await this.prisma.product.update({ where: { id: dto.productId }, data: { stock: newStock } });

    return this.prisma.inventoryMovement.create({ data: { type: dto.type, quantity: dto.quantity, productId: dto.productId } });
  }

  async findAll() {
    return this.prisma.inventoryMovement.findMany({ include: { product: true }, orderBy: { date: 'desc' } });
  }
}
