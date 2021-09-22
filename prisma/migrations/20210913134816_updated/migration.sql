-- DropIndex
DROP INDEX `sdid` ON `assmnt`;

-- DropIndex
DROP INDEX `assid` ON `submission`;

-- DropIndex
DROP INDEX `stuid` ON `submission`;

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
