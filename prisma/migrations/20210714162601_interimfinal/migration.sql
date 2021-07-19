/*
  Warnings:

  - You are about to alter the column `datetime` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `no_of_almaths` on the `school` table. All the data in the column will be lost.
  - You are about to drop the column `no_of_olclasses` on the `school` table. All the data in the column will be lost.
  - You are about to drop the column `no_of_primaryclasses` on the `school` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `quiz` MODIFY `datetime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `school` DROP COLUMN `no_of_almaths`,
    DROP COLUMN `no_of_olclasses`,
    DROP COLUMN `no_of_primaryclasses`,
    ADD COLUMN `isconfig` BOOLEAN NOT NULL DEFAULT false;
