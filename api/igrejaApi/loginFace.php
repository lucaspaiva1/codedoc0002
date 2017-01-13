<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 

	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$userID 	  = $request->userID;
		$result 	  = $request->result;
		$name    	  = $result->name;	
		$sexo    	  = $result->gender;
		$birthday 	  = $result->birthday;
		$email		  = $result->email;
		$url		  = $result->picture->data->url;

		$sql = "SELECT * FROM usuario WHERE Facebook = '$userID'";
		$result = $con->query($sql);

		$numrow = $result->num_rows;
		
		if($numrow == 1){
			echo json_encode(true);
		}else{
			
			if($sexo == "male"){
				$sexo = 'm';
			}else{
				$sexo = 'f';
			}
			
			$sql= "INSERT INTO usuario (Nome, Nascimento, Email, Sexo, URLFoto, Tipo, Facebook) VALUES ('$name', '2017-01-01', '$email', '$sexo', '$url', 'c', '$userID')";	
			$con->query($sql);
			
			$sql = "SELECT * FROM usuario WHERE Facebook = '$userID'";
			$result = $con->query($sql);

			$numrow = $result->num_rows;
			
			if($numrow == 1){
				echo json_encode(true);
			}else{
				echo json_encode(false);
			}
		}				
	}
?>