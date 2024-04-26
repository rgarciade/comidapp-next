/*
  Warnings:

  - A unique constraint covering the columns `[externalId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Recipe_externalId_key" ON "Recipe"("externalId");
