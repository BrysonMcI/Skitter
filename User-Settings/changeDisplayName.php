<?php
 
// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
  
// We only want to deal with GET here
if ($method !== 'POST') {
	http_response_code(405);
	header("Allow: POST");
	exit();
}

// Check Auth
//Did they come from skitter? (Env variable?)
/*
if (!isset($_SERVER['HTTP_REFERER']) || $_SERVER['HTTP_REFERER'] !== "superskitter.com"){
	http_response_code(403);
	exit();
}
*/
//Do they have a valid SessionID
if(!isset($_COOKIE["sid"])){
	http_response_code(403);
	exit();
}
else{
	//Make request to /isAuthenticated
	
	//Is auth will reply with this in the future
	$email = "test@test.org";
}

//They are Authed

// connect to the mysql database
// TODO ENV VARIABLES OR SOMETHING BETTER
$link = mysqli_connect("172.17.0.2", "root", "password", "skitter");

//Check connection
if (mysqli_connect_errno()) {
	http_response_code(500);
    exit();
}

//Prepared statement
if ($stmt = mysqli_prepare($link, "UPDATE users SET username=? WHERE email=?")){
	 //Get user they want
	 $username = $_POST["newUsername"];
	 //Escape input
	 if(!mysqli_set_charset($link, "utf8")){
		http_response_code(500);
		exit();
	 }
	 $username = mysqli_real_escape_string($link, $username);
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