/*
  Warnings:

  - You are about to alter the column `datetime` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `lastupdated` on the `time slot` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `subjectgroup` to the `optionalsubs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `optionalsubs` ADD COLUMN `subjectgroup` ENUM('COMP', 'OPTIONAL_69', 'OL_BUCKET_1', 'OL_BUCKET_2', 'OL_BUCKET_3', 'MATH_CHEM_IT', 'BIO_PHY_AGRI', 'ART_BLA', 'COM_IT', 'TECH_IT') NOT NULL;

-- AlterTable
ALTER TABLE `quiz` MODIFY `datetime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `studentdetail` ADD COLUMN `status` ENUM('NO_ENROll', 'PENDING', 'ACTIVE') NOT NULL DEFAULT 'NO_ENROll';

-- AlterTable
ALTER TABLE `time slot` MODIFY `lastupdated` DATETIME;
