<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$id = $request->id;
		
		
		$sql = "DELETE  FROM comentario WHERE IDComentario = '$id'";
		$con->query($sql);
		$con->close();
		echo json_encode(true);
	}
?>