<?php
include 'mySQL.php';
require 'mySQL.php';
?>

<<<<<<< HEAD
<?php
$vetor   = array();
$the_request = &$_GET;

if (isset($_GET["email"]) && $_GET["email"] != ""){
	$email = $_GET["email"];

	$sql = "SELECT * FROM usuario WHERE Email = '$email'";
	$result = $con->query($sql);

	$numrow = $result->num_rows;

	if ($numrow !== 1){
		echo json_encode(false);
	} else {
		$dados = $result->fetch_assoc();
		$nome  = $dados['Nome'];
		$senha = $dados['Senha'];
		$assunto = "Setor Juventude - RECUPERAR SENHA";

		$mensagem = "<!DOCTYPE html>
=======
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	
	if (isset($_GET["email"]) && $_GET["email"] != ""){
		$email = $_GET["email"];
		
		$sql = "SELECT * FROM usuario WHERE Email = '$email'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
		
		if ($numrow !== 1){
			echo json_encode(false);
		} else {
			$dados = $result->fetch_assoc();
			$nome  = $dados['Nome'];
			$senha = $dados['Senha'];
			$assunto = "Setor Juventude - RECUPERAR SENHA";
			
			$mensagem = "<!DOCTYPE html>
>>>>>>> d68b1d14a2f08a6d72e1973e4187708cc3424acf
				<html>
				<head>
				    <meta charset='utf-8'>
				    <title>Email de Recuperação</title>
				    <style media='screen'>
				        .header {
							color: white;
				            border-top-left-radius: 5px;
				            border-top-right-radius: 5px;
				            background-color: #FF9900	;
				            padding: 10px;
				            text-align: center;
				        }
				        .body {
				            border-top-width: thin;
				            border-top-style: solid;
				            border-bottom-width: thin;
				            border-bottom-style: solid;
				            border-color: #e6e6e6;
				            padding: 20px;
				            font-family: Arial;
				        }
				        .link {
				            color: black;
				            text-decoration: none;
				        }
				        .dados {
				            color: white;
				            border-radius: 5px;
				            background-color: #FF6600;
				            padding-top: 20px;
				            padding-bottom: 20px;
				            padding-left: 5px;
				            width: 50%;
				        }
				    </style>
				</head>
				<body style='width: 500px'>
				    <header class='header'>
				        <center> <h2> <b> Setor Juventude </b> </center>
				    </header>
				    <div class='body'>
				        <h3>Olá $nome,</h3>
				        <p>Foi solicitado recentemente a recuperação dos dados de acesso ao gerenciador <b> Setor Juventude </b>.</p>
				        <br> Seguem os dados:
				        <br><br>
				        <div class='dados'>
				            <b style='margin-right: 5px;'>Email:</b>$email
				            <br>
				            <b style='margin-right: 16px;'>Senha:</b>$senha
				        </div>
				        <br><br>
				        <b style='color: #4b4b4b'>Não solicitou esta Recuperação?</b>
				        <p style='font-size: 14px'>Se você não solicitou a recuperação dos dados ignore esta mensagem.</p>
				    </div>
				    <p style='font-size: 10px; color:#616161; font-family: Arial; margin-left: 5px'>Essa mensagem foi enviada para $email a seu pedido. <br> Este e-mail é automático e não é necessário respondê-lo.
				    </p>
				</body>
				</html>";

		$header = "MIME-Version: 1.0\n";
		$header .= "Content-type: text/html; charset=UTF-8 charset=iso-8859-1\n";
		$header .= "FROM: nao-responda@setorjuventude.com\n";

		mail($email, $assunto, $mensagem, $header);
		echo json_encode(true);
	}
}

$con->close();
?>