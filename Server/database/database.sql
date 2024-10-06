CREATE TABLE `ems`.`admindb` ( `id` INT NOT NULL AUTO_INCREMENT , 
`fullname` VARCHAR(100) NOT NULL , 
`email` VARCHAR(100) NOT NULL , 
`password` VARCHAR(150) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

INSERT INTO `admindb` (`id`, `fullname`, `email`, `password`) VALUES (NULL, 'Admin', 'admin@gmail.com', 'admin124');

-- EMPLOYEES TABLE
CREATE TABLE `ems`.`employees` ( `id` INT NOT NULL AUTO_INCREMENT , 
`fullname` VARCHAR(100) NOT NULL , 
`email` VARCHAR(100) NOT NULL , 
`address` VARCHAR(200) NOT NULL , 
`category` VARCHAR(50) NOT NULL , 
`account` VARCHAR(100) NOT NULL,
`salary` VARCHAR(50) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

-- CATEGORIES TABLE
CREATE TABLE `ems`.`category` ( `id` INT NOT NULL AUTO_INCREMENT , 
`name` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


