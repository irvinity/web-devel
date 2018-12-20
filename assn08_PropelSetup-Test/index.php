<?php

echo "<h2>Propel Setup</h2>";

// Invoke autoload to get access to the propel generated models
require_once 'vendor/autoload.php';

// Require the config file that propel init created with your db connection information
require_once 'generated-conf/config.php';

// Now this script can access the database through the propel models!

// Retrive a recipe by id and print the name
// Note that the getters were generated based on the db col names 'name'

$recipe = RecipeQuery::create()->findPk(1);

echo "<p><strong>Recipe Name:</strong> ".$recipe->getName()."</p>";

// Retrive a recipe by prep time
$recipe = RecipeQuery::create()->filterByPrepTime("30")->findOne();
echo "<p><strong>Recipe with ".$recipe->getPrepTime()." min preptime:</strong> ".$recipe->getName()." - ".$recipe->getDescription()."</p>";

echo "<h2>Propel Relations</h2>";

$recipe = RecipeQuery::create()->filterByPrepTime("30")->findOne();

echo "<p><strong>Recipe Steps for: </strong>".$recipe->getName()."</p>";

// Retrive children (one-to-many) on demand
foreach ($recipe->getStepss() as $key => $steps){
    echo "<p>".$steps."</p>";
}

$steps = StepsQuery::create()->findPk(16);
echo "<p><strong>".$steps->getDescription()."</strong> This step belongs to recipe: ".$steps->getRecipeId()."</p>";

$steps = StepsQuery::create()->findPk(8);
echo "<p><strong>".$steps->getDescription()."</strong> This step belongs to recipe: ".$steps->getRecipeId()."</p>";

$steps = StepsQuery::create()->findPk(1);
echo "<p><strong>".$steps->getDescription()."</strong> This step belongs to recipe: ".$steps->getRecipeId()."</p>";