/*
  Warnings:

  - A unique constraint covering the columns `[userId,original]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_userId_original_key" ON "Url"("userId", "original");
