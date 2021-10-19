/*
  Warnings:

  - You are about to drop the column `socialProvider` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `socialToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "socialProvider",
DROP COLUMN "socialToken",
ADD COLUMN     "provider" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
