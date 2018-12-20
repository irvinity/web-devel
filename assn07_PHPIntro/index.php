
<!-- saved from url=(0086)https://faculty.utrgv.edu/emmett.tomai/courses/3342/assignments/php/php_exercises.html -->
<html>
</head>
	<title>PHP Basics</title>
</head>

<body>

	<h1>PHP Exercises</h1>

	<p>Edit this file and upload to the repo here:</p>

	<pre>https://classroom.github.com/a/C30qbA_J</pre>

	<h3>Question 1</h3>

	<p>Put the current date and time right here: <?php date_default_timezone_set('America/Chicago'); $today = date('D F j, Y, h:i a'); echo $today; ?></p>
	<h3>Question 2</h3>

	<p>Print the IP address of the client browser right here: <?php echo $_SERVER['REMOTE_ADDR']; ?></p>

	<h4>Question 3</h4>

	<p>Create an associative array of your favorite things and print them out like so:</p>

	<?php 
		$fave_things = [
			0 => [
				"title" => "Reading",
				"desc" => "reading made you super cool in 1650",
				"reasons" => [
					1 => "it's cool",
					2 =>  "try it",
					3 => "ayee"
				]
			],
			1 => [
				"title" => "Running",
				"desc" => "run against the wind",
				"reasons" => [
					1 => "fresh air",
					2 =>  "feel healthy",
					3 => "run forever"
				]
			]
		]
	?>
	<?php foreach($fave_things as $key => $value): ?>
		<div style="border:1px solid black; padding: 5px; width: 50%; margin: 5px">
			<p><strong><?php echo $fave_things[$key]['title']; ?></strong></p>
			<p><em><?php echo $fave_things[$key]['desc']; ?></em></p>
			<p>Because...</p>
			<ol>
				<li><?php echo $fave_things[$key]['reasons'][1]; ?></li>
				<li><?php echo $fave_things[$key]['reasons'][2]; ?></li>
				<li><?php echo $fave_things[$key]['reasons'][3]; ?></li>
			</ol>
		</div>
	<?php endforeach; ?>

	<h3>Question 4</h3>

	<p>The link below comes back to this same page, with a querystring added to the URL.</p>

	<p>Finish the question (answer only appears when you click on the link):</p>

	<p>
		<a href="?n1=14&amp;n2=16">14 + 16 =  
		<?php 
			parse_str($_SERVER['QUERY_STRING'], $output); 
			if(!empty($output))
				echo $output['n1'] + $output['n2']; 
		 ?>
		</a>
	</p>


	<h3>Question 5</h3>

	<p>The form below POSTs back to this page (empty action). When the POST comes
	in, reverse whatever they typed in the box.</p>

	<form action="" method="POST">
		<p>My nickname: <input type="textbox" name="nickname"></p>
		<button>Reverse it</button>
	</form>
	<?php if(isset($_POST['nickname'])): ?>
		<p>Nickname: <strong><?php echo $_POST['nickname']; ?></strong></p>
		<p>Nickname reversed: <strong><?php echo strrev($_POST['nickname']); ?></strong></p>
	<?php endif; ?>

</body>
</html>