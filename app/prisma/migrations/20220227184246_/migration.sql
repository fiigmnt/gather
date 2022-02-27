/*
  Warnings:

  - You are about to drop the column `reaction` on the `servers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "servers" DROP COLUMN "reaction",
ADD COLUMN     "emoji" TEXT NOT NULL DEFAULT E'📰';
