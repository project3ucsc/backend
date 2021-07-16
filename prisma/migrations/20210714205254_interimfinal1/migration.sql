/*
  Warnings:

  - You are about to alter the column `datetime` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `quiz` MODIFY `datetime` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `schoolsectiondetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` ENUM('G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12MATH', 'G12BIO', 'G12ART', 'G12COM', 'G12TECH', 'G13MATH', 'G13BIO', 'G13ART', 'G13COM', 'G13TECH') NOT NULL,
    `classcount` INTEGER NOT NULL,
    `school_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `schoolsectiondetail` ADD FOREIGN KEY (`school_id`) REFERENCES `school`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
