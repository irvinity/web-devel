-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 19, 2018 at 05:59 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recipe_site`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipe`
--

CREATE TABLE `recipe` (
  `id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `prep_time` int(11) NOT NULL,
  `total_time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recipe`
--

INSERT INTO `recipe` (`id`, `image_url`, `name`, `description`, `prep_time`, `total_time`) VALUES
(1, 'https://www.allrecipes.com/recipe/216438/gregs-southern-biscuits/photos/568652/', 'Greg\'s Southern Biscuits', 'Light and fluffy and the closest thing I\'ve found to my grandmother\'s biscuits. Delicious for jams, butter, honey, corn syrup, or just great bread for any meal. My grandmother used to make them pretty much every day.', 20, 35),
(2, 'https://www.allrecipes.com/recipe/218091/classic-and-simple-meat-lasagna/photos/994958/', 'Classic and Simple Meat Lasagna', 'Lasagne is a type of wide, flat pasta, possibly one of the oldest types of pasta. Lasagne, or the singular lasagna, commonly refers to a culinary dish made with stacked layers of pasta alternated with sauces and ingredients such as meats, vegetables and cheese, and sometimes topped with melted grated cheese.', 25, 95),
(3, 'https://www.allrecipes.com/recipe/231680/shrimp-stir-fry-with-egg-noodles/photos/1563257/', 'Shrimp Stir Fry With Egg Noodles\r\n', 'This delicious shrimp dish is a colorful, easy to make, and will keep you wanting seconds. Enjoy.', 20, 30),
(4, 'https://www.allrecipes.com/recipe/24087/restaurant-style-buffalo-chicken-wings/photos/445293/', 'Restaurant-Style Buffalo Chicken Wings\r\n', 'This is similar to the hot wings recipe served at a popular restaurant chain. If you have ever had them, you have to love them.', 15, 120),
(5, 'https://www.allrecipes.com/recipe/11379/sugared-black-raspberry-tea-cookies/photos/60049/', 'Sugared Black Raspberry Tea Cookies', 'Petite, crunchy, black raspberry filled thumbprints, dipped in granulated sugar, and studded with miniature chocolate chips. These cookies freeze well.', 30, 45);

-- --------------------------------------------------------

--
-- Table structure for table `steps`
--

CREATE TABLE `steps` (
  `id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `recipe_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `steps`
--

INSERT INTO `steps` (`id`, `step_number`, `description`, `recipe_id`) VALUES
(1, 1, 'Preheat oven to 450 degrees F (230 degrees C). Lightly grease a baking sheet with 1/2 teaspoon of lard.', 1),
(2, 2, 'Mix together the flour, salt, baking soda, and baking powder in a bowl. Grate the frozen butter and 2 tablespoons frozen lard into the flour mixture with a cheese grater; stir lightly 1 or 2 times to mix. ', 1),
(3, 3, 'Scrape dough out onto a floured surface, and gently pat the dough flat.', 1),
(4, 4, 'Bake in the preheated oven until risen and lightly golden brown, 15 to 20 minutes.', 1),
(5, 1, 'Preheat oven to 350 degrees F (175 degrees C).', 2),
(6, 2, 'Fill a large pot with lightly salted water and bring to a rolling boil over high heat.', 2),
(7, 3, 'Place the ground beef into a skillet over medium heat, add the garlic, garlic powder, oregano, salt, and black pepper to the skillet. Cook the meat, chopping it into small chunks as it cooks, until no longer pink, about 10 minutes. Drain excess grease.', 2),
(8, 4, 'In a bowl, mix the cottage cheese, eggs, and Parmesan cheese until thoroughly combined.', 2),
(9, 5, 'Place 4 noodles side by side into the bottom of a 9x13-inch baking pan; top with a layer of the tomato-basil sauce, a layer of ground beef mixture, and a layer of the cottage cheese mixture.', 2),
(10, 6, 'Bake in the preheated oven until the casserole is bubbling and the cheese has melted, about 30 minutes. Remove foil and bake until cheese has begun to brown, about 10 more minutes. Allow to stand at least 10 minutes before serving.', 2),
(11, 1, 'Fill a large pot with lightly salted water and bring to a rolling boil over high heat. Once the water is boiling, stir in noodles and return to a boil. Cook until the pasta floats to the top, 1 to 2 minutes; drain.', 3),
(12, 2, 'Heat oil in a large skillet over medium-high heat; cook and stir onion and garlic for about 1 minute. Add broccoli and bell pepper; cook and stir until just tender, about 3 minutes.', 3),
(13, 3, 'Serve shrimp and vegetables over noodles.', 3),
(14, 1, 'In a small bowl mix together the flour, paprika, cayenne pepper and salt. Place chicken wings in a large nonporous glass dish or bowl and sprinkle flour mixture over them until they are evenly coated. ', 4),
(15, 2, 'Heat oil in a deep fryer to 375 degrees F (190 degrees C). The oil should be just enough to cover wings entirely, an inch or so deep. Combine the butter, hot sauce, pepper and garlic powder in a small saucepan over low heat.', 4),
(16, 3, 'Fry coated wings in hot oil for 10 to 15 minutes, or until parts of wings begin to turn brown. Remove from heat, place wings in serving bowl, add hot sauce mixture and stir together. Serve.', 4),
(17, 1, 'Preheat oven to 375 degrees F (190 degrees C). Line baking sheets with parchment paper.\r\n', 5),
(18, 2, 'In a large bowl, cream butter with brown sugar and 1/3 cup white sugar. Blend in the vanilla and milk. Mix in the flour and corn starch. Stir in the mini chocolate chips.\r\n', 5),
(19, 3, 'Form the dough into 1 inch balls, and roll in the remaining white sugar. Place on the prepared cookie sheet, about 1 1/2 inches apart. Use your finger or thumb to press straight down into the center of each ball, making a well for the jam.', 5),
(20, 4, 'Bake in preheated oven for 13 to 15 minutes, or until cookies are just beginning to turn golden around the edges. Let cookies cool before eating.\r\n', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `steps`
--
ALTER TABLE `steps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipe_id` (`recipe_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `steps`
--
ALTER TABLE `steps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `steps`
--
ALTER TABLE `steps`
  ADD CONSTRAINT `steps_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
