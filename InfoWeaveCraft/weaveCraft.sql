-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : dim. 25 août 2024 à 16:50
-- Version du serveur : 5.7.39
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `weaveCraft`
--

-- --------------------------------------------------------

--
-- Structure de la table `additionalPictures`
--

CREATE TABLE `additionalPictures` (
  `id` int(10) UNSIGNED NOT NULL,
  `picture_src` text NOT NULL,
  `alt` varchar(200) NOT NULL,
  `products_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(10) UNSIGNED NOT NULL,
  `address_type` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1 = Adresse de livraison, 2 = Adresse de facturation',
  `street` varchar(200) NOT NULL,
  `complement` varchar(200) NOT NULL,
  `city` varchar(60) NOT NULL,
  `zip_code` varchar(30) NOT NULL,
  `country` varchar(60) NOT NULL,
  `users_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `addresses`
--

INSERT INTO `addresses` (`id`, `address_type`, `street`, `complement`, `city`, `zip_code`, `country`, `users_id`) VALUES
(1, 2, '7 rue goudy', 'Au 5eme étages', 'Nantes', '44200', 'France', 4),
(3, 2, '2 rue Du Chat', '4eme étage', 'Nantes', '44200', 'France', 8),
(4, 2, '2 rue Du Chat', '4eme étage', 'Nantes', '44200', 'France', 9),
(5, 1, '2 rue Du Chat', '4eme étage', 'Nantes', '44200', 'France', 7);

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `label` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `label`) VALUES
(1, 'Bracelets'),
(2, 'Boucles'),
(3, 'Colliers'),
(4, 'Manchettes'),
(5, 'Bagues');

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `readMessage` int(11) DEFAULT '0' COMMENT '0 = non lu, 1 = lu',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `contacts`
--

INSERT INTO `contacts` (`id`, `firstname`, `lastname`, `email`, `subject`, `content`, `readMessage`, `created_at`) VALUES
(2, 'Vesna', 'Popovic', 'vesnaP@gmail.com', 'Erreur sur ma commande', 'Bonjour, j\'ai fais une erreur dans ma commande. Pouvez-vous la rectifier ? Merci d\'avance, Vesna Popovic.', 1, '2024-06-27 13:16:01'),
(3, 'Kaja', 'Cavic', 'kayaC@gmail.com', 'Erreur sur ma commande', 'Bonjour, j\'ai fais une erreur dans ma commande. Pouvez-vous la rectifier ? Merci d\'avance, Vesna Popovic.', 0, '2024-06-27 13:17:21'),
(8, 'Anna', 'Stasia', 'anna@stasia.com', 'qsdfghjklm', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu augue ut tellus tincidunt condimentum. Suspendisse eget tortor sed purus volutpat dapibus.', 1, '2024-08-10 20:43:50'),
(9, 'Anna', 'Stasia', 'anna@stasia.com', 'qsdfghjklm', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu augue ut tellus tincidunt condimentum. Suspendisse eget tortor sed purus volutpat dapibus.', 0, '2024-08-10 20:44:02'),
(15, 'Anna', 'Stasia', 'anna@stasia.com', 'qsdfghjklm', 'bonjour bonjour', 0, '2024-08-11 13:42:19'),
(16, 'Anna', 'Stasia', 'anna@stasia.com', 'qsdfghjklm', 'qsdfghjklmlkjhgfdsqsdfghjklm', 0, '2024-08-11 13:43:36'),
(17, 'vesna', 'popovic', 'vesnap@gmail.com', 'Erreur de commande', 'Je me suis tromper d\'article.', 0, '2024-08-25 15:21:59');

-- --------------------------------------------------------

--
-- Structure de la table `orderDetails`
--

CREATE TABLE `orderDetails` (
  `id` int(10) UNSIGNED NOT NULL,
  `orders_id` int(10) UNSIGNED NOT NULL,
  `products_id` int(10) UNSIGNED NOT NULL,
  `quantity` smallint(6) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `orderDetails`
--

INSERT INTO `orderDetails` (`id`, `orders_id`, `products_id`, `quantity`, `price`) VALUES
(2, 4, 2, 2, 47.97),
(3, 1, 1, 3, 44.8),
(4, 5, 1, 1, 47.97),
(5, 5, 2, 1, 47.97),
(6, 5, 3, 1, 47.97),
(7, 5, 4, 1, 47.97),
(8, 5, 5, 1, 47.97),
(9, 6, 2, 1, 47.97),
(10, 6, 5, 1, 47.97);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ref` varchar(30) NOT NULL,
  `productsQuantity` int(11) NOT NULL,
  `totalPrice` float NOT NULL,
  `users_id` int(10) UNSIGNED NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Payée'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `date`, `ref`, `productsQuantity`, `totalPrice`, `users_id`, `status`) VALUES
(1, '2024-06-28 10:26:50', 'nvN8wkS2JmG4a4n', 3, 134.4, 9, 'Terminée'),
(3, '2024-06-28 10:32:58', 'DW1ousgTHYW04tM', 2, 97.97, 9, 'Expédiée'),
(4, '2024-06-28 12:47:28', 'x71NLNIk3aGXlaI', 2, 97.97, 9, 'Payée'),
(5, '2024-06-28 15:52:09', 'X5FQjGMuOUcdXkg', 5, 239.85, 4, 'Payée'),
(6, '2024-07-09 10:20:47', 'Ls6C0r5LlIQness', 2, 97.97, 7, 'Expédiée'),
(7, '2024-07-10 11:35:08', 'DkIeBt8Kkp2EoS2', 2, 97.97, 12, 'Payée');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `undertitle` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `picture` text NOT NULL,
  `alt` varchar(200) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `ref` varchar(15) NOT NULL,
  `quantityInStock` smallint(6) NOT NULL,
  `categories_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `title`, `undertitle`, `description`, `picture`, `alt`, `price`, `ref`, `quantityInStock`, `categories_id`) VALUES
(20, 'Zia', 'Boucle Zia', 'Jolie boucle d\'oreille Zia, en forme de fleur.', '32e7c08f-bc32-46bd-a1b2-941f5fa2311b.webp', 'boucle d\'oreille en forme de fleur, orange.', '34.97', 'EDFRTGHYJULDKFJ', 1, 2),
(30, 'Cleo', 'Boucle Cleo', 'Ces boucles d\'oreilles en micromacramé allient délicatesse et élégance, fabriquées à la main avec une précision remarquable. Leur design raffiné et leur finesse les rendent parfaites pour ajouter une touche unique et sophistiquée à toute tenue.', 'f4adbade-043c-42e5-8025-983caa9bf700.webp', 'boucle cleo, marron et verte.', '27.57', 'pESFzALSxdSYrlr', 1, 2),
(31, 'Eye', 'Boucle Eye', 'Ces boucles d\'oreilles en micromacramé allient délicatesse et élégance, fabriquées à la main avec une précision remarquable. Leur design raffiné et leur finesse les rendent parfaites pour ajouter une touche unique et sophistiquée à toute tenue.', '4dff5387-4706-45c6-9cb6-6cc2e6f96ac7.webp', 'boucle eye, doré et verte.', '22.37', 'MujHu7x9JB3Dnqx', 1, 2),
(32, 'Hibou', 'Boucle Hibou', 'Ces boucles d\'oreilles en micromacramé allient délicatesse et élégance, fabriquées à la main avec une précision remarquable. Leur design raffiné et leur finesse les rendent parfaites pour ajouter une touche unique et sophistiquée à toute tenue.', '2040b8f0-c396-4350-b630-ef5254bd90b6.webp', 'boucle en forme de hibou marron', '35.40', 'faELFbdRPmzvhFK', 1, 2),
(33, 'Olympe', 'boucle Olympe', 'Ces boucles d\'oreilles en micromacramé allient délicatesse et élégance, fabriquées à la main avec une précision remarquable. Leur design raffiné et leur finesse les rendent parfaites pour ajouter une touche unique et sophistiquée à toute tenue.', 'ccacafbd-bef8-49b7-824c-454278ee07f9.webp', 'boucle olympe beige et bleu', '27.70', '4wPTPCVuoVQOWCj', 1, 2),
(34, 'Oria', 'Boucle Oria', 'Ces boucles d\'oreilles en micromacramé allient délicatesse et élégance, fabriquées à la main avec une précision remarquable. Leur design raffiné et leur finesse les rendent parfaites pour ajouter une touche unique et sophistiquée à toute tenue.', '500a76fe-38de-4908-b3f1-7ad77e1c1b09.webp', 'boucle oria vert kaki', '34.50', 'CMAwtHwdcFn5OB6', 1, 2),
(35, 'Abysse', 'Bracelet Abysse', 'Ce bracelet en micromacramé allie finesse et élégance, tissé à la main avec une précision délicate. Son design raffiné ajoute une touche unique à votre poignet, parfait pour toutes les occasions.', 'ade334c5-0cb9-445f-baab-257a7c3c0c60.webp', 'bracelet abysse bleu ', '47.70', '9JGLYYq1X6f7C6G', 1, 1),
(36, 'Ania', 'Bracelet Ania', 'Ce bracelet en micromacramé allie finesse et élégance, tissé à la main avec une précision délicate. Son design raffiné ajoute une touche unique à votre poignet, parfait pour toutes les occasions.', '06d8f586-e6c7-40a5-9c5a-7ab3c42288ba.webp', 'bracelet ania marron et bleu', '47.70', 'TkOeWIzAQoY4z9H', 1, 1),
(37, 'Forest', 'Bracelet Forest', 'Ce bracelet en micromacramé allie finesse et élégance, tissé à la main avec une précision délicate. Son design raffiné ajoute une touche unique à votre poignet, parfait pour toutes les occasions.', 'c4a0a0d8-e8cd-49a2-9c0c-d8ecc3f1cb8b.webp', 'bracelet forest vert', '47.70', 'S1nrwwJZvfPwarA', 1, 1),
(38, 'Onduline', 'Bracelet Onduline', 'Ce bracelet en micromacramé allie finesse et élégance, tissé à la main avec une précision délicate. Son design raffiné ajoute une touche unique à votre poignet, parfait pour toutes les occasions.', 'eb58367c-a9de-45f5-aab9-b5c7f3d81605.webp', 'bracelet onduline bleu', '47.70', 'KwXOorOqJQtMuEu', 1, 1),
(39, 'Broceliande', 'Collier Broceliande', 'Ce collier en micromacramé, minutieusement confectionné à la main, combine délicatesse et style. Son design élégant et son tissage raffiné apportent une touche distincte à votre te', 'e5e41cf3-1200-49c7-a8de-3e6b103bd0de.webp', 'Collier broceliande beige et vert', '57.77', 'C1j1XdyyOcLtzWZ', 1, 3),
(40, 'Flower', 'Collier Flower', 'Ce collier en micromacramé, minutieusement confectionné à la main, combine délicatesse et style. Son design élégant et son tissage raffiné apportent une touche distincte à votre te', '8a79ab5e-4190-4c3a-a59f-0ff9647685c0.webp', 'collier flower bleu', '52.17', 'PlUg4Te3zFv3XZk', 1, 3),
(41, 'Isis', 'Collier Isis', 'Ce collier en micromacramé, minutieusement confectionné à la main, combine délicatesse et style. Son design élégant et son tissage raffiné apportent une touche distincte à votre te', '665331dd-9df5-4e12-b7cf-36784459cdee.webp', 'collier isis bleu', '61.67', 'jHuG3sUVwEs2E9a', 1, 3),
(42, 'Jaspe', 'Collier Jaspe', 'Ce collier en micromacramé, minutieusement confectionné à la main, combine délicatesse et style. Son design élégant et son tissage raffiné apportent une touche distincte à votre te', '945d79ec-28f7-45cf-bbb7-1cdf2a0397b0.webp', 'collier jaspe pierre rouge et fils bleu', '27.90', 'XKFmqpwKVZvgYbG', 1, 3),
(43, 'Neptune', 'Collier Neptune', 'Ce collier en micromacramé, minutieusement confectionné à la main, combine délicatesse et style. Son design élégant et son tissage raffiné apportent une touche distincte à votre te', '6fc0f28d-1d7a-4038-8195-4586c563b567.webp', 'collier neptune bleu foncé a noir', '77.30', 'ortNgJOnEVtdo9d', 1, 3),
(44, 'Princess', 'Collier Princess', 'Ce collier en micromacramé, minutieusement confectionné à la main, combine délicatesse et style. Son design élégant et son tissage raffiné apportent une touche distincte à votre te', '4c596401-600f-4dd4-814f-dd36e63ca1b9.webp', 'collier princess rose et noir', '53.47', 'QA1rINykXUXyZIQ', 1, 3),
(45, 'Zafina', 'Manchette Zafina', 'Cette manchette en micromacramé, réalisée à la main avec une attention exceptionnelle, marie audace et raffinement. Son tissage complexe et son design moderne ajoutent une touche originale à votre look.', '03496cff-2c24-45e3-a222-09b64362542d.webp', 'manchette zafina beige et vert', '56.70', 'Q3lYyhorgqRXFzJ', 1, 4);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `label` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `label`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('TMnoDRySq9ISy-wVablzpYaLMlKthCOJ', 1724603488, '{\"cookie\":{\"originalMaxAge\":3600000,\"expires\":\"2024-08-25T16:31:22.994Z\",\"secure\":false,\"httpOnly\":true,\"domain\":\"localhost\",\"path\":\"/\",\"sameSite\":\"lax\"},\"user\":{\"id\":8,\"firstname\":\"Alexia\",\"email\":\"alexiaK@gmail.com\",\"roles_id\":1,\"isAdmin\":true}}');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` char(60) NOT NULL,
  `roles_id` int(10) UNSIGNED NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `roles_id`) VALUES
(4, 'Vesna', 'Popovic', 'vesnap@gmail.com', '$2b$10$fJZlpp5wRUzQaF/Z9DzWwuw10QAiMC5c1rKQ65TbOZ9/53IeYM5dG', 2),
(7, 'Maja', 'Durovic', 'majaD@gmail.com', '$2b$10$vDI7vUs17h7dGwVtEQMHhOQNNYRg6JrCX0NqZFsWZ7OH4ZO7GVO3G', 2),
(8, 'Alexia', 'Krznaric', 'alexiaK@gmail.com', '$2b$10$8t82jSLhMc8kMIDC.5NMzeaEtOBwWl2eAVIiMXuiJjMCTS5/.hBcu', 1),
(9, 'Ka', 'Cavic', 'kayaC@gmail.com', '$2b$10$YVe2cREH.VSWtz6e7R5pa.9Ah7iWXa59koCGR2LfrpwPwsZmCVIUa', 2),
(12, 'Majamaja', 'Duro', 'majamaja@gmail.com', '$2b$10$GyxooT95tB2Dr6zHu8LHOuVfJbTdgRxYeoDtQAX8uWU0YiE4kjsLW', 2),
(14, 'KajaK', 'CavicC', 'kaC@gmail.com', '$2b$10$JsQFPgtQ.9j0D2/Sp7JT7O/hXvOkNJWjyS3DNmRwAi4UAH/hIaKIG', 2),
(15, 'Kayak', 'Kayak', 'Kayak@gmail.com', '$2b$10$KaNv6696rG.HzvS80nLUnu13EfnlFpFjuKicMRUK6vAkkKDNCk/UO', 2),
(34, 'Anna', 'Nicoleau', 'annaN@gmail.com', '$2b$10$VQcCm3kCHTctDfQu2rTlXukcCEcg1MDFoST95O36mPPlbhXg10xwO', 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `additionalPictures`
--
ALTER TABLE `additionalPictures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `additionalpictures_ibfk_1` (`products_id`);

--
-- Index pour la table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_ibfk_1` (`users_id`);

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_id` (`orders_id`),
  ADD KEY `products_id` (`products_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`users_id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`categories_id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`roles_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `additionalPictures`
--
ALTER TABLE `additionalPictures`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `orderDetails`
--
ALTER TABLE `orderDetails`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `additionalPictures`
--
ALTER TABLE `additionalPictures`
  ADD CONSTRAINT `additionalpictures_ibfk_1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `orderDetails`
--
ALTER TABLE `orderDetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`);

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
