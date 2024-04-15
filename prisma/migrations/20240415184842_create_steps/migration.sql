-- CreateTable
CREATE TABLE "PreparationStep" (
    "id" TEXT NOT NULL,
    "step" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "PreparationStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PreparationStep" ADD CONSTRAINT "PreparationStep_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
