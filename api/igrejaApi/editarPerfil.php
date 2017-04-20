<?php
	include 'mySQL.php';
	require 'mySQL.php';
	include 'salvaImagem.php';
?>
<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$id = $request->IDUsuario;
		$email = $request->Email;

		$sql = "SELECT * FROM usuario WHERE Email = '$email'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		if($numrow == 1){
			$sql = "SELECT * FROM usuario WHERE IDUsuario = '$id' AND Email  = '$email'";
			$result = $con->query($sql);
			$numrow = $result->num_rows;
			if($numrow == 1){//email foi mudado ou email novo
				$senha = $request->Senha;
				$nome = $request->Nome;
				$genero = $request->Sexo;
				$foto = $request->URLFoto;
				$nascimento = $request->Nascimento;
				
				$arquivo = 'postImages/'.time().'.jpeg'; //nome do arquivo
				$url = 'http://www.dsoutlet.com.br/igrejaApi/'.$arquivo; //diretório
				base64_to_jpeg($foto, $arquivo);

				if ($senha == ""){
					$sql = "UPDATE usuario SET Nome = '$nome', Nascimento = '$nascimento', Email = '$email', Sexo = '$genero', URLFoto = '$url' WHERE IDUsuario = '$id'";
				} else {
					$sql = "UPDATE usuario SET Nome = '$nome', Nascimento = '$nascimento', Email = '$email', Senha = '$senha', Sexo = '$genero', URLFoto = '$url' WHERE IDUsuario = '$id'";
				}

				$con->query($sql);
				echo json_encode(true);
			}else{
				echo json_encode(false);
			}
		} else{

			$sql = "SELECT * FROM usuario WHERE IDUsuario = '$id'";
			$result = $con->query($sql);
			$numrow = $result->num_rows;

			if($numrow == 1){//email alterado e ja possue um existente
				$senha = $request->Senha;
				$nome = $request->Nome;
				$genero = $request->Sexo;
				$foto = $request->URLFoto;
				$nascimento = $request->Nascimento;
				
				$arquivo = 'postImages/'.time().'.jpeg'; //nome do arquivo
				$url = 'http://www.dsoutlet.com.br/igrejaApi/'.$arquivo; //diretório
				base64_to_jpeg($foto, $arquivo);

				if ($senha == ""){
					$sql = "UPDATE usuario SET Nome = '$nome', Nascimento = '$nascimento', Email = '$email', Sexo = '$genero', URLFoto = '$url' WHERE IDUsuario = '$id'";

				} else {
					$sql = "UPDATE usuario SET Nome = '$nome', Nascimento = '$nascimento', Email = '$email', Senha = '$senha', Sexo = '$genero', URLFoto = '$url' WHERE IDUsuario = '$id'";
				}

				$con->query($sql);
				echo json_encode(true);
			}else{
				echo json_encode(false);
			}
		}
		

	}

?>