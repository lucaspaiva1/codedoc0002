<?php
	include 'mySQL.php';
	require 'mySQL.php';
	include 'apagaImagem.php';
?>
<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$id = $request->id;
		
        $sql = "SELECT * FROM usuario WHERE IDUsuario = '$id'";
        $result = $con->query($sql);
        $numrow = $result->num_rows;
        if($numrow == 1){
			$senha = $request->senha;
            $email = $request->email;
            $nome = $request->nome;
            $genero = $request->genero;
            $foto = $request->foto;
            $nascimento = $request->nascimento;
			$linkAntigo = $request->linkAntigo;
							
			//Apaga a imagem antiga
			apagarFotoPerfil($linkAntigo);
				
            if ($genero=='Masculino'){
                $genero='m';
            }else {
                $genero='f';
            }
				
			if ($senha == ""){
				$sql = "UPDATE usuario SET Nome = '$nome', Nascimento = '$nascimento', Email = '$email', Sexo = '$genero', URLFoto = '$foto' WHERE IDUsuario = '$id'";
				
			} else {
				$sql = "UPDATE usuario SET Nome = '$nome', Nascimento = '$nascimento', Email = '$email', Senha = '$senha', Sexo = '$genero', URLFoto = '$foto' WHERE IDUsuario = '$id'";
			}
			
            $con->query($sql);
			echo json_encode(true);
        }else{
			echo json_encode(false);
        }
	}
	
	$con->close();

?>