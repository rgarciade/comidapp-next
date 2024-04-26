-- CreateEnum
CREATE TYPE "Language" AS ENUM ('es', 'en');

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'es';
