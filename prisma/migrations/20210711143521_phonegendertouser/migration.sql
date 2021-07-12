/*
  Warnings:

  - You are about to alter the column `datetime` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `quiz` MODIFY `datetime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `gender` CHAR(1),
    ADD COLUMN `phone` VARCHAR(12),
    MODIFY `password` VARCHAR(64) NOT NULL;
