<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	
	if (isset($_GET["id"])){
		if ($_GET["id"] == ""){
			$sql = "SELECT * FROM grupo";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$vetor[] = $row;
			}
			echo json_encode($vetor);
		}else{
			$id = $_GET["id"];
			$sql = "SELECT usuario_IDUsuario from representagrupo where grupo_ID = '$id'";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$vetor[] = $row['usuario_IDUsuario'];
			}
			echo json_encode($vetor);
		}
	}
	
	$con->close();
?>