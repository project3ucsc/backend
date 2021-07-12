/*
  Warnings:

  - You are about to alter the column `datetime` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `quiz` MODIFY `datetime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `school` ADD COLUMN `no_of_almaths` INTEGER DEFAULT 0,
    ADD COLUMN `no_of_olclasses` INTEGER DEFAULT 0,
    ADD COLUMN `no_of_primaryclasses` INTEGER DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `user.email_unique` ON `user`(`email`);
