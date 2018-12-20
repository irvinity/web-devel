<?php

// Request and Response classes
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Respone;

// Slim, Twig, Propel, and other related dependencies
require '../vendor/autoload.php';

// Setup propel
require_once '../generated-conf/config.php';

// Add configuration
$config = [
    "displayErrorDetails" => true,
];

// Slim app start
$app = new \Slim\App(['settings' => $config]);

// DIC (Dependency Injection Container)
$container = $app->getContainer();

// Register component on container
// Dependency 'view'
$container['view'] = function($c){

    $view = new \Slim\Views\Twig("../templates/", ['cache' => false]); // Path to templates, path to cache(or off)
    
    // Instantiate and add Slim specific extension
    $router = $c->get('router');
    $uri = \Slim\Http\Uri::createFromEnvironment(new \Slim\Http\Environment($_SERVER));
    $view->addExtension(new Slim\Views\TwigExtension($router, $uri));

    return $view;
};

/* ROUTES */

// Get request route to view all recipes
$app->get('/', function(Request $request, Respone $response, array $args){

    // Get all recipes and sort by name
    $recipes = RecipeQuery::create()
    ->orderByName()
    ->find();

    $response = $this->view->render($response, "recipe_list.html", [
            'recipe_list' => $recipes
        ]);

    return $response;

})->setName('recipes');


// Get request route to view a single recipe
$app->get('/{id}', function(Request $request, Respone $response, array $args){

    $recipe_key = (int)$args['id'];

    // Find recipe by primary key
    $recipe = RecipeQuery::create()
    ->findPk($recipe_key);

    // Get steps for recipe
    $recipe_steps = StepsQuery::create()
    ->findByRecipeId($recipe_key);

    $response = $this->view->render($response, "recipe_detail.html", [
        'recipe' => $recipe,
        'steps' => $recipe_steps
    ]);

    return $response;
    
})->setName('recipe-detail');

// Done configuring
$app->run();