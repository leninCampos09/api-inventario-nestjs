-- Inicializa la base de datos y las tablas para la API de inventario
-- Uso: mysql -u root -p < prisma/init.sql

CREATE DATABASE IF NOT EXISTS `inventory_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `inventory_db`;

-- Categorías
CREATE TABLE IF NOT EXISTS `Category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Productos
CREATE TABLE IF NOT EXISTS `Product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DOUBLE NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `categoryId` INT,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX (`categoryId`),
  CONSTRAINT `fk_product_category` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Movimientos de inventario
CREATE TABLE IF NOT EXISTS `InventoryMovement` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` ENUM('entrada','salida') NOT NULL,
  `quantity` INT NOT NULL,
  `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `productId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX (`productId`),
  CONSTRAINT `fk_movement_product` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Datos de ejemplo
INSERT INTO `Category` (`name`, `description`) VALUES
('Electrónica', 'Dispositivos y accesorios'),
('Alimentos', 'Comestibles y bebidas');

INSERT INTO `Product` (`name`, `description`, `price`, `stock`, `categoryId`) VALUES
('Teléfono', 'Smartphone moderno', 299.99, 50, 1),
('Arroz', 'Paquete 1kg', 2.5, 200, 2);

INSERT INTO `InventoryMovement` (`type`, `quantity`, `productId`) VALUES
('entrada', 50, 1),
('entrada', 200, 2);
