<?php
 
mysqlpaswd = $_ENV["MYSQL_ROOT_PASSWORD"]

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
  
// We only want to deal with GET here
if ($method !== 'GET') {
	http_response_code(405);
	header("Allow: GET");
	exit();
}

// connect to the mysql database
$link = mysqli_connect("prod_sql", "root", mysqlpaswd, "skitter");

//Check connection
if (mysqli_connect_errno()) {
	http_response_code(500);
    exit();
}

//Prepared statement
if ($stmt = mysqli_prepare($link, "SELECT email, username, photo FROM users WHERE username=?")){
	 //Get user they want
	 $username = $_GET["username"];
	 //Escape input
	 if(!mysqli_set_charset($link, "utf8")){
		http_response_code(500);
		exit();
	 }
	 $username = mysqli_real_escape_string($link, $username);
	 if ($username === NULL){
		http_response_code(500);
		exit();
	 }
	 //Bind parameters
	 mysqli_stmt_bind_param($stmt, "s", $username);
	 //Execute
	 mysqli_stmt_execute($stmt);
	 //Bind result
	 $user = new StdClass;
	 mysqli_stmt_bind_result($stmt, $user->email, $user->username, $user->photo);
	 //Fetch
	 mysqli_stmt_fetch($stmt);
	 //Return result as json
	 if ($user->email === "" || $user->username === ""){
		http_response_code(500);
	 }
	 else {
	 	 $json = json_encode($user);
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