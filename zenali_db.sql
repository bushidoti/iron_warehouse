-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: zenali_db
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
INSERT INTO `auth_group` VALUES (8,'دسترسی کامل'),(4,'مدیریت انبار'),(7,'مدیریت تولید'),(5,'مدیریت خرید'),(6,'مدیریت فروش');
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=290 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
INSERT INTO `auth_group_permissions` VALUES (69,4,29),(70,4,30),(71,4,31),(72,4,32),(73,4,33),(74,4,34),(75,4,35),(76,4,36),(77,4,37),(78,4,38),(79,4,39),(80,4,40),(81,4,41),(82,4,42),(83,4,43),(84,4,44),(85,4,45),(86,4,46),(87,4,47),(88,4,48),(89,4,49),(90,4,50),(91,4,51),(92,4,52),(93,4,53),(94,4,54),(95,4,55),(96,4,56),(97,4,57),(98,4,58),(99,4,59),(100,4,60),(101,4,61),(102,4,62),(103,4,63),(104,4,64),(105,4,65),(106,4,66),(107,4,67),(108,4,68),(109,4,69),(110,4,70),(111,4,71),(112,4,72),(113,4,73),(114,4,74),(115,4,75),(116,4,76),(117,4,77),(118,4,78),(119,4,79),(120,4,80),(275,4,113),(276,4,114),(277,4,115),(278,4,116),(279,4,117),(280,4,118),(281,4,119),(282,4,120),(283,4,121),(284,4,122),(285,4,123),(286,4,124),(287,4,125),(288,4,126),(289,4,127),(266,4,128),(267,4,129),(268,4,130),(269,4,131),(270,4,132),(271,4,133),(272,4,134),(273,4,135),(274,4,136),(121,5,89),(122,5,90),(123,5,91),(124,5,92),(262,6,73),(263,6,74),(264,6,75),(265,6,76),(129,6,81),(130,6,82),(131,6,83),(132,6,84),(133,6,85),(134,6,86),(135,6,87),(136,6,88),(125,6,101),(126,6,102),(127,6,103),(128,6,104),(253,7,32),(141,7,41),(142,7,42),(143,7,43),(144,7,44),(255,7,48),(257,7,60),(254,7,72),(137,7,73),(138,7,74),(139,7,75),(140,7,76),(256,7,80),(258,7,89),(259,7,90),(260,7,91),(261,7,92),(249,7,105),(250,7,106),(251,7,107),(252,7,108),(145,8,1),(146,8,2),(147,8,3),(148,8,4),(149,8,5),(150,8,6),(151,8,7),(152,8,8),(153,8,9),(154,8,10),(155,8,11),(156,8,12),(157,8,13),(158,8,14),(159,8,15),(160,8,16),(161,8,17),(162,8,18),(163,8,19),(164,8,20),(165,8,21),(166,8,22),(167,8,23),(168,8,24),(169,8,25),(170,8,26),(171,8,27),(172,8,28),(173,8,29),(174,8,30),(175,8,31),(176,8,32),(177,8,33),(178,8,34),(179,8,35),(180,8,36),(181,8,37),(182,8,38),(183,8,39),(184,8,40),(185,8,41),(186,8,42),(187,8,43),(188,8,44),(189,8,45),(190,8,46),(191,8,47),(192,8,48),(193,8,49),(194,8,50),(195,8,51),(196,8,52),(197,8,53),(198,8,54),(199,8,55),(200,8,56),(201,8,57),(202,8,58),(203,8,59),(204,8,60),(205,8,61),(206,8,62),(207,8,63),(208,8,64),(209,8,65),(210,8,66),(211,8,67),(212,8,68),(213,8,69),(214,8,70),(215,8,71),(216,8,72),(217,8,73),(218,8,74),(219,8,75),(220,8,76),(221,8,77),(222,8,78),(223,8,79),(224,8,80),(225,8,81),(226,8,82),(227,8,83),(228,8,84),(229,8,85),(230,8,86),(231,8,87),(232,8,88),(233,8,89),(234,8,90),(235,8,91),(236,8,92),(237,8,93),(238,8,94),(239,8,95),(240,8,96),(241,8,97),(242,8,98),(243,8,99),(244,8,100),(245,8,101),(246,8,102),(247,8,103),(248,8,104);
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add employee',7,'add_employee'),(26,'Can change employee',7,'change_employee'),(27,'Can delete employee',7,'delete_employee'),(28,'Can view employee',7,'view_employee'),(29,'Can add consuming material',8,'add_consumingmaterial'),(30,'Can change consuming material',8,'change_consumingmaterial'),(31,'Can delete consuming material',8,'delete_consumingmaterial'),(32,'Can view consuming material',8,'view_consumingmaterial'),(33,'Can add consuming material check',9,'add_consumingmaterialcheck'),(34,'Can change consuming material check',9,'change_consumingmaterialcheck'),(35,'Can delete consuming material check',9,'delete_consumingmaterialcheck'),(36,'Can view consuming material check',9,'view_consumingmaterialcheck'),(37,'Can add consuming material factor',10,'add_consumingmaterialfactor'),(38,'Can change consuming material factor',10,'change_consumingmaterialfactor'),(39,'Can delete consuming material factor',10,'delete_consumingmaterialfactor'),(40,'Can view consuming material factor',10,'view_consumingmaterialfactor'),(41,'Can add production check',11,'add_productioncheck'),(42,'Can change production check',11,'change_productioncheck'),(43,'Can delete production check',11,'delete_productioncheck'),(44,'Can view production check',11,'view_productioncheck'),(45,'Can add raw material',12,'add_rawmaterial'),(46,'Can change raw material',12,'change_rawmaterial'),(47,'Can delete raw material',12,'delete_rawmaterial'),(48,'Can view raw material',12,'view_rawmaterial'),(49,'Can add raw material check',13,'add_rawmaterialcheck'),(50,'Can change raw material check',13,'change_rawmaterialcheck'),(51,'Can delete raw material check',13,'delete_rawmaterialcheck'),(52,'Can view raw material check',13,'view_rawmaterialcheck'),(53,'Can add raw material factor',14,'add_rawmaterialfactor'),(54,'Can change raw material factor',14,'change_rawmaterialfactor'),(55,'Can delete raw material factor',14,'delete_rawmaterialfactor'),(56,'Can view raw material factor',14,'view_rawmaterialfactor'),(57,'Can add request supply',15,'add_requestsupply'),(58,'Can change request supply',15,'change_requestsupply'),(59,'Can delete request supply',15,'delete_requestsupply'),(60,'Can view request supply',15,'view_requestsupply'),(61,'Can add waste check',16,'add_wastecheck'),(62,'Can change waste check',16,'change_wastecheck'),(63,'Can delete waste check',16,'delete_wastecheck'),(64,'Can view waste check',16,'view_wastecheck'),(65,'Can add waste',17,'add_waste'),(66,'Can change waste',17,'change_waste'),(67,'Can delete waste',17,'delete_waste'),(68,'Can view waste',17,'view_waste'),(69,'Can add raw material detailed',18,'add_rawmaterialdetailed'),(70,'Can change raw material detailed',18,'change_rawmaterialdetailed'),(71,'Can delete raw material detailed',18,'delete_rawmaterialdetailed'),(72,'Can view raw material detailed',18,'view_rawmaterialdetailed'),(73,'Can add production',19,'add_production'),(74,'Can change production',19,'change_production'),(75,'Can delete production',19,'delete_production'),(76,'Can view production',19,'view_production'),(77,'Can add consuming material detailed',20,'add_consumingmaterialdetailed'),(78,'Can change consuming material detailed',20,'change_consumingmaterialdetailed'),(79,'Can delete consuming material detailed',20,'delete_consumingmaterialdetailed'),(80,'Can view consuming material detailed',20,'view_consumingmaterialdetailed'),(81,'Can add sale factor',21,'add_salefactor'),(82,'Can change sale factor',21,'change_salefactor'),(83,'Can delete sale factor',21,'delete_salefactor'),(84,'Can view sale factor',21,'view_salefactor'),(85,'Can add sale',22,'add_sale'),(86,'Can change sale',22,'change_sale'),(87,'Can delete sale',22,'delete_sale'),(88,'Can view sale',22,'view_sale'),(89,'Can add apply buy',23,'add_applybuy'),(90,'Can change apply buy',23,'change_applybuy'),(91,'Can delete apply buy',23,'delete_applybuy'),(92,'Can view apply buy',23,'view_applybuy'),(93,'Can add blacklisted token',24,'add_blacklistedtoken'),(94,'Can change blacklisted token',24,'change_blacklistedtoken'),(95,'Can delete blacklisted token',24,'delete_blacklistedtoken'),(96,'Can view blacklisted token',24,'view_blacklistedtoken'),(97,'Can add outstanding token',25,'add_outstandingtoken'),(98,'Can change outstanding token',25,'change_outstandingtoken'),(99,'Can delete outstanding token',25,'delete_outstandingtoken'),(100,'Can view outstanding token',25,'view_outstandingtoken'),(101,'Can add auto increment sale factor',26,'add_autoincrementsalefactor'),(102,'Can change auto increment sale factor',26,'change_autoincrementsalefactor'),(103,'Can delete auto increment sale factor',26,'delete_autoincrementsalefactor'),(104,'Can view auto increment sale factor',26,'view_autoincrementsalefactor'),(105,'Can add pending produce',27,'add_pendingproduce'),(106,'Can change pending produce',27,'change_pendingproduce'),(107,'Can delete pending produce',27,'delete_pendingproduce'),(108,'Can view pending produce',27,'view_pendingproduce'),(109,'Can add user',28,'add_customuser'),(110,'Can change user',28,'change_customuser'),(111,'Can delete user',28,'delete_customuser'),(112,'Can view user',28,'view_customuser'),(113,'Can add category',29,'add_category'),(114,'Can change category',29,'change_category'),(115,'Can delete category',29,'delete_category'),(116,'Can view category',29,'view_category'),(117,'Can add consumable',30,'add_consumable'),(118,'Can change consumable',30,'change_consumable'),(119,'Can delete consumable',30,'delete_consumable'),(120,'Can view consumable',30,'view_consumable'),(121,'Can add product',31,'add_product'),(122,'Can change product',31,'change_product'),(123,'Can delete product',31,'delete_product'),(124,'Can view product',31,'view_product'),(125,'Can add product check',32,'add_productcheck'),(126,'Can change product check',32,'change_productcheck'),(127,'Can delete product check',32,'delete_productcheck'),(128,'Can view product check',32,'view_productcheck'),(129,'Can add product factor',33,'add_productfactor'),(130,'Can change product factor',33,'change_productfactor'),(131,'Can delete product factor',33,'delete_productfactor'),(132,'Can view product factor',33,'view_productfactor'),(133,'Can add product detailed',34,'add_productdetailed'),(134,'Can change product detailed',34,'change_productdetailed'),(135,'Can delete product detailed',34,'delete_productdetailed'),(136,'Can view product detailed',34,'view_productdetailed');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$S3uZhHfCAF3SR7H55jbHrp$nNn9KR+fHs3iu6H1G9SA1BoNDM4RLCKu6fnp9q8biyA=','2023-11-01 14:25:00.000000',1,'admin','نام','فایل','',1,1,'2023-10-31 08:05:29.000000'),(2,'pbkdf2_sha256$600000$3gaSDEHD36qtTaAEqyX4lZ$ZoriFKffe+iA3sN5GFCGgsmZsS71unfZGf/CtEljCTc=',NULL,0,'finance','نام','فایل','',0,1,'2023-10-31 08:15:01.000000'),(3,'pbkdf2_sha256$600000$lzL1GEy6OKnhQRdrvxn9cY$YLhu9m/BWgS80pQtVLxvprbYkeS8QSlj3jIEo29zre8=',NULL,0,'sale','نام','فایل','',0,1,'2023-10-31 08:15:36.000000'),(4,'pbkdf2_sha256$600000$PoUlS1rDab3ou0YxynvKbG$XWUifGJs8GrUkN4Spf3p2y2cHUncYKY0kX4Tc4ynSDQ=',NULL,0,'production','نام','فایل','',0,1,'2023-10-31 08:16:16.000000'),(5,'pbkdf2_sha256$600000$5S8ff1mfyBoSlg3B2ZtK0B$DjtdMhtzYTfioSixGRhWIZUw+4HKKYLJ462u+s1A6ZU=',NULL,0,'buyer','نام','فایل','',0,1,'2023-10-31 08:16:45.000000'),(6,'pbkdf2_sha256$600000$0sIDJYlT8OkLrXATfGKEzL$x7ylczUIrIxdw2VdJSqfxRDeDp031uCibTCOexvOzPs=',NULL,0,'keeper','نام','فایل','',0,1,'2023-10-31 08:17:14.000000');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
INSERT INTO `auth_user_groups` VALUES (3,1,4),(4,1,5),(5,1,6),(6,1,7),(7,1,8),(9,3,6),(2,4,7),(8,5,5),(1,6,4);
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buy_applybuy`
--

DROP TABLE IF EXISTS `buy_applybuy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buy_applybuy` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `scale` varchar(50) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `applicant` varchar(50) NOT NULL,
  `description` varchar(150) NOT NULL,
  `is_supplied` tinyint(1) DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=501000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buy_applybuy`
--

LOCK TABLES `buy_applybuy` WRITE;
/*!40000 ALTER TABLE `buy_applybuy` DISABLE KEYS */;
/*!40000 ALTER TABLE `buy_applybuy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumable_warehouse_category`
--

DROP TABLE IF EXISTS `consumable_warehouse_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumable_warehouse_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `value` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumable_warehouse_category`
--

LOCK TABLES `consumable_warehouse_category` WRITE;
/*!40000 ALTER TABLE `consumable_warehouse_category` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumable_warehouse_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumable_warehouse_consumable`
--

DROP TABLE IF EXISTS `consumable_warehouse_consumable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumable_warehouse_consumable` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `value` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumable_warehouse_consumable`
--

LOCK TABLES `consumable_warehouse_consumable` WRITE;
/*!40000 ALTER TABLE `consumable_warehouse_consumable` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumable_warehouse_consumable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumable_warehouse_product`
--

DROP TABLE IF EXISTS `consumable_warehouse_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumable_warehouse_product` (
  `code` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `scale` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=801000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumable_warehouse_product`
--

LOCK TABLES `consumable_warehouse_product` WRITE;
/*!40000 ALTER TABLE `consumable_warehouse_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumable_warehouse_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumable_warehouse_productcheck`
--

DROP TABLE IF EXISTS `consumable_warehouse_productcheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumable_warehouse_productcheck` (
  `code` int NOT NULL AUTO_INCREMENT,
  `checks` longtext,
  `jsonData` json DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=803000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumable_warehouse_productcheck`
--

LOCK TABLES `consumable_warehouse_productcheck` WRITE;
/*!40000 ALTER TABLE `consumable_warehouse_productcheck` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumable_warehouse_productcheck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumable_warehouse_productdetailed`
--

DROP TABLE IF EXISTS `consumable_warehouse_productdetailed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumable_warehouse_productdetailed` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `consumable` varchar(50) DEFAULT NULL,
  `input` double DEFAULT NULL,
  `carton` int DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `average_rate` double DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `output` double DEFAULT NULL,
  `afterOperator` double DEFAULT NULL,
  `operator` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `buyer` varchar(50) DEFAULT NULL,
  `seller` varchar(50) DEFAULT NULL,
  `address_seller` longtext,
  `seller_national_id` varchar(50) DEFAULT NULL,
  `receiver` varchar(50) DEFAULT NULL,
  `document_type` varchar(50) DEFAULT NULL,
  `document_code` varchar(150) DEFAULT NULL,
  `amendment` longtext,
  `systemID` bigint DEFAULT NULL,
  `checkCode_id` int DEFAULT NULL,
  `factorCode_id` int DEFAULT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `consumable_warehouse_checkCode_id_f34578d3_fk_consumabl` (`checkCode_id`),
  KEY `consumable_warehouse_factorCode_id_701c0531_fk_consumabl` (`factorCode_id`),
  KEY `consumable_warehouse_product_id_5e9f3e5d_fk_consumabl` (`product_id`),
  CONSTRAINT `consumable_warehouse_checkCode_id_f34578d3_fk_consumabl` FOREIGN KEY (`checkCode_id`) REFERENCES `consumable_warehouse_productcheck` (`code`),
  CONSTRAINT `consumable_warehouse_factorCode_id_701c0531_fk_consumabl` FOREIGN KEY (`factorCode_id`) REFERENCES `consumable_warehouse_productfactor` (`code`),
  CONSTRAINT `consumable_warehouse_product_id_5e9f3e5d_fk_consumabl` FOREIGN KEY (`product_id`) REFERENCES `consumable_warehouse_product` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumable_warehouse_productdetailed`
--

LOCK TABLES `consumable_warehouse_productdetailed` WRITE;
/*!40000 ALTER TABLE `consumable_warehouse_productdetailed` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumable_warehouse_productdetailed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumable_warehouse_productfactor`
--

DROP TABLE IF EXISTS `consumable_warehouse_productfactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumable_warehouse_productfactor` (
  `code` int NOT NULL AUTO_INCREMENT,
  `factor` longtext,
  `jsonData` json DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=802000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumable_warehouse_productfactor`
--

LOCK TABLES `consumable_warehouse_productfactor` WRITE;
/*!40000 ALTER TABLE `consumable_warehouse_productfactor` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumable_warehouse_productfactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2023-10-31 08:06:15.087157','1','admin',2,'[{\"added\": {\"name\": \"employee\", \"object\": \"Employee object (1)\"}}]',4,1),(2,'2023-10-31 08:14:30.287747','1','admin',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]',4,1),(3,'2023-10-31 08:15:02.060088','2','finance',1,'[{\"added\": {}}, {\"added\": {\"name\": \"employee\", \"object\": \"Employee object (2)\"}}]',4,1),(4,'2023-10-31 08:15:13.474911','2','finance',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]',4,1),(5,'2023-10-31 08:15:36.593428','3','sale',1,'[{\"added\": {}}, {\"added\": {\"name\": \"employee\", \"object\": \"Employee object (3)\"}}]',4,1),(6,'2023-10-31 08:15:48.236041','3','sale',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]',4,1),(7,'2023-10-31 08:16:16.811733','4','production',1,'[{\"added\": {}}, {\"added\": {\"name\": \"employee\", \"object\": \"Employee object (4)\"}}]',4,1),(8,'2023-10-31 08:16:24.955112','4','production',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]',4,1),(9,'2023-10-31 08:16:45.643305','5','buyer',1,'[{\"added\": {}}, {\"added\": {\"name\": \"employee\", \"object\": \"Employee object (5)\"}}]',4,1),(10,'2023-10-31 08:16:54.462541','5','buyer',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]',4,1),(11,'2023-10-31 08:17:14.596404','6','keeper',1,'[{\"added\": {}}, {\"added\": {\"name\": \"employee\", \"object\": \"Employee object (6)\"}}]',4,1),(12,'2023-10-31 08:17:26.122704','6','keeper',2,'[{\"changed\": {\"fields\": [\"First name\", \"Last name\"]}}]',4,1),(13,'2023-10-31 08:51:15.737249','1','AutoIncrementSaleFactor object (1)',1,'[{\"added\": {}}]',26,1),(14,'2023-10-31 09:11:25.871880','201000001','ConsumingMaterial object (201000001)',1,'[{\"added\": {}}]',8,1),(15,'2023-10-31 09:12:24.101770','201000001','ConsumingMaterial object (201000001)',3,'',8,1),(16,'2023-10-31 13:25:10.938015','1','مدیریت انبار صنعتی',1,'[{\"added\": {}}]',3,1),(17,'2023-10-31 13:25:26.730246','2','خرید',1,'[{\"added\": {}}]',3,1),(18,'2023-10-31 13:25:45.464831','2','مدیریت خرید',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',3,1),(19,'2023-10-31 13:26:22.398440','3','مدیریت فروش',1,'[{\"added\": {}}]',3,1),(20,'2023-10-31 13:27:26.233050','1','مدیریت انبار صنعتی',3,'',3,1),(21,'2023-10-31 13:27:26.234813','2','مدیریت خرید',3,'',3,1),(22,'2023-10-31 13:27:26.236909','3','مدیریت فروش',3,'',3,1),(23,'2023-10-31 13:29:16.740942','4','مدیریت انبار صنعتی',1,'[{\"added\": {}}]',3,1),(24,'2023-10-31 13:29:41.024346','5','مدیریت فروش',1,'[{\"added\": {}}]',3,1),(25,'2023-10-31 13:30:16.764617','5','مدیریت خرید',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',3,1),(26,'2023-10-31 13:30:31.700427','6','مدیریت فروش',1,'[{\"added\": {}}]',3,1),(27,'2023-10-31 13:31:38.310093','7','مدیریت تولید',1,'[{\"added\": {}}]',3,1),(28,'2023-10-31 13:32:23.314130','8','مدیریت',1,'[{\"added\": {}}]',3,1),(29,'2023-10-31 13:32:33.057146','8','مدیر کارخانه',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',3,1),(30,'2023-10-31 13:33:09.784282','8','مدیریت',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',3,1),(31,'2023-10-31 13:33:19.558131','8','دسترسی کامل',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',3,1),(32,'2023-10-31 15:07:25.505871','7','مدیریت تولید',2,'[{\"changed\": {\"fields\": [\"Permissions\"]}}]',3,1),(33,'2023-10-31 15:08:37.171369','7','مدیریت تولید',2,'[{\"changed\": {\"fields\": [\"Permissions\"]}}]',3,1),(34,'2023-10-31 15:09:05.688566','7','مدیریت تولید',2,'[{\"changed\": {\"fields\": [\"Permissions\"]}}]',3,1),(35,'2023-11-01 05:53:52.853643','1','admin',2,'[{\"added\": {\"name\": \"employee\", \"object\": \"Employee object (1)\"}}]',4,1),(36,'2023-11-01 05:54:02.204889','5','buyer',2,'[{\"added\": {\"name\": \"employee\", \"object\": \"Employee object (2)\"}}]',4,1),(37,'2023-11-01 05:54:13.320244','2','finance',2,'[{\"added\": {\"name\": \"employee\", \"object\": \"Employee object (3)\"}}]',4,1),(38,'2023-11-01 05:54:21.225746','6','keeper',2,'[{\"added\": {\"name\": \"employee\", \"object\": \"Employee object (4)\"}}]',4,1),(39,'2023-11-01 05:54:28.681622','4','production',2,'[{\"added\": {\"name\": \"employee\", \"object\": \"Employee object (5)\"}}]',4,1),(40,'2023-11-01 05:54:33.660892','3','sale',2,'[{\"added\": {\"name\": \"employee\", \"object\": \"Employee object (6)\"}}]',4,1),(41,'2023-11-01 14:26:13.478791','4','مدیریت انبار',2,'[{\"changed\": {\"fields\": [\"Name\"]}}]',3,1),(42,'2023-11-01 14:28:34.385172','6','keeper',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',4,1),(43,'2023-11-01 14:28:40.336445','4','production',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',4,1),(44,'2023-11-01 14:28:50.929639','1','admin',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',4,1),(45,'2023-11-01 14:28:57.172949','5','buyer',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',4,1),(46,'2023-11-01 14:29:01.552965','3','sale',2,'[{\"changed\": {\"fields\": [\"Groups\"]}}]',4,1),(47,'2023-11-01 14:31:53.257360','6','مدیریت فروش',2,'[{\"changed\": {\"fields\": [\"Permissions\"]}}]',3,1),(48,'2023-11-01 15:27:51.721467','4','مدیریت انبار',2,'[{\"changed\": {\"fields\": [\"Permissions\"]}}]',3,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(23,'buy','applybuy'),(29,'consumable_warehouse','category'),(30,'consumable_warehouse','consumable'),(31,'consumable_warehouse','product'),(32,'consumable_warehouse','productcheck'),(34,'consumable_warehouse','productdetailed'),(33,'consumable_warehouse','productfactor'),(5,'contenttypes','contenttype'),(8,'industrial_warehouse','consumingmaterial'),(9,'industrial_warehouse','consumingmaterialcheck'),(20,'industrial_warehouse','consumingmaterialdetailed'),(10,'industrial_warehouse','consumingmaterialfactor'),(19,'industrial_warehouse','production'),(11,'industrial_warehouse','productioncheck'),(12,'industrial_warehouse','rawmaterial'),(13,'industrial_warehouse','rawmaterialcheck'),(18,'industrial_warehouse','rawmaterialdetailed'),(14,'industrial_warehouse','rawmaterialfactor'),(15,'industrial_warehouse','requestsupply'),(17,'industrial_warehouse','waste'),(16,'industrial_warehouse','wastecheck'),(27,'production','pendingproduce'),(26,'sale','autoincrementsalefactor'),(22,'sale','sale'),(21,'sale','salefactor'),(6,'sessions','session'),(24,'token_blacklist','blacklistedtoken'),(25,'token_blacklist','outstandingtoken'),(28,'user','customuser'),(7,'user','employee');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-10-31 08:04:10.034377'),(2,'auth','0001_initial','2023-10-31 08:04:10.284186'),(3,'admin','0001_initial','2023-10-31 08:04:10.356099'),(4,'admin','0002_logentry_remove_auto_add','2023-10-31 08:04:10.363125'),(5,'admin','0003_logentry_add_action_flag_choices','2023-10-31 08:04:10.370123'),(6,'contenttypes','0002_remove_content_type_name','2023-10-31 08:04:10.419932'),(7,'auth','0002_alter_permission_name_max_length','2023-10-31 08:04:10.454931'),(8,'auth','0003_alter_user_email_max_length','2023-10-31 08:04:10.477932'),(9,'auth','0004_alter_user_username_opts','2023-10-31 08:04:10.485930'),(10,'auth','0005_alter_user_last_login_null','2023-10-31 08:04:10.516534'),(11,'auth','0006_require_contenttypes_0002','2023-10-31 08:04:10.518532'),(12,'auth','0007_alter_validators_add_error_messages','2023-10-31 08:04:10.526536'),(13,'auth','0008_alter_user_username_max_length','2023-10-31 08:04:10.558494'),(14,'auth','0009_alter_user_last_name_max_length','2023-10-31 08:04:10.591880'),(15,'auth','0010_alter_group_name_max_length','2023-10-31 08:04:10.607896'),(16,'auth','0011_update_proxy_permissions','2023-10-31 08:04:10.613902'),(17,'auth','0012_alter_user_first_name_max_length','2023-10-31 08:04:10.647875'),(18,'buy','0001_initial','2023-10-31 08:04:10.659877'),(19,'industrial_warehouse','0001_initial','2023-10-31 08:04:11.030213'),(20,'sale','0001_initial','2023-10-31 08:04:11.072066'),(21,'sessions','0001_initial','2023-10-31 08:04:11.095358'),(22,'token_blacklist','0001_initial','2023-10-31 08:04:11.169113'),(23,'token_blacklist','0002_outstandingtoken_jti_hex','2023-10-31 08:04:11.229494'),(24,'token_blacklist','0003_auto_20171017_2007','2023-10-31 08:04:11.246496'),(25,'token_blacklist','0004_auto_20171017_2013','2023-10-31 08:04:11.286502'),(26,'token_blacklist','0005_remove_outstandingtoken_jti','2023-10-31 08:04:11.315501'),(27,'token_blacklist','0006_auto_20171017_2113','2023-10-31 08:04:11.332488'),(28,'token_blacklist','0007_auto_20171017_2214','2023-10-31 08:04:11.434509'),(29,'token_blacklist','0008_migrate_to_bigautofield','2023-10-31 08:04:11.535446'),(30,'token_blacklist','0010_fix_migrate_to_bigautofield','2023-10-31 08:04:11.545444'),(31,'token_blacklist','0011_linearizes_history','2023-10-31 08:04:11.548587'),(32,'token_blacklist','0012_alter_outstandingtoken_user','2023-10-31 08:04:11.556588'),(33,'user','0001_initial','2023-10-31 08:04:11.596490'),(34,'sale','0002_autoincrementsalefactor_alter_salefactor_code','2023-10-31 08:48:13.715420'),(35,'industrial_warehouse','0002_alter_waste_checkcode_alter_waste_product','2023-10-31 15:05:42.246146'),(36,'production','0001_initial','2023-10-31 15:05:42.302479'),(37,'user','0002_customuser_delete_employee','2023-11-01 05:41:33.841921'),(38,'user','0003_employee_delete_customuser','2023-11-01 05:53:37.608066'),(39,'industrial_warehouse','0003_consumingmaterialdetailed_average_rate_and_more','2023-11-01 06:49:39.671898'),(40,'consumable_warehouse','0001_initial','2023-11-01 14:51:31.952997'),(41,'industrial_warehouse','0004_consumingmaterialdetailed_address_seller_and_more','2023-11-01 14:51:32.037426');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('1un8g3f697r7ov79ul5d0qclhafnnka1','.eJxVjMEOwiAQRP-FsyG7QAN49O43kIWlUjWQlPZk_Hcl6UFvk3lv5iUC7VsJe89rWFicBYrTbxcpPXIdgO9Ub02mVrd1iXIo8qBdXhvn5-Vw_w4K9TLW0WmYgEihg8yorQHl0Sdl-Ju9j5oQZjQYJwRkh1ZjSkaRzZH0LN4ftMI24w:1qyC9U:i_2RYC9a3bt1doeiCNmpvIMbIyVaSh5qFJusVq4xmyA','2023-11-15 14:25:00.101809'),('awzngyhorrfzdt9ymmtxl39u1uhb5lwh','.eJxVjMEOwiAQRP-FsyG7QAN49O43kIWlUjWQlPZk_Hcl6UFvk3lv5iUC7VsJe89rWFicBYrTbxcpPXIdgO9Ub02mVrd1iXIo8qBdXhvn5-Vw_w4K9TLW0WmYgEihg8yorQHl0Sdl-Ju9j5oQZjQYJwRkh1ZjSkaRzZH0LN4ftMI24w:1qxjl4:0n9ORjTBTsPoVOJtZfxfRPaN0SJZt1tAHX3Kz2ZtqUs','2023-11-14 08:05:54.149276');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_consumingmaterial`
--

DROP TABLE IF EXISTS `industrial_warehouse_consumingmaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_consumingmaterial` (
  `code` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `scale` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=201000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_consumingmaterial`
--

LOCK TABLES `industrial_warehouse_consumingmaterial` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_consumingmaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_consumingmaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_consumingmaterialcheck`
--

DROP TABLE IF EXISTS `industrial_warehouse_consumingmaterialcheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_consumingmaterialcheck` (
  `code` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `checks` longtext,
  `jsonData` json DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=202000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_consumingmaterialcheck`
--

LOCK TABLES `industrial_warehouse_consumingmaterialcheck` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_consumingmaterialcheck` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_consumingmaterialcheck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_consumingmaterialdetailed`
--

DROP TABLE IF EXISTS `industrial_warehouse_consumingmaterialdetailed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_consumingmaterialdetailed` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `consumable` varchar(50) DEFAULT NULL,
  `input` double DEFAULT NULL,
  `carton` int DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `output` double DEFAULT NULL,
  `afterOperator` double DEFAULT NULL,
  `operator` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `buyer` varchar(50) DEFAULT NULL,
  `seller` varchar(50) DEFAULT NULL,
  `receiver` varchar(50) DEFAULT NULL,
  `document_type` varchar(50) DEFAULT NULL,
  `document_code` varchar(150) DEFAULT NULL,
  `amendment` longtext,
  `systemID` bigint DEFAULT NULL,
  `checkCode_id` int DEFAULT NULL,
  `factorCode_id` int DEFAULT NULL,
  `product_id` int NOT NULL,
  `average_rate` double DEFAULT NULL,
  `address_seller` longtext,
  `seller_national_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `industrial_warehouse_checkCode_id_7c4a6f47_fk_industria` (`checkCode_id`),
  KEY `industrial_warehouse_factorCode_id_e181218d_fk_industria` (`factorCode_id`),
  KEY `industrial_warehouse_product_id_ec549155_fk_industria` (`product_id`),
  CONSTRAINT `industrial_warehouse_checkCode_id_7c4a6f47_fk_industria` FOREIGN KEY (`checkCode_id`) REFERENCES `industrial_warehouse_consumingmaterialcheck` (`code`),
  CONSTRAINT `industrial_warehouse_factorCode_id_e181218d_fk_industria` FOREIGN KEY (`factorCode_id`) REFERENCES `industrial_warehouse_consumingmaterialfactor` (`code`),
  CONSTRAINT `industrial_warehouse_product_id_ec549155_fk_industria` FOREIGN KEY (`product_id`) REFERENCES `industrial_warehouse_consumingmaterial` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_consumingmaterialdetailed`
--

LOCK TABLES `industrial_warehouse_consumingmaterialdetailed` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_consumingmaterialdetailed` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_consumingmaterialdetailed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_consumingmaterialfactor`
--

DROP TABLE IF EXISTS `industrial_warehouse_consumingmaterialfactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_consumingmaterialfactor` (
  `code` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `factor` longtext,
  `jsonData` json DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=203000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_consumingmaterialfactor`
--

LOCK TABLES `industrial_warehouse_consumingmaterialfactor` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_consumingmaterialfactor` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_consumingmaterialfactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_production`
--

DROP TABLE IF EXISTS `industrial_warehouse_production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_production` (
  `code` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `cost` double DEFAULT NULL,
  `checkCode_id` int DEFAULT NULL,
  PRIMARY KEY (`code`),
  KEY `industrial_warehouse_checkCode_id_8f3bac2e_fk_industria` (`checkCode_id`),
  CONSTRAINT `industrial_warehouse_checkCode_id_8f3bac2e_fk_industria` FOREIGN KEY (`checkCode_id`) REFERENCES `industrial_warehouse_productioncheck` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=601000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_production`
--

LOCK TABLES `industrial_warehouse_production` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_production` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_production` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_productioncheck`
--

DROP TABLE IF EXISTS `industrial_warehouse_productioncheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_productioncheck` (
  `code` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `checks` longtext,
  `jsonData` json DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=602000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_productioncheck`
--

LOCK TABLES `industrial_warehouse_productioncheck` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_productioncheck` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_productioncheck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_rawmaterial`
--

DROP TABLE IF EXISTS `industrial_warehouse_rawmaterial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_rawmaterial` (
  `code` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `scale` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=101000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_rawmaterial`
--

LOCK TABLES `industrial_warehouse_rawmaterial` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_rawmaterial` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_rawmaterial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_rawmaterialcheck`
--

DROP TABLE IF EXISTS `industrial_warehouse_rawmaterialcheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_rawmaterialcheck` (
  `code` int NOT NULL AUTO_INCREMENT,
  `checks` longtext,
  `jsonData` json DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=102000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_rawmaterialcheck`
--

LOCK TABLES `industrial_warehouse_rawmaterialcheck` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_rawmaterialcheck` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_rawmaterialcheck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_rawmaterialdetailed`
--

DROP TABLE IF EXISTS `industrial_warehouse_rawmaterialdetailed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_rawmaterialdetailed` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `consumable` varchar(50) DEFAULT NULL,
  `input` double DEFAULT NULL,
  `carton` int DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `average_rate` double DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `output` double DEFAULT NULL,
  `afterOperator` double DEFAULT NULL,
  `operator` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `buyer` varchar(50) DEFAULT NULL,
  `seller` varchar(50) DEFAULT NULL,
  `receiver` varchar(50) DEFAULT NULL,
  `document_type` varchar(50) DEFAULT NULL,
  `document_code` varchar(150) DEFAULT NULL,
  `amendment` longtext,
  `systemID` bigint DEFAULT NULL,
  `checkCode_id` int DEFAULT NULL,
  `factorCode_id` int DEFAULT NULL,
  `product_id` int NOT NULL,
  `address_seller` longtext,
  `seller_national_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `industrial_warehouse_checkCode_id_bd074960_fk_industria` (`checkCode_id`),
  KEY `industrial_warehouse_factorCode_id_1ac7e34a_fk_industria` (`factorCode_id`),
  KEY `industrial_warehouse_product_id_6b826d83_fk_industria` (`product_id`),
  CONSTRAINT `industrial_warehouse_checkCode_id_bd074960_fk_industria` FOREIGN KEY (`checkCode_id`) REFERENCES `industrial_warehouse_rawmaterialcheck` (`code`),
  CONSTRAINT `industrial_warehouse_factorCode_id_1ac7e34a_fk_industria` FOREIGN KEY (`factorCode_id`) REFERENCES `industrial_warehouse_rawmaterialfactor` (`code`),
  CONSTRAINT `industrial_warehouse_product_id_6b826d83_fk_industria` FOREIGN KEY (`product_id`) REFERENCES `industrial_warehouse_rawmaterial` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_rawmaterialdetailed`
--

LOCK TABLES `industrial_warehouse_rawmaterialdetailed` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_rawmaterialdetailed` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_rawmaterialdetailed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_rawmaterialfactor`
--

DROP TABLE IF EXISTS `industrial_warehouse_rawmaterialfactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_rawmaterialfactor` (
  `code` int NOT NULL AUTO_INCREMENT,
  `factor` longtext,
  `jsonData` json DEFAULT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=103000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_rawmaterialfactor`
--

LOCK TABLES `industrial_warehouse_rawmaterialfactor` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_rawmaterialfactor` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_rawmaterialfactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_requestsupply`
--

DROP TABLE IF EXISTS `industrial_warehouse_requestsupply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_requestsupply` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `raw_material_jsonData` json DEFAULT NULL,
  `consuming_material_jsonData` json DEFAULT NULL,
  `applicant` varchar(50) NOT NULL,
  `purpose` varchar(150) NOT NULL,
  `date` date NOT NULL,
  `is_delivered` tinyint(1) DEFAULT NULL,
  `supplement` tinyint(1) DEFAULT NULL,
  `which_request` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=301000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_requestsupply`
--

LOCK TABLES `industrial_warehouse_requestsupply` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_requestsupply` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_requestsupply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_waste`
--

DROP TABLE IF EXISTS `industrial_warehouse_waste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_waste` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `checkCode_id` int DEFAULT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `industrial_warehouse_checkCode_id_dfa6b536_fk_industria` (`checkCode_id`),
  KEY `industrial_warehouse_product_id_de4a2edc_fk_industria` (`product_id`),
  CONSTRAINT `industrial_warehouse_checkCode_id_dfa6b536_fk_industria` FOREIGN KEY (`checkCode_id`) REFERENCES `industrial_warehouse_wastecheck` (`code`),
  CONSTRAINT `industrial_warehouse_product_id_de4a2edc_fk_industria` FOREIGN KEY (`product_id`) REFERENCES `industrial_warehouse_requestsupply` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=401000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_waste`
--

LOCK TABLES `industrial_warehouse_waste` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_waste` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_waste` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `industrial_warehouse_wastecheck`
--

DROP TABLE IF EXISTS `industrial_warehouse_wastecheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `industrial_warehouse_wastecheck` (
  `code` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `checks` longtext,
  `jsonData` json DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=402000001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `industrial_warehouse_wastecheck`
--

LOCK TABLES `industrial_warehouse_wastecheck` WRITE;
/*!40000 ALTER TABLE `industrial_warehouse_wastecheck` DISABLE KEYS */;
/*!40000 ALTER TABLE `industrial_warehouse_wastecheck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_pendingproduce`
--

DROP TABLE IF EXISTS `production_pendingproduce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production_pendingproduce` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `raw_material_jsonData` json DEFAULT NULL,
  `consuming_material_jsonData` json DEFAULT NULL,
  `purpose` varchar(150) NOT NULL,
  `status` varchar(150) NOT NULL,
  `date` date NOT NULL,
  `request_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `production_pendingpr_request_id_2e3669aa_fk_industria` (`request_id`),
  CONSTRAINT `production_pendingpr_request_id_2e3669aa_fk_industria` FOREIGN KEY (`request_id`) REFERENCES `industrial_warehouse_requestsupply` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_pendingproduce`
--

LOCK TABLES `production_pendingproduce` WRITE;
/*!40000 ALTER TABLE `production_pendingproduce` DISABLE KEYS */;
/*!40000 ALTER TABLE `production_pendingproduce` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_autoincrementsalefactor`
--

DROP TABLE IF EXISTS `sale_autoincrementsalefactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_autoincrementsalefactor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `increment` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_autoincrementsalefactor`
--

LOCK TABLES `sale_autoincrementsalefactor` WRITE;
/*!40000 ALTER TABLE `sale_autoincrementsalefactor` DISABLE KEYS */;
INSERT INTO `sale_autoincrementsalefactor` VALUES (1,701000001);
/*!40000 ALTER TABLE `sale_autoincrementsalefactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_sale`
--

DROP TABLE IF EXISTS `sale_sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_sale` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `factorCode_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sale_sale_factorCode_id_fcf6a9bb_fk` (`factorCode_id`),
  CONSTRAINT `sale_sale_factorCode_id_fcf6a9bb_fk` FOREIGN KEY (`factorCode_id`) REFERENCES `sale_salefactor` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_sale`
--

LOCK TABLES `sale_sale` WRITE;
/*!40000 ALTER TABLE `sale_sale` DISABLE KEYS */;
/*!40000 ALTER TABLE `sale_sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_salefactor`
--

DROP TABLE IF EXISTS `sale_salefactor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_salefactor` (
  `code` bigint NOT NULL,
  `jsonData` json DEFAULT NULL,
  `date` date NOT NULL,
  `total` double DEFAULT NULL,
  `tax` double DEFAULT NULL,
  `discount` double DEFAULT NULL,
  `extra` double DEFAULT NULL,
  `paid` double DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_salefactor`
--

LOCK TABLES `sale_salefactor` WRITE;
/*!40000 ALTER TABLE `sale_salefactor` DISABLE KEYS */;
/*!40000 ALTER TABLE `sale_salefactor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_blacklistedtoken`
--

DROP TABLE IF EXISTS `token_blacklist_blacklistedtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_blacklistedtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_id` (`token_id`),
  CONSTRAINT `token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_blacklistedtoken`
--

LOCK TABLES `token_blacklist_blacklistedtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_outstandingtoken`
--

DROP TABLE IF EXISTS `token_blacklist_outstandingtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_outstandingtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` int DEFAULT NULL,
  `jti` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  KEY `token_blacklist_outs_user_id_83bc629a_fk_auth_user` (`user_id`),
  CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_outstandingtoken`
--

LOCK TABLES `token_blacklist_outstandingtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_employee`
--

DROP TABLE IF EXISTS `user_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_employee` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `department` varchar(50) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `user_employee_user_id_9b2edd10_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_employee`
--

LOCK TABLES `user_employee` WRITE;
/*!40000 ALTER TABLE `user_employee` DISABLE KEYS */;
INSERT INTO `user_employee` VALUES (1,'مدیر کارخانه',1),(2,'مسئول خرید',5),(3,'مدیریت مالی',2),(4,'مدیریت انبار',6),(5,'مدیریت تولید',4),(6,'مدیریت فروش',3);
/*!40000 ALTER TABLE `user_employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-02  8:13:29
