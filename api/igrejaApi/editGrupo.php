<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$id      = $request->id;
		$nome    = $request->nome;
		$usersID = $request->ids;
		
		$sql = "SELECT * FROM grupo WHERE ID = '$id'";
		
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		if ($numrow !== 1){
			echo json_encode(false);
			
		} else {
			$dados = $result->fetch_assoc();
			
			if ($nome != $dados['nome'] && $nome != ''){
				$sql = "UPDATE grupo SET nome = '$nome' WHERE ID = '$id'";
				$con->query($sql);
			}
			
			$sql = "DELETE FROM representagrupo WHERE grupo_ID = '$id'";
			$con->query($sql);
				
			foreach ($usersID as $u){
				$sql = "INSERT INTO representagrupo (grupo_ID, usuario_IDUsuario) VALUES ('$id','$u')";
				$con->query($sql);
			}
			
			echo json_encode(true);
		}
		
		$con->close();	
	}
?>