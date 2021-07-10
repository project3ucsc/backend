/*
  Warnings:

  - Added the required column `subjectgroup` to the `subject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `school` MODIFY `name` VARCHAR(150) NOT NULL,
    MODIFY `address` VARCHAR(150) NOT NULL;

-- AlterTable
ALTER TABLE `subject` ADD COLUMN `subjectgroup` ENUM('COMP', 'OPTIONAL_69', 'OL_BUCKET_1', 'OL_BUCKET_2', 'OL_BUCKET_3', 'MATH_CHEM_IT', 'BIO_PHY_AGRI', 'ART_BLA', 'COM_IT', 'TECH_IT') NOT NULL,
    MODIFY `name` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `acc_status` ENUM('INITIAL', 'ACTIVE', 'REVOKED') NOT NULL DEFAULT 'INITIAL';

-- CreateTable
CREATE TABLE `studentdetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `classid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `optionalsubs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentdetail_id` INTEGER NOT NULL,
    `subject_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relief period` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sdid` INTEGER NOT NULL,
    `teacher_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `freeprogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `discription` VARCHAR(200) NOT NULL,
    `time` VARCHAR(100),
    `imgurl` VARCHAR(200),
    `rating` DOUBLE,
    `ratecount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `freeprogs suggetions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `progtitle` VARCHAR(100) NOT NULL,
    `discription` VARCHAR(300) NOT NULL,
    `freeprogs_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `discription` VARCHAR(30) NOT NULL,
    `attemps` INTEGER NOT NULL,
    `time_limit` INTEGER NOT NULL,
    `datetime` DATETIME NOT NULL,
    `sdid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `qna` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(50) NOT NULL,
    `correctanswer` INTEGER NOT NULL,
    `qid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `answers` VARCHAR(50) NOT NULL,
    `qnaid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `studentanswer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `answer` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,
    `quiz_id` INTEGER NOT NULL,
    `student_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `studentdetail` ADD FOREIGN KEY (`classid`) REFERENCES `classroom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentdetail` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `optionalsubs` ADD FOREIGN KEY (`studentdetail_id`) REFERENCES `studentdetail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `optionalsubs` ADD FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relief period` ADD FOREIGN KEY (`sdid`) REFERENCES `subject detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relief period` ADD FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `freeprogs suggetions` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz` ADD FOREIGN KEY (`sdid`) REFERENCES `subject detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `qna` ADD FOREIGN KEY (`qid`) REFERENCES `quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `answer` ADD FOREIGN KEY (`qnaid`) REFERENCES `qna`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
