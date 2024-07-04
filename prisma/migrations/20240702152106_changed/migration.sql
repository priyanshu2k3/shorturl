/*
  Warnings:

  - You are about to drop the column `body` on the `RequestLog` table. All the data in the column will be lost.
  - You are about to drop the column `queryParams` on the `RequestLog` table. All the data in the column will be lost.
  - You are about to drop the column `urlId` on the `RequestLog` table. All the data in the column will be lost.
  - Added the required column `urlShort` to the `RequestLog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RequestLog" DROP CONSTRAINT "RequestLog_urlId_fkey";

-- AlterTable
ALTER TABLE "RequestLog" DROP COLUMN "body",
DROP COLUMN "queryParams",
DROP COLUMN "urlId",
ADD COLUMN     "urlShort" TEXT NOT NULL,
ALTER COLUMN "ipAddress" DROP NOT NULL,
ALTER COLUMN "userAgent" DROP NOT NULL,
ALTER COLUMN "method" DROP NOT NULL,
ALTER COLUMN "requestUrl" DROP NOT NULL,
ALTER COLUMN "headers" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "prefix" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "RequestLog" ADD CONSTRAINT "RequestLog_urlShort_fkey" FOREIGN KEY ("urlShort") REFERENCES "Url"("short") ON DELETE RESTRICT ON UPDATE CASCADE;
