/*
  Warnings:

  - You are about to alter the column `discription` on the `freeprogs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.
  - You are about to alter the column `imgurl` on the `freeprogs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.
  - You are about to alter the column `datetime` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `freeprogs` MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `discription` VARCHAR(191) NOT NULL,
    MODIFY `time` VARCHAR(191),
    MODIFY `imgurl` VARCHAR(191);

-- AlterTable
ALTER TABLE `quiz` MODIFY `datetime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `resource detail` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `filename` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `resource section` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `school` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `time slot` ADD COLUMN `isTimeChanged` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastupdated` DATETIME ,
    ADD COLUMN `meetingurl` VARCHAR(191) DEFAULT 'NA';

-- CreateTable
CREATE TABLE `reshceduled timeslots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tsid` INTEGER NOT NULL,
    `starttime` DATETIME(3) NOT NULL,
    `endtime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reshceduled timeslots` ADD FOREIGN KEY (`tsid`) REFERENCES `time slot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
