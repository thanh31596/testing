-- MySQL Script generated by MySQL Workbench
-- Sat May  8 01:49:45 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema GoExperience
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema GoExperience
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `GoExperience` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `GoExperience` ;

-- -----------------------------------------------------
-- Table `GoExperience`.`Category_Parent`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`Category_Parent` (
  `idCategory_Parent` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategory_Parent`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`Industry`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`Industry` (
  `idIndustry` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idIndustry`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`badge`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`badge` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `badge_type` VARCHAR(45) NOT NULL,
  `desc` VARCHAR(45) NOT NULL,
  `created_at` DATE NOT NULL,
  `deleted_at` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`category_child`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`category_child` (
  `idcategory_child` INT NOT NULL AUTO_INCREMENT,
  `ParentID` INT NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `desc` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idcategory_child`),
  INDEX `FK_parent_ID_idx` (`ParentID` ASC) VISIBLE,
  CONSTRAINT `FK_parent_ID`
    FOREIGN KEY (`ParentID`)
    REFERENCES `GoExperience`.`Category_Parent` (`idCategory_Parent`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`user_feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`user_feedback` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `feedback` VARCHAR(200) NULL DEFAULT NULL,
  `rating` INT NULL DEFAULT NULL,
  `created_at` DATE NOT NULL,
  `deleted_at` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`vendor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`vendor` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `created_at` DATE NOT NULL,
  `IndustryID` INT NOT NULL,
  `deleted_at` DATE NULL DEFAULT NULL,
  `phone` INT NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `ABN` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `website` VARCHAR(45) NULL DEFAULT NULL,
  `descID` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `ID_UNIQUE` (`ID` ASC) VISIBLE,
  UNIQUE INDEX `BankID_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `ABN_UNIQUE` (`ABN` ASC) VISIBLE,
  INDEX `Industry_idx` (`IndustryID` ASC) VISIBLE,
  CONSTRAINT `Industry`
    FOREIGN KEY (`IndustryID`)
    REFERENCES `GoExperience`.`Industry` (`idIndustry`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`voucher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`voucher` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(45) NOT NULL,
  `created_at` DATE NOT NULL,
  `modified_at` DATE NULL DEFAULT NULL,
  `deleted_at` DATE NULL DEFAULT NULL,
  `status` VARCHAR(45) NOT NULL,
  `code` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`Mission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`Mission` (
  `idMission` INT NOT NULL AUTO_INCREMENT,
  `mission_title` VARCHAR(45) NOT NULL,
  `map` VARCHAR(45) NOT NULL,
  `Description` TEXT NOT NULL,
  `CategoryID` INT NOT NULL,
  `VendorID` INT NOT NULL,
  `Price` FLOAT NULL DEFAULT NULL,
  `feedback_id` INT NOT NULL,
  `Action_time` TEXT NOT NULL,
  `voucher_id` INT NULL DEFAULT NULL,
  `location` VARCHAR(45) NOT NULL,
  `created_at` DATE NOT NULL,
  `modified_at` DATE NULL DEFAULT NULL,
  `deleted_at` DATE NULL DEFAULT NULL,
  `badge_id` INT NULL DEFAULT NULL,
  `picture` VARCHAR(45) NOT NULL,
  `legal_info` VARCHAR(200) NOT NULL,
  `key_info` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idMission`),
  UNIQUE INDEX `picture_UNIQUE` (`picture` ASC) VISIBLE,
  UNIQUE INDEX `voucher_id_UNIQUE` (`voucher_id` ASC) VISIBLE,
  INDEX `VendorID_idx` (`VendorID` ASC) VISIBLE,
  INDEX `ChildID_idx` (`CategoryID` ASC) VISIBLE,
  INDEX `badgeid_idx` (`badge_id` ASC) VISIBLE,
  INDEX `feedback_idx` (`feedback_id` ASC) VISIBLE,
  CONSTRAINT `badgeid`
    FOREIGN KEY (`badge_id`)
    REFERENCES `GoExperience`.`badge` (`id`),
  CONSTRAINT `ChildID`
    FOREIGN KEY (`CategoryID`)
    REFERENCES `GoExperience`.`category_child` (`idcategory_child`),
  CONSTRAINT `feedbackid`
    FOREIGN KEY (`feedback_id`)
    REFERENCES `GoExperience`.`user_feedback` (`id`),
  CONSTRAINT `VendorID`
    FOREIGN KEY (`VendorID`)
    REFERENCES `GoExperience`.`vendor` (`ID`),
  CONSTRAINT `voucher`
    FOREIGN KEY (`voucher_id`)
    REFERENCES `GoExperience`.`voucher` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`user_level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`user_level` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `total_exp` FLOAT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `mission_id` INT NOT NULL,
  `badge_id` INT NOT NULL,
  `voucher_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_level_1_idx` (`mission_id` ASC) VISIBLE,
  INDEX `fk_user_level_2_idx` (`badge_id` ASC) VISIBLE,
  INDEX `fk_user_level_3_idx` (`voucher_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_level_1`
    FOREIGN KEY (`mission_id`)
    REFERENCES `GoExperience`.`Mission` (`idMission`),
  CONSTRAINT `fk_user_level_2`
    FOREIGN KEY (`badge_id`)
    REFERENCES `GoExperience`.`badge` (`id`),
  CONSTRAINT `fk_user_level_3`
    FOREIGN KEY (`voucher_id`)
    REFERENCES `GoExperience`.`voucher` (`ID`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `GoExperience`.`User` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`User` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(15) NOT NULL,
  `Lname` VARCHAR(10) NOT NULL,
  `Fname` VARCHAR(20) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Phone` INT NULL DEFAULT NULL,
  `status` VARCHAR(45) NOT NULL,
  `dob` DATE NOT NULL,
  `created_at` DATE NOT NULL,
  `modified_at` DATE NULL DEFAULT NULL,
  `password` VARCHAR(11) NOT NULL,
  `user_level_id` INT NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `Phone_UNIQUE` (`Phone` ASC) VISIBLE,
  INDEX `fk_User_1_idx` (`user_level_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_1`
    FOREIGN KEY (`user_level_id`)
    REFERENCES `GoExperience`.`user_level` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`addcart_session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`addcart_session` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `total` DECIMAL(10,0) NOT NULL,
  `created_at` DATE NOT NULL,
  `modified_at` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `users_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `GoExperience`.`User` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`admin_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`admin_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `admin_type` VARCHAR(45) NOT NULL,
  `permission` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`admin_account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`admin_account` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `type_id` INT NOT NULL,
  `lastlogin` DATE NOT NULL,
  `created_at` DATE NOT NULL,
  `deleted_at` DATE NULL DEFAULT NULL,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  INDEX `fk_admin_account_1_idx` (`type_id` ASC) VISIBLE,
  CONSTRAINT `fk_admin_account_1`
    FOREIGN KEY (`type_id`)
    REFERENCES `GoExperience`.`admin_type` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`mission_cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`mission_cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `session_id` INT NOT NULL,
  `mission_id` INT NOT NULL,
  `quanity` INT NOT NULL COMMENT 'quanity: I don\'t know if we have some missions like: \"Buy a shirt to earn  point\" and then users buy a lot of it. Just put quanity there and modify it in the future',
  `created_at` DATE NOT NULL,
  `modified_at` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `missionID_idx` (`mission_id` ASC) VISIBLE,
  INDEX `sessionID_idx` (`session_id` ASC) VISIBLE,
  CONSTRAINT `missionID`
    FOREIGN KEY (`mission_id`)
    REFERENCES `GoExperience`.`Mission` (`idMission`),
  CONSTRAINT `sessionID`
    FOREIGN KEY (`session_id`)
    REFERENCES `GoExperience`.`addcart_session` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`mission_inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`mission_inventory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `mission_id` INT NOT NULL,
  `quanity` INT NOT NULL,
  `created_at` DATE NOT NULL,
  `deleted_at` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `missionid_idx` (`mission_id` ASC) VISIBLE,
  CONSTRAINT `missionid2`
    FOREIGN KEY (`mission_id`)
    REFERENCES `GoExperience`.`Mission` (`idMission`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`user_payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`user_payment` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `payment_type` VARCHAR(45) NOT NULL,
  `provider` VARCHAR(45) NOT NULL,
  `account_number` INT NOT NULL,
  `expiry_date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `user_ids`
    FOREIGN KEY (`user_id`)
    REFERENCES `GoExperience`.`User` (`idUser`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`participant_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`participant_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Status` BINARY(2) NOT NULL,
  `DateofParticipation` DATE NOT NULL,
  `payment_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `paymentid_idx` (`payment_id` ASC) VISIBLE,
  CONSTRAINT `paymentid`
    FOREIGN KEY (`payment_id`)
    REFERENCES `GoExperience`.`user_payment` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`participating_mission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`participating_mission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `participant_details_id` INT NOT NULL,
  `mission_id` INT NOT NULL,
  `quanity` INT NOT NULL,
  `joined_at` DATE NOT NULL,
  `expiry_date` DATE NULL DEFAULT NULL,
  `status` VARCHAR(45) NOT NULL,
  `feedback_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_participating_mission_1_idx` (`mission_id` ASC) VISIBLE,
  INDEX `fk_participating_mission_2_idx` (`participant_details_id` ASC) VISIBLE,
  INDEX `fk_participating_mission_3_idx` (`feedback_id` ASC) VISIBLE,
  CONSTRAINT `fk_participating_mission_1`
    FOREIGN KEY (`mission_id`)
    REFERENCES `GoExperience`.`Mission` (`idMission`),
  CONSTRAINT `fk_participating_mission_2`
    FOREIGN KEY (`participant_details_id`)
    REFERENCES `GoExperience`.`participant_details` (`id`),
  CONSTRAINT `fk_participating_mission_3`
    FOREIGN KEY (`feedback_id`)
    REFERENCES `GoExperience`.`user_feedback` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`vendor_payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`vendor_payment` (
  `id` INT NOT NULL,
  `vendor_id` INT NOT NULL,
  `payment_type` VARCHAR(45) NOT NULL,
  `provider` VARCHAR(45) NOT NULL,
  `account_number` INT NOT NULL,
  `expiry_date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `vendor_id_idx` (`vendor_id` ASC) VISIBLE,
  CONSTRAINT `vendor_id`
    FOREIGN KEY (`vendor_id`)
    REFERENCES `GoExperience`.`vendor` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`payment_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`payment_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `participanting_mission_id` INT NOT NULL,
  `vendor_id` INT NOT NULL,
  `status` VARCHAR(45) NOT NULL,
  `created_at` DATE NOT NULL,
  `modified_at` DATE NULL DEFAULT NULL,
  `deleted_at` DATE NULL DEFAULT NULL,
  `amount` DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_payment_details_1_idx` (`participanting_mission_id` ASC) VISIBLE,
  INDEX `fk_payment_details_2_idx` (`vendor_id` ASC) VISIBLE,
  CONSTRAINT `fk_payment_details_1`
    FOREIGN KEY (`participanting_mission_id`)
    REFERENCES `GoExperience`.`participating_mission` (`id`),
  CONSTRAINT `fk_payment_details_2`
    FOREIGN KEY (`vendor_id`)
    REFERENCES `GoExperience`.`vendor_payment` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`search_activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`search_activity` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `search_keywords` VARCHAR(45) NULL DEFAULT NULL,
  `timestamp` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_search_activity_1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_search_activity_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `GoExperience`.`User` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`user_interest_mission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`user_interest_mission` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `mission_id` INT NOT NULL,
  `status` TINYINT NOT NULL,
  `dateadded` DATE NOT NULL,
  `datedeleted` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `missionid_idx` (`mission_id` ASC) VISIBLE,
  INDEX `userid_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `missionid1`
    FOREIGN KEY (`mission_id`)
    REFERENCES `GoExperience`.`Mission` (`idMission`),
  CONSTRAINT `userid`
    FOREIGN KEY (`user_id`)
    REFERENCES `GoExperience`.`User` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`recommendation_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`recommendation_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_feedback_id` INT NOT NULL,
  `search_activity_id` INT NOT NULL,
  `created_at` DATE NOT NULL,
  `user_interest_mission_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_recommendation_list_1_idx` (`search_activity_id` ASC) VISIBLE,
  INDEX `fk_recommendation_list_2_idx` (`user_feedback_id` ASC) VISIBLE,
  INDEX `fk_recommendation_list_3_idx` (`user_interest_mission_id` ASC) VISIBLE,
  CONSTRAINT `fk_recommendation_list_1`
    FOREIGN KEY (`search_activity_id`)
    REFERENCES `GoExperience`.`search_activity` (`id`),
  CONSTRAINT `fk_recommendation_list_2`
    FOREIGN KEY (`user_feedback_id`)
    REFERENCES `GoExperience`.`user_feedback` (`id`),
  CONSTRAINT `fk_recommendation_list_3`
    FOREIGN KEY (`user_interest_mission_id`)
    REFERENCES `GoExperience`.`user_interest_mission` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`user_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`user_address` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `user_address` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `postal_code` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `iduser`
    FOREIGN KEY (`user_id`)
    REFERENCES `GoExperience`.`User` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `GoExperience`.`vendor_mission_collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GoExperience`.`vendor_mission_collection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vendor_id` INT NOT NULL,
  `mission_id` INT NOT NULL,
  `quanity` INT NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `mission_id_UNIQUE` (`mission_id` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_vendor_mission_collection_2` (`vendor_id` ASC) VISIBLE,
  CONSTRAINT `fk_vendor_mission_collection_1`
    FOREIGN KEY (`mission_id`)
    REFERENCES `GoExperience`.`Mission` (`idMission`),
  CONSTRAINT `fk_vendor_mission_collection_2`
    FOREIGN KEY (`vendor_id`)
    REFERENCES `GoExperience`.`vendor` (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
