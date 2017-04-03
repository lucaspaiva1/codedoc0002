<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 

	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		if ($_GET["id"] == ""){
			$sql = "SELECT * FROM publicacao ORDER BY IDPublicacao DESC";
			$result = $con->query($sql);
			while($row=$result->fetch_assoc()){
				if($row['Comentario'] == 'n'){
					$row['Comentario'] = false;
				}else {
					$row['Comentario'] = true;
				}
				$vetor[] = $row;
			}
			echo json_encode($vetor);
		}else{
			$id = $_GET["id"];
			$sql = "SELECT * FROM publicacao WHERE IDPublicacao = '$id'";
			$result = $con->query($sql);
				
			$row = $result->fetch_assoc();
			
			if($row['Comentario'] == 'n'){
				$row['Comentario'] = false;
			}else {
				$row['Comentario'] = true;
			}
			
			echo json_encode($row);	
		}
	}
	$con->close();		
?>