<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 

	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$type         = $request->type;
		$userID 	  = $request->userID;

		if($type == 'logar'){

			$sql = "SELECT * FROM usuario WHERE Facebook = '$userID'";
			$result = $con->query($sql);

			$numrow = $result->num_rows;

			if($numrow == 1){
				$dados = $result->fetch_assoc();
				if($dados['Tentativas'] < 4 && $dados['Banida']==0){

					$sql = "UPDATE usuario SET Tentativas = 0 WHERE Facebook = '$userID'";
					$result = $con->query($sql);
					$dados['connected'] = true;

					echo json_encode($dados);
				}else{
					echo json_encode("inativa");
				}


			}else{

				$result 	  = $request->result;
				$name    	  = $result->name;
				$sexo    	  = $result->gender;
				$url		  = $result->picture->data->url;
					
				if($sexo == "male"){
					$sexo = 'm';
				}else{
					$sexo = 'f';
				}
					
				$sql= "INSERT INTO usuario (Nome, Nascimento, Sexo, URLFoto, Tipo, Facebook) VALUES ('$name', '2017-01-01', '$sexo', '$url', 'c', '$userID')";
				$con->query($sql);

				$sql = "SELECT * FROM usuario WHERE Facebook = '$userID'";
				$result = $con->query($sql);
				$numrow = $result->num_rows;
					
				if($numrow == 1){
					$dados = $result->fetch_assoc();
					$dados['connected'] = true;
					echo json_encode($dados);
				}else{
					echo json_encode(false);
				}
			}

		}else if( $type == 'vincular'){

			$sql = "UPDATE usuario SET Facebook = '$userID' WHERE IDUsuario = '$request->id'";
			$result = $con->query($sql);



			$sql = "SELECT * FROM usuario WHERE IDUsuario = '$request->id'";
			$result = $con->query($sql);
			$dados = $result->fetch_assoc();

			if($dados['URLFoto']=='http://dsoutlet.com.br/igrejaApi/imagens/anonimo.png'){
				$url		  = $request->result->picture->data->url;
				$sql = "UPDATE usuario SET URLFoto = '$userID' WHERE IDUsuario = '$url'";
				$result = $con->query($sql);
			}
			$dados['URLFoto'] = $url;
			$dados['connected'] = true;
				
			echo json_encode($dados);

		}				
	}
	
	$con->close();
?>