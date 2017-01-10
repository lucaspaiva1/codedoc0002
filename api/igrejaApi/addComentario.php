<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$texto			  = $request->Texto;
		$usuarioID		  = $request->Usuario_IDUsuario;
		$postID			  = $request->Publicacao_IDPublicacao;
		
		$sql = "INSERT INTO comentario (Texto, Usuario_IDUsuario, Publicacao_IDPublicacao) VALUES ('$texto', '$usuarioID', '$postID')";
		$con->query($sql);
					
		echo json_encode(true);		
	}
?>