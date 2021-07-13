-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(12),
    `gender` CHAR(1),
    `role` ENUM('STUDENT', 'TEACHER', 'PRINCIPAl', 'SCHOOLADMIN', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
    `acc_status` ENUM('INITIAL', 'ACTIVE', 'REVOKED') NOT NULL DEFAULT 'INITIAL',
    `school_id` INTEGER NOT NULL,

    UNIQUE INDEX `user.email_unique`(`email`),
    INDEX `school_id`(`school_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `name` VARCHAR(150) NOT NULL,
    `address` VARCHAR(150) NOT NULL,
    `no_of_primaryclasses` INTEGER DEFAULT 0,
    `no_of_olclasses` INTEGER DEFAULT 0,
    `no_of_almaths` INTEGER DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(6) NOT NULL,
    `grade` ENUM('G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12MATH', 'G12BIO', 'G12ART', 'G12COM', 'G12TECH', 'G13MATH', 'G13BIO', 'G13ART', 'G13COM', 'G13TECH') NOT NULL,
    `subjectgroup` ENUM('COMP', 'OPTIONAL_69', 'OL_BUCKET_1', 'OL_BUCKET_2', 'OL_BUCKET_3', 'MATH_CHEM_IT', 'BIO_PHY_AGRI', 'ART_BLA', 'COM_IT', 'TECH_IT') NOT NULL,
    `name` VARCHAR(20) NOT NULL,

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
ALTER TABLE `user` ADD FOREIGN KEY (`school_id`) REFERENCES `school`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentdetail` ADD FOREIGN KEY (`classid`) REFERENCES `classroom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `studentdetail` ADD FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `optionalsubs` ADD FOREIGN KEY (`studentdetail_id`) REFERENCES `studentdetail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `optionalsubs` ADD FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
