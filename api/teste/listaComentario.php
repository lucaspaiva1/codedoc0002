<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 

	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		if ($_GET["id"] != ""){
			$id = $_GET["id"];
			$sql = "SELECT * FROM comentario WHERE Publicacao_IDPublicacao = '$id'";
			$result = $con->query($sql);
			while($row=$result->fetch_assoc()){
				$userId = $row['Usuario_IDUsuario'];
					
				$sql = "SELECT * FROM usuario WHERE IDUsuario = '$userId'";
				$result2 = $con->query($sql);
					
				$row2 = $result2->fetch_assoc();
					
				$nome = $row2['Nome'];
				$fotoPerfil = $row2['URLFoto'];
					
				$row['username'] = $nome;
				$row['URLFoto'] = $fotoPerfil;
					
				$vetor[] = $row;
			}
			echo json_encode($vetor);
		}
	} 	
	
	$con->close();
?>