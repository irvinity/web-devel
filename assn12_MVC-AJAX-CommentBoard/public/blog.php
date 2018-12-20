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
	$this->view->render($response, 'post.html');
	return $response;
});

//////////////////////
// AJAX Handlers
//////////////////////

// Validates if a user exists in the db using username and password parameters
$app->post('/validate_user', function ($request, $response, $args){
	
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
				'username_id' => $user->getId(), 
				'username_val' => $user->getUsername());
		else
			$validation = array('username' => true, 'password' => false);

		return $response->withJSON($validation);
	}
});

// Adds a new comment to the db
$app->post('/post_comment', function($request, $response, $args){

	// Get the blog post data from the request body
	$new_blog_post_data = $request->getParams();

	// If the user comment is empty, return empty comment response
	if(empty($new_blog_post_data['user_post'])){
		return $response->withJSON(array('new_post_succes' => false, 'empty_comment' => true));
	}else{
	// Else create a new record in the model with the new post data
		$tmp = new Comment();
		$newComment = $tmp->postNewComment($new_blog_post_data);
		return $response->withJSON(array('new_post_success' => true, 'last_comment_id' => $newComment->getId()));
	}

});

// Get all the comments that exist in the comments model from db
$app->get("/poll_all_blog_comments", function($request, $response, $args){

	// Used to check if any comments exists in the table
	$count = CommentQuery::create()->count();

	// Retrive all records from the comments model
	$comments = CommentQuery::create()
	->join('User')
	->select(array('Id', 'CreateTime', 'Body', 'User.Username'))
	->find()
	->toJson();

	// If found, then return all the objects fetched as a JSON
	if(!$count)
		return $response->withJSON(array('blog_comments_found' => false));
	else
		return $response->withJSON(array('comments' => $comments, 'blog_comments_found' => true));

});
$app->get("/poll_new_blog_comments/{last_comment_id}", function($request, $response, $args){

	// Get all comments that have Id greater than 'last_comment_id'
	$comments = CommentQuery::create()
	->join('User')
	->select(array('Id', 'CreateTime', 'Body', 'User.Username'))
	->filterById(array('min' => $args['last_comment_id']+1))
	->find()
	->toJson();

	// Return the found objects in json format
	return $response->withJSON($comments);
});

//////////////////////
// App run
//////////////////////
$app->run();
