/*
  Warnings:

  - You are about to alter the column `datetime` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `quiz` MODIFY `datetime` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `resource section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `sdid` INTEGER NOT NULL,

    UNIQUE INDEX `resource section.id_unique`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resource detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `section_id` INTEGER NOT NULL,
    `type` VARCHAR(6) NOT NULL,
    `filename` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `resource detail.id_unique`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resource section` ADD FOREIGN KEY (`sdid`) REFERENCES `subject detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resource detail` ADD FOREIGN KEY (`section_id`) REFERENCES `resource section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
