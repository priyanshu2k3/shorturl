/*
  Warnings:

  - You are about to drop the column `requestUrl` on the `RequestLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RequestLog" DROP COLUMN "requestUrl";
