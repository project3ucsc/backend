-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(20) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `role` ENUM('STUDENT', 'TEACHER', 'PRINCIPAl', 'SCHOOLADMIN', 'ADMIN') NOT NULL DEFAULT 'STUDENT',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;