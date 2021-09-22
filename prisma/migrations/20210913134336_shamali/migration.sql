-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(12),
    `gender` CHAR(1),
    `adr` VARCHAR(100),
    `role` ENUM('STUDENT', 'TEACHER', 'PRINCIPAl', 'SCHOOLADMIN', 'ADMIN', 'TUTOR') NOT NULL DEFAULT 'STUDENT',
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
    `status` ENUM('NO_ENROll', 'PENDING', 'ACTIVE') NOT NULL DEFAULT 'NO_ENROll',
    `regid` VARCHAR(20) NOT NULL DEFAULT 'none',

    INDEX `classid`(`classid`),
    INDEX `user_id`(`user_id`),
    UNIQUE INDEX `studentdetail_user_id_unique`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `optionalsubs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentdetail_id` INTEGER,
    `sd_id` INTEGER NOT NULL,
    `subjectgroup` ENUM('COMP', 'OPTIONAL_69', 'OL_BUCKET_1', 'OL_BUCKET_2', 'OL_BUCKET_3', 'MATH_CHEM_IT', 'BIO_PHY_AGRI', 'ART_BLA', 'COM_IT', 'TECH_IT') NOT NULL,

    INDEX `sd_id`(`sd_id`),
    INDEX `studentdetail_id`(`studentdetail_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classroom` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` ENUM('G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12MATH', 'G12BIO', 'G12ART', 'G12COM', 'G12TECH', 'G13MATH', 'G13BIO', 'G13ART', 'G13COM', 'G13TECH') NOT NULL,
    `name` CHAR(1) NOT NULL,
    `school_id` INTEGER NOT NULL,
    `classteacher_id` INTEGER,

    UNIQUE INDEX `classroom.classteacher_id_unique`(`classteacher_id`),
    INDEX `school_id`(`school_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `school` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `isconfig` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schoolsectiondetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` ENUM('G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12MATH', 'G12BIO', 'G12ART', 'G12COM', 'G12TECH', 'G13MATH', 'G13BIO', 'G13ART', 'G13COM', 'G13TECH') NOT NULL,
    `classcount` INTEGER NOT NULL,
    `school_id` INTEGER NOT NULL,

    INDEX `school_id`(`school_id`),
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
    INDEX `teacher_id`(`teacher_id`),
    PRIMARY KEY (`classid`, `subjectid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resource section` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sdid` INTEGER NOT NULL,

    UNIQUE INDEX `resource section.id_unique`(`id`),
    INDEX `sdid`(`sdid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resource detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `section_id` INTEGER NOT NULL,
    `type` VARCHAR(6) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `resource detail.id_unique`(`id`),
    INDEX `section_id`(`section_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assmnt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `discription` VARCHAR(500) NOT NULL,
    `filename` VARCHAR(191) NOT NULL DEFAULT 'NA',
    `sdid` INTEGER NOT NULL,
    `duedate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `assmnt.id_unique`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `submission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL DEFAULT 'NA',
    `submitdate` DATETIME(3) NOT NULL,
    `marks` INTEGER NOT NULL DEFAULT -1,
    `stuid` INTEGER NOT NULL,
    `assid` INTEGER NOT NULL,

    UNIQUE INDEX `submission.id_unique`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `time slot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `weekday` INTEGER NOT NULL,
    `sdid` INTEGER NOT NULL,
    `class_id` INTEGER NOT NULL,
    `peroid_id` INTEGER NOT NULL,
    `teacher_id` INTEGER NOT NULL,
    `isTimeChanged` BOOLEAN NOT NULL DEFAULT false,
    `lastupdated` DATETIME(0),
    `meetingurl` VARCHAR(191) DEFAULT 'NA',

    INDEX `class_id`(`class_id`),
    INDEX `peroid_id`(`peroid_id`),
    INDEX `sdid`(`sdid`),
    INDEX `teacher_id`(`teacher_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `period time` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `starttime` TIME(0) NOT NULL,
    `endtime` TIME(0) NOT NULL,
    `period_time_section` ENUM('OL', 'AL', 'PRIMARY') NOT NULL,
    `school_id` INTEGER NOT NULL,

    INDEX `school_id`(`school_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reshceduled timeslots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tsid` INTEGER NOT NULL,
    `starttime` DATETIME(3) NOT NULL,
    `endtime` DATETIME(3) NOT NULL,

    INDEX `tsid`(`tsid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relief period` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sdid` INTEGER NOT NULL,
    `teacher_id` INTEGER NOT NULL,

    INDEX `sdid`(`sdid`),
    INDEX `teacher_id`(`teacher_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `freeprogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `discription` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191),
    `imgurl` VARCHAR(191),
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

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `discription` VARCHAR(30) NOT NULL,
    `attemps` INTEGER NOT NULL,
    `time_limit` INTEGER NOT NULL,
    `datetime` DATETIME(0) NOT NULL,
    `sdid` INTEGER NOT NULL,

    INDEX `sdid`(`sdid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `qna` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(50) NOT NULL,
    `correctanswer` INTEGER NOT NULL,
    `qid` INTEGER NOT NULL,

    INDEX `qid`(`qid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `answers` VARCHAR(50) NOT NULL,
    `qnaid` INTEGER NOT NULL,

    INDEX `qnaid`(`qnaid`),
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
ALTER TABLE `optionalsubs` ADD FOREIGN KEY (`sd_id`) REFERENCES `subject detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `optionalsubs` ADD FOREIGN KEY (`studentdetail_id`) REFERENCES `studentdetail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classroom` ADD FOREIGN KEY (`classteacher_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classroom` ADD FOREIGN KEY (`school_id`) REFERENCES `school`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schoolsectiondetail` ADD FOREIGN KEY (`school_id`) REFERENCES `school`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject detail` ADD FOREIGN KEY (`classid`) REFERENCES `classroom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject detail` ADD FOREIGN KEY (`subjectid`) REFERENCES `subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subject detail` ADD FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resource section` ADD FOREIGN KEY (`sdid`) REFERENCES `subject detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resource detail` ADD FOREIGN KEY (`section_id`) REFERENCES `resource section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assmnt` ADD FOREIGN KEY (`sdid`) REFERENCES `subject detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `submission` ADD FOREIGN KEY (`stuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `submission` ADD FOREIGN KEY (`assid`) REFERENCES `assmnt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time slot` ADD FOREIGN KEY (`class_id`) REFERENCES `classroom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time slot` ADD FOREIGN KEY (`peroid_id`) REFERENCES `period time`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time slot` ADD FOREIGN KEY (`sdid`) REFERENCES `subject detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time slot` ADD FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `period time` ADD FOREIGN KEY (`school_id`) REFERENCES `school`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reshceduled timeslots` ADD FOREIGN KEY (`tsid`) REFERENCES `time slot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
