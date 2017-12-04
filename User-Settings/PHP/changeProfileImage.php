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
// TODO ENV VARIABLES OR SOMETHING BETTER
$link = mysqli_connect("prod_sql", "root", $mysqlpaswd, "skitter");

//Check connection
if (mysqli_connect_errno()) {
	http_response_code(500);
    exit();
}

//Prepared statement
if ($stmt = mysqli_prepare($link, "UPDATE users SET photo=? WHERE email=?")){
	 //Get user they want, they better send it as binary
	 $filename = $_FILES['photo']['name'];
	 $filedata = $_FILES['photo']['tmp_name'];
	 $filesize = $_FILES['photo']['size'];

	 $blob = base64_encode(fread(fopen($filedata, 'rb'), 16000000));

	 $finfo = new finfo(FILEINFO_MIME_TYPE);
	 if (false === $ext = array_search(
        $finfo->file($_FILES['photo']['tmp_name']),
        array(
            'jpg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
        ),
        true
     )) {
        http_response_code(400);
		exit();
     }

	 if (!isset($_FILES['photo']['name']) || $filesize/1000000 > 16){
	 	 http_response_code(400);
		 exit();
	 }
	 //Escape input
	 if(!mysqli_set_charset($link, "utf8")){
		http_response_code(500);
		exit();
	 }
	 $email = mysqli_real_escape_string($link, $email);
	 if ($email === NULL){
		http_response_code(500);
		exit();
	 }
	 //Bind parameters
	 mysqli_stmt_bind_param($stmt, "ss", $blob, $email);
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