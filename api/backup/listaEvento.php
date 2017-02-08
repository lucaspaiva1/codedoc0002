<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 

	$vetor   = array();
	$the_request = &$_GET;
	
	if (isset($_GET["id"])){
		if ($_GET["id"] == ""){
			
			$sql = "SELECT * FROM evento";
			$result = $con->query($sql);
			
			while($row=$result->fetch_assoc()){
				if($row['EventoDiario'] == 0){
					$row['EventoDiario'] = false;
				}else{
					$row['EventoDiario'] = true;
				}
				$vetor[] = $row;
			}
			
			echo json_encode($vetor);
			
		}else{
			$id = $_GET["id"];
			$sql = "SELECT * FROM evento WHERE IDEvento = '$id'";
			$result = $con->query($sql);
				
			$row = $result->fetch_assoc();
				
			$numrow = $result->num_rows;

			if($numrow !== 0){
				
				$inicio = explode(" ", $row['DataInicio']);
				$inicio[0]; //DataInicio
				$inicio[1]; //HoraInicio
				
				$row['DataInicio'] = $inicio[0];
				$row['HoraInicio'] = $inicio[1];
				
				$termino = explode(" ", $row['DataTermino']);
				$termino[0]; //DataTermino
				$termino[1]; //HoraTermino
				
				$row['DataTermino'] = $termino[0];
				$row['HoraTermino'] = $termino[1];
				
				if($row['EventoDiario'] == 0){
					$row['EventoDiario'] = false;
				}else{
					$row['EventoDiario'] = true;
				}
			}		
				
			echo json_encode($row);
			
		}
	} 	
?>