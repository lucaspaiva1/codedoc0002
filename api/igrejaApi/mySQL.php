<?php
	
	
    header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Content-Type: application/json; charset=UTF-8");

	$hostname = "localhost";
	$username = "igrejaadm";
	$password = "igrejaadm123";
	$database = "appigreja";
	//conectando ao banco
	$con = mysqli_connect($hostname, $username, $password, $database) or die (mysqli_error());
?>