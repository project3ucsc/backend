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

-- AddForeignKey
ALTER TABLE `assmnt` ADD FOREIGN KEY (`sdid`) REFERENCES `subject detail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `submission` ADD FOREIGN KEY (`stuid`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `submission` ADD FOREIGN KEY (`assid`) REFERENCES `assmnt`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- RedefineIndex
CREATE UNIQUE INDEX `classroom.classteacher_id_unique` ON `classroom`(`classteacher_id`);
DROP INDEX `classroom_classteacher_id_unique` ON `classroom`;
