<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$nome    = $request->nome;
		$usersID = $request->ids;
		$sql = "SELECT * FROM grupo WHERE nome = '$nome'";
		
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		if ($numrow == 1){
			echo json_encode(false);
		} else {
			$sql = "INSERT INTO grupo (nome) VALUES ('$nome')";
			$con->query($sql);
			
			$sql = "SELECT * FROM grupo WHERE nome = '$nome'";
			$result = $con->query($sql);
			
			$dado = $result->fetch_assoc();
			
			$grupoID = $dado['ID'];
			
			for ($usersID as $u){
				$sql = "INSERT INTO representagrupo (grupo_ID, usuario_IDUsuario) VALUES ('$grupoID','$u')";
				$con->query($sql);
			}
			
			echo json_encode(true);
		}
		
		$con->close();	
	}
?>