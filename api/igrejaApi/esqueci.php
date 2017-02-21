<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php 
	$vetor   = array();
	$the_request = &$_GET;
	
	if (isset($_GET["email"]) && $_GET["email"] != ""){
		$email = $_GET["email"];
		
		$sql = "SELECT * FROM usuario WHERE Email = '$email'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
		
		if ($num_rows !== 1){
			echo json_encode(false);
		} else {
			$dados = $result->fetch_assoc();
			$nome  = $dados->Nome;
			$senha = $dados->Senha;
			$assunto = "Setor Juventude - RECUPERAR SENHA";
			
			$mensagem = "";
			
			$header = "MIME-Version: 1.0\n";
			$header .= "Content-type: text/html; charset=UTF-8 charset=iso-8859-1\n";
			$header .= "FROM: no-reply@dsoutlet.com\n";
			
			mail($email, $assunto, $mensagem, $header);
			echo json_encode(true);
		}
	}
	
	$con->close();
?>