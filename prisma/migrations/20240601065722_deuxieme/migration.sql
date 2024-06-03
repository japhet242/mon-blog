/*
  Warnings:

  - Added the required column `image` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "content2" TEXT,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "image2" TEXT;

-- CreateTable
CREATE TABLE "vresetPassworrdToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vresetPassworrdToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vresetPassworrdToken_email_token_key" ON "vresetPassworrdToken"("email", "token");
