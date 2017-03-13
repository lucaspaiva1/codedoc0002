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
		
		$sql = "SELECT * FROM regiao WHERE nome = '$nome'";
		
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		if ($numrow !== 1){
			echo json_encode(false);
			
		} else {
			$dados = $result->fetch_assoc();
			
            $id = $dados['ID'];

			if ($nome != $dados['nome'] && $nome != ''){
				$sql = "UPDATE regiao SET nome = '$nome' WHERE ID = '$id'";
				$con->query($sql);
			}
			
			$sql = "DELETE FROM representaregiao WHERE regiao_ID = '$id'";
			$con->query($sql);
				
			foreach ($usersID as $u){
				$sql = "INSERT INTO representaregiao (regiao_ID, usuario_IDUsuario) VALUES ('$id','$u')";
				$con->query($sql);
			}
			
			echo json_encode(true);
		}
		
		$con->close();	
	}
?>