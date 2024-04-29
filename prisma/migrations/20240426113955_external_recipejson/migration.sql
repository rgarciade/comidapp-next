-- CreateTable
CREATE TABLE "ExternalRecipe" (
    "recipeId" TEXT NOT NULL,
    "jsonData" JSONB NOT NULL,

    CONSTRAINT "ExternalRecipe_pkey" PRIMARY KEY ("recipeId")
);
