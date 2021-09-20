-- AlterTable
ALTER TABLE `freeprogs` ADD COLUMN `day` VARCHAR(191),
    ADD COLUMN `grade` VARCHAR(191),
    ADD COLUMN `subject` VARCHAR(191),
    ADD COLUMN `type` VARCHAR(191),
    MODIFY `ratecount` INTEGER;

-- CreateIndex
CREATE INDEX `user_id` ON `studentdetail`(`user_id`);
