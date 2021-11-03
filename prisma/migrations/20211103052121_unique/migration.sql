/*
  Warnings:

  - A unique constraint covering the columns `[address]` on the table `CoffeeShop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShop.address_unique" ON "CoffeeShop"("address");
