/*
  Warnings:

  - You are about to alter the column `datetime` on the `quiz` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `endtime` on the `time slot` table. All the data in the column will be lost.
  - You are about to drop the column `starttime` on the `time slot` table. All the data in the column will be lost.
  - You are about to alter the column `weekday` on the `time slot` table. The data in that column could be lost. The data in that column will be cast from `Enum("time slot_weekday")` to `Int`.
  - A unique constraint covering the columns `[classteacher_id]` on the table `classroom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_id` to the `time slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peroid_id` to the `time slot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `time slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `classroom` ADD COLUMN `classteacher_id` INTEGER;

-- AlterTable
ALTER TABLE `quiz` MODIFY `datetime` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `time slot` DROP COLUMN `endtime`,
    DROP COLUMN `starttime`,
    ADD COLUMN `class_id` INTEGER NOT NULL,
    ADD COLUMN `peroid_id` INTEGER NOT NULL,
    ADD COLUMN `teacher_id` INTEGER NOT NULL,
    MODIFY `weekday` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `period time` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` CHAR(1) NOT NULL,
    `starttime` TIME(0) NOT NULL,
    `endtime` TIME(0) NOT NULL,
    `period_time_section` ENUM('OL', 'AL', 'PRIMARY') NOT NULL,
    `school_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `classroom_classteacher_id_unique` ON `classroom`(`classteacher_id`);

-- AddForeignKey
ALTER TABLE `classroom` ADD FOREIGN KEY (`classteacher_id`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time slot` ADD FOREIGN KEY (`teacher_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time slot` ADD FOREIGN KEY (`class_id`) REFERENCES `classroom`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `time slot` ADD FOREIGN KEY (`peroid_id`) REFERENCES `period time`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `period time` ADD FOREIGN KEY (`school_id`) REFERENCES `school`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
