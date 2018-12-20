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

/* AJAX handlers */

// This route updates the name of a recipe entry
$app->post('/handlers/edit_recipe/{rid}/{recipe}', function($request, $response, $args){

    $recipe = RecipeQuery::create()
    ->findPk($args['rid']);

    $recipe->setName($args['recipe']);
    $recipe->save();

});

// This route updates a step description for a recipe
$app->post('/handlers/edit_recipe_step/{rid}/{rstep}/{step}', function($request, $response, $args){

    // Get recipe step & update description
    $step = StepsQuery::create()
    ->filterByRecipeId($args['rid'])
    ->filterByStepNumber($args['rstep'])
    ->update(array('Description' => $args['step']));

});

// This route adds a new step to a recipe list
$app->post('/handlers/add_step/{rid}/{rstep}/{step}', function($request, $response, $args){

    // Add the step
    $step = new Steps();
    $step->setStepNumber($args['rstep']);
    $step->setDescription($args['step']);
    $step->setRecipeId($args['rid']);
    $step->save();

    // Debug
    return $response->getBody()->write($step);

});

// This routes updates the new step numbers in the list
$app->post('/handlers/update_steps/{rid}', function($request, $response, $args){

    // Get json object
    $post = $request->getParsedBody();
    $json = $post['steps'];
    echo $json;

    // Decode json object
    $d = json_decode($json);

    // Get keys
    $rdesc = get_object_vars($d);

    // All steps for recipe with id 'rid'
    $steps = StepsQuery::create()
    ->filterByRecipeId($args['rid'])
    ->find();

    $i = 0;
    foreach($steps as $x){
        $x->setDescription($rdesc[$i]);
        $x->save();
        $i = $i + 1;
    }
});

// Done configuring
$app->run();