/*
  Warnings:

  - You are about to drop the column `name` on the `period time` table. All the data in the column will be lost.
  - You are about to alter the column `datetime` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `period time` DROP COLUMN `name`;

-- AlterTable
ALTER TABLE `quiz` MODIFY `datetime` DATETIME NOT NULL;
