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
			$dados = $result->fetch_assoc();
				
			if ($dados['Sexo'] == 'm')
				$dados['Sexo'] = "Masculino";
			else if ($dados['Sexo'] == 'f')
				$dados['Sexo'] = "Feminino";
				
			if ($dados['Tipo'] == 'a')
				$dados['Tipo'] = "Administrador";
			else if ($dados['Tipo'] == 'c')
				$dados['Tipo'] = "Comum";
			
			$vetor = array();
				
			$vetor['nome'] = $dados['Nome'];
			$vetor['nascimento'] = $dados['Nascimento'];
			$vetor['email'] = $dados['Email'];
			$vetor['genero'] = $dados['Sexo'];
			$vetor['foto'] = $dados['URLFoto'];
			$vetor['permissao'] = $dados['Tipo'];
			$vetor['facebook'] = $dados['Facebook'];
			$vetor['connected'] = true;
				
			echo json_encode($vetor);
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
				$dados = $result->fetch_assoc();
				
				if ($dados['Sexo'] == 'm')
					$dados['Sexo'] = "Masculino";
				else if ($dados['Sexo'] == 'f')
					$dados['Sexo'] = "Feminino";
					
				if ($dados['Tipo'] == 'a')
					$dados['Tipo'] = "Administrador";
				else if ($dados['Tipo'] == 'c')
					$dados['Tipo'] = "Comum";
				
				$vetor = array();
					
				$vetor['nome'] = $dados['Nome'];
				$vetor['nascimento'] = $dados['Nascimento'];
				$vetor['email'] = $dados['Email'];
				$vetor['genero'] = $dados['Sexo'];
				$vetor['foto'] = $dados['URLFoto'];
				$vetor['permissao'] = $dados['Tipo'];
				$vetor['facebook'] = $dados['Facebook'];
				$vetor['connected'] = true;
					
				echo json_encode($vetor);
			}else{
				echo json_encode(false);
			}
		}				
	}
?>