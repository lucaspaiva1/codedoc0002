-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: igreja
-- ------------------------------------------------------
-- Server version	5.7.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comentario`
--

DROP TABLE IF EXISTS `comentario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comentario` (
  `IDComentario` int(11) NOT NULL AUTO_INCREMENT,
  `Texto` longtext NOT NULL,
  `Usuario_IDUsuario` int(11) NOT NULL,
  `Publicacao_IDPublicacao` int(11) NOT NULL,
  PRIMARY KEY (`IDComentario`),
  KEY `fk_Comentario_Usuario1_idx` (`Usuario_IDUsuario`),
  KEY `fk_Comentario_Publicacao1_idx` (`Publicacao_IDPublicacao`),
  CONSTRAINT `fk_Comentario_Publicacao1` FOREIGN KEY (`Publicacao_IDPublicacao`) REFERENCES `publicacao` (`IDPublicacao`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_Usuario1` FOREIGN KEY (`Usuario_IDUsuario`) REFERENCES `usuario` (`IDUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario`
--

LOCK TABLES `comentario` WRITE;
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `evento` (
  `IDEvento` int(11) NOT NULL AUTO_INCREMENT,
  `DataIncio` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DataTermino` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Titulo` varchar(100) NOT NULL,
  `Descricao` longtext,
  `Local` varchar(100) NOT NULL,
  `Usuario_IDUsuario` int(11) NOT NULL,
  `EventoDiario` tinyint(4) NOT NULL,
  PRIMARY KEY (`IDEvento`),
  KEY `fk_Evento_Usuario_idx` (`Usuario_IDUsuario`),
  CONSTRAINT `fk_Evento_Usuario` FOREIGN KEY (`Usuario_IDUsuario`) REFERENCES `usuario` (`IDUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicacao`
--

DROP TABLE IF EXISTS `publicacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publicacao` (
  `IDPublicacao` int(11) NOT NULL AUTO_INCREMENT,
  `DataPublicacao` timestamp NULL DEFAULT NULL,
  `TempoPermanencia` date NOT NULL,
  `Comentario` enum('s','n') NOT NULL,
  `LinkImagem` longtext,
  `Titulo` varchar(100) DEFAULT NULL,
  `Texto` longtext,
  `Usuario_IDUsuario` int(11) NOT NULL,
  PRIMARY KEY (`IDPublicacao`),
  KEY `fk_Publicacao_Usuario1_idx` (`Usuario_IDUsuario`),
  CONSTRAINT `fk_Publicacao_Usuario1` FOREIGN KEY (`Usuario_IDUsuario`) REFERENCES `usuario` (`IDUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicacao`
--

LOCK TABLES `publicacao` WRITE;
/*!40000 ALTER TABLE `publicacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `publicacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `IDUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `Nascimento` date NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Sexo` enum('m','f') NOT NULL,
  `Tipo` enum('a','c') NOT NULL,
  `Facebook` tinyint(4) DEFAULT NULL,
  `GooglePlus` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`IDUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-01-06 15:07:43
