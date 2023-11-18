CREATE TABLE `radiografias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_apellido` varchar(256) NOT NULL,
  `nacimiento` varchar(256) NOT NULL,
  `cedula` varchar(256) NOT NULL,
  `tipo` varchar(256) NOT NULL,
  `expedicion` varchar(256) NOT NULL,
  `ruta` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci