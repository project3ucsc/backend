/*
  Warnings:

  - You are about to alter the column `datetime` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `lastupdated` on the `time slot` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `quiz` MODIFY `datetime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `time slot` MODIFY `lastupdated` DATETIME;
