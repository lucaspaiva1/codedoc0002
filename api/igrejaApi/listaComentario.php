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
				$vetor[] = $row;
			}
			echo json_encode($vetor);
		}
	} 	
?>