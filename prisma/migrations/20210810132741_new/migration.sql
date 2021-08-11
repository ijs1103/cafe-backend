/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `CoffeeShop` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Category.name_unique" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShop.name_unique" ON "CoffeeShop"("name");
