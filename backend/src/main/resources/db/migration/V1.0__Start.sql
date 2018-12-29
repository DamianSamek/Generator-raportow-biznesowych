CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `second_name` varchar(45) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `salary` int(11),
  PRIMARY KEY (`id`)
);

INSERT INTO `employee` (`id`, `first_name`, `second_name`, `phone`, `email`, `salary`) VALUES ('1', 'Damian', 'Wojtkowski', '782222112', 'wojtko@onet.pl', '3000');
INSERT INTO `employee` (`id`, `first_name`, `second_name`, `phone`, `email`, `salary`) VALUES ('2', 'Hubert', 'Mazur', '881777987', 'mazur@gmail.com', '4500');
INSERT INTO `employee` (`id`, `first_name`, `second_name`, `phone`, `email`, `salary`) VALUES ('3', 'Marta', 'Kowalska', '663222123', 'kowalska@onet.pl','4600');
INSERT INTO `employee` (`id`, `first_name`, `second_name`, `phone`, `email`, `salary`) VALUES ('4', 'Krystian', 'Banior', '778882341', 'banior@yahoo.com','3200');
INSERT INTO `employee` (`id`, `first_name`, `second_name`, `phone`, `email`, `salary`) VALUES ('5', 'Mariola', 'Huzar', '667782999', 'huzar@onet.pl','2500');
INSERT INTO `employee` (`id`, `first_name`, `second_name`, `phone`, `email`, `salary`) VALUES ('6', 'Jan', 'Bytnar', '876677999', 'byt_nar@interia.pl','4300');
INSERT INTO `employee` (`id`, `first_name`, `second_name`, `phone`, `email`, `salary`) VALUES ('7', 'Bartosz', 'Janas', '664227111', 'janas@onet.pl','5800');
INSERT INTO `employee` (`id`, `first_name`, `second_name`, `phone`, `email`, `salary`) VALUES ('8', 'Katarzyna', 'Olko', '765999123', 'olka@gmail.com','4000');
INSERT INTO `employee` (`id`, `first_name`, `second_name`, `phone`, `email`, `salary`) VALUES ('9', 'Monika', 'Nowak', '881993657', 'mono@onet.pl','5200');
INSERT INTO `employee` (`id`, `first_name`, `second_name`, `phone`, `email`, `salary`) VALUES ('10', 'Jakub', 'Balicki', '789121958', 'balicki@poczta.pl','3700');

