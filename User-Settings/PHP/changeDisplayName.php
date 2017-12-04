<?php

$mysqlpaswd = $_ENV["MYSQL_ROOT_PASSWORD"];

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
  
// We only want to deal with GET here
if ($method !== 'POST') {
	http_response_code(405);
	header("Allow: POST");
	exit();
}

$email = $_POST["email"];

//They are Authed

// connect to the mysql database
$link = mysqli_connect("prod_sql", "root", $mysqlpaswd, "skitter");

//Check connection
if (mysqli_connect_errno()) {
	http_response_code(500);
    exit();
}

//Set charset
if(!mysqli_set_charset($link, "utf8")){
		http_response_code(500);
		exit();
}
//Get user they want
$username = $_POST["newUsername"];
if (!isset($_POST["newUsername"])){
	http_response_code(400);
    exit();
}
$username = mysqli_real_escape_string($link, $username);
//Check if their username is taken
if ($stmt = mysqli_prepare($link, "SELECT username FROM users WHERE username=?")){

	 //Bind parameters
	 mysqli_stmt_bind_param($stmt, "s", $username);
	 //Execute
	 $success = mysqli_stmt_execute($stmt);
	 //Bind result
	 mysqli_stmt_bind_result($stmt, $result);
	 //Fetch
	 if (mysqli_stmt_fetch($stmt)){
		echo '{"error": "Duplicate Username"}';
		exit();
	 }

}

//Prepared statement
if ($stmt = mysqli_prepare($link, "UPDATE users SET username=? WHERE email=?")){
	 
	 //Escape input
	 $email = mysqli_real_escape_string($link, $email);
	 if ($username === NULL || $email === NULL){
		http_response_code(500);
		exit();
	 }
	 //Bind parameters
	 mysqli_stmt_bind_param($stmt, "ss", $username, $email);
	 //Execute
	 $success = mysqli_stmt_execute($stmt);

	 //Return result as json
	 if (!$success){
		http_response_code(500);
	 }
	 else {
	 	 $json = json_encode($success);
		 if(json_last_error()){
			http_response_code(500);
			exit();
		 }
		 echo $json;
	 }
	 //Close Statement
	 mysqli_stmt_close($stmt);
}

// close mysql connection
mysqli_close($link);
?>