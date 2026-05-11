"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.inventoryMovement.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    const electronics = await prisma.category.create({ data: { name: 'Electrónica', description: 'Dispositivos y accesorios' } });
    const groceries = await prisma.category.create({ data: { name: 'Alimentos', description: 'Comestibles y bebidas' } });
    const phone = await prisma.product.create({
        data: {
            name: 'Teléfono',
            description: 'Smartphone moderno',
            price: 299.99,
            stock: 50,
            categoryId: electronics.id,
        },
    });
    const rice = await prisma.product.create({
        data: {
            name: 'Arroz',
            description: 'Paquete 1kg',
            price: 2.5,
            stock: 200,
            categoryId: groceries.id,
        },
    });
    await prisma.inventoryMovement.createMany({
        data: [
            { type: 'entrada', quantity: 50, productId: phone.id },
            { type: 'entrada', quantity: 200, productId: rice.id },
        ],
    });
    console.log('Seeding completado.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map