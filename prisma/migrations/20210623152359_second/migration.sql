/*
  Warnings:

  - Added the required column `school_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `school_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `classroom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` ENUM('G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12MATH', 'G12BIO', 'G12ART', 'G12COM', 'G12TECH', 'G13MATH', 'G13BIO', 'G13ART', 'G13COM', 'G13TECH') NOT NULL,
    `name` CHAR(1) NOT NULL,
    `school_id` INTEGER NOT NULL,

    INDEX `school_id`(`school_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `school` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(6) NOT NULL,
    `grade` ENUM('G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12MATH', 'G12BIO', 'G12ART', 'G12COM', 'G12TECH', 'G13MATH', 'G13BIO', 'G13ART', 'G13COM', 'G13TECH') NOT NULL,
    `name` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `classid` INTEGER NOT NULL,
    `subjectid` INTEGER NOT NULL,
    `tsid` INTEGER NOT NULL,
    `teacher_id` INTEGER NOT NULL,

    UNIQUE INDEX `subject detail.id_unique`(`id`),
    INDEX `subjectid`(`subjectid`),
    PRIMARY KEY (`classid`, `subjectid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time slot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `weekday` ENUM('MON', 'TUE', 'WED', 'THU', 'FRI') NOT NULL,
    `starttime` TIME(0) NOT NULL,
    `endtime` TIME(0) NOT NULL,
    `sdid` INTEGER NOT NULL,

    INDEX `sdid`(`sdid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `school_id` ON `user`(`school_id`);

-- AddForeignKey
ALTER TABLE `user` ADD FOREIGN KEY (`school_id`) REFERENCES `school`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classroom` ADD FOREIGN KEY (`school_id`) REFERENCES `school`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject detail` ADD FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject detail` ADD FOREIGN KEY (`classid`) REFERENCES `classroom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject detail` ADD FOREIGN KEY (`subjectid`) REFERENCES `subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time slot` ADD FOREIGN KEY (`sdid`) REFERENCES `subject detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
