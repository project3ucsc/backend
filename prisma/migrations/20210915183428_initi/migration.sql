/*
  Warnings:

  - You are about to drop the column `freeprogs_id` on the `freeprogs suggetions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `studentdetail` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channel` to the `freeprogs suggetions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `freeprogs suggetions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endtime` to the `freeprogs suggetions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grade` to the `freeprogs suggetions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starttime` to the `freeprogs suggetions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `freeprogs suggetions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `freeprogs suggetions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `freeprogs suggetions` DROP COLUMN `freeprogs_id`,
    ADD COLUMN `channel` VARCHAR(20) NOT NULL,
    ADD COLUMN `day` VARCHAR(10) NOT NULL,
    ADD COLUMN `endtime` TIME(0) NOT NULL,
    ADD COLUMN `grade` VARCHAR(20) NOT NULL,
    ADD COLUMN `starttime` TIME(0) NOT NULL,
    ADD COLUMN `subject` VARCHAR(20) NOT NULL,
    ADD COLUMN `type` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `adr` VARCHAR(100),
    MODIFY `role` ENUM('STUDENT', 'TEACHER', 'PRINCIPAl', 'SCHOOLADMIN', 'ADMIN', 'TUTOR') NOT NULL DEFAULT 'STUDENT';

-- CreateIndex
CREATE UNIQUE INDEX `studentdetail_user_id_unique` ON `studentdetail`(`user_id`);
