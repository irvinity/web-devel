<?php
require '../vendor/autoload.php';
require '../generated-conf/config.php';

//////////////////////
// Slim Setup
//////////////////////

$settings = ['displayErrorDetails' => true];

$app = new \Slim\App(['settings' => $settings]);

$container = $app->getContainer();
$container['view'] = function($container) {
	$view = new \Slim\Views\Twig('../templates');
	
	$basePath = rtrim(str_ireplace('index.php', '', 
	$container->get('request')->getUri()->getBasePath()), '/');

	$view->addExtension(
	new Slim\Views\TwigExtension($container->get('router'), $basePath));
	
	return $view;
};

//////////////////////
// Routes
//////////////////////

// home page route
$app->get('/', function ($request, $response, $args) {
	$this->view->render($response, 'home.html');
	return $response;
});
// Test route
$app->get('/test', function($request, $response, $args){
	$newUser = new User();
	$newUser->setUsername("irvinity");
	$newUser->setPasswordHash($newUser->setPassword("vigenere"));
	$newUser->save();

	$newUser = new User();
        $newUser->setUsername("joker_");
        $newUser->setPasswordHash($newUser->setPassword("1sorcerer0"));
        $newUser->save();

	$newUser = new User();
        $newUser->setUsername("xplosive");
        $newUser->setPasswordHash($newUser->setPassword("b3rlin"));
        $newUser->save();

	$user = UserQuery::create()
	->filterByUserName("irvinity")
	->find();
	if($newUser->login("b3rlin"))
		echo "<br>Valid user<br>";			

	return $response->getBody()->write($user);
});
//////////////////////
// AJAX Handlers
//////////////////////
$app->post('/login', function ($request, $response, $args){
	
	// Get the request body parameters
	$identity = $request->getParams();

	// Check if username exist in the database
	$entity = new User();
	$user = $entity->checkUser($identity);

	// If username was not found, return wrong username response.
	if(empty($user)){
		return $response->withJSON(array('username' => false));
	}else{
	// Else, check the input password for that username

		// If input password matches the hash password, return valid user response.
		// Else return wrong password response.
		if($user->login($identity['password']))
			$validation = array(
				'username' => true, 
				'password' => true, 
				'username_val' => $user->getUsername(), 
				'password_hash' => $user->getPasswordHash());
		else
			$validation = array('username' => true, 'password' => false);

		return $response->withJSON($validation);
	}
});

//////////////////////
// App run
//////////////////////
$app->run();
