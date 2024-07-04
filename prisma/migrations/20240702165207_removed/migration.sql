/*
  Warnings:

  - You are about to drop the column `method` on the `RequestLog` table. All the data in the column will be lost.
  - You are about to drop the column `urlShort` on the `RequestLog` table. All the data in the column will be lost.
  - Added the required column `short` to the `RequestLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RequestLog" DROP CONSTRAINT "RequestLog_urlShort_fkey";

-- AlterTable
ALTER TABLE "RequestLog" DROP COLUMN "method",
DROP COLUMN "urlShort",
ADD COLUMN     "short" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RequestLog" ADD CONSTRAINT "RequestLog_short_fkey" FOREIGN KEY ("short") REFERENCES "Url"("short") ON DELETE RESTRICT ON UPDATE CASCADE;
