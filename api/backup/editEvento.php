<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$IDEvento			= $request->IDEvento;
		
		$DataInicio		    = $request->DataInicio;
		$DataTermino		= $request->DataTermino;
		$HoraInicio		    = $request->HoraInicio;
		$HoraTermino		= $request->HoraTermino;
		$Titulo			    = $request->Titulo;
		$Descricao			= $request->Descricao;
		$Local			    = $request->Local;
		$Usuario_IDUsuario  = $request->Usuario_IDUsuario;
		$EventoDiario		= $request->EventoDiario;

		$DataInicio = $DataInicio. " ". $HoraInicio;
		$DataTermino = $DataTermino. " ". $HoraTermino;
		
		if($EventoDiario == false){
			$EventoDiario = 0;
		}else{
			$EventoDiario = 1;
		}
		
		$sql = "SELECT * FROM evento WHERE IDEvento = '$IDEvento'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;		
		
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			$sql = "UPDATE evento SET DataInicio='$DataInicio', DataTermino='$DataTermino', Titulo='$Titulo', Descricao='$Descricao', Local='$Local', Usuario_IDUsuario='$Usuario_IDUsuario', EventoDiario='$EventoDiario' WHERE IDEvento = '$IDEvento'";
			$con->query($sql);
			echo json_encode(true);
		}
	}
?>