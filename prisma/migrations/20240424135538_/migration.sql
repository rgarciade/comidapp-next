-- CreateTable
CREATE TABLE "ForkityKeys" (
    "id" SERIAL NOT NULL,
    "spanish_word" TEXT NOT NULL,
    "english_word" TEXT NOT NULL,

    CONSTRAINT "ForkityKeys_pkey" PRIMARY KEY ("id")
);
