/*
  Warnings:

  - You are about to drop the column `subject_id` on the `optionalsubs` table. All the data in the column will be lost.
  - You are about to alter the column `datetime` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `lastupdated` on the `time slot` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `sd_id` to the `optionalsubs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `optionalsubs` DROP FOREIGN KEY `optionalsubs_ibfk_2`;

-- AlterTable
ALTER TABLE `optionalsubs` DROP COLUMN `subject_id`,
    ADD COLUMN `sd_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `quiz` MODIFY `datetime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `time slot` MODIFY `lastupdated` DATETIME;

-- AddForeignKey
ALTER TABLE `optionalsubs` ADD FOREIGN KEY (`sd_id`) REFERENCES `subject detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
