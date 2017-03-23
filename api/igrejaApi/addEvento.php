<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$DataInicio		    = $request->DataInicio;
		$DataTermino		= $request->DataTermino;
		$HoraInicio		    = $request->HoraInicio;
		$HoraTermino		= $request->HoraTermino;
		$Titulo			    = $request->Titulo;
		$Descricao			= $request->Descricao;
		$Local			    = $request->Local;
		$Usuario_IDUsuario  = $request->Usuario_IDUsuario;
		$EventoDiario		= $request->EventoDiario;

		if($HoraInicio !== null){
            $DataInicio = $DataInicio. " ". $HoraInicio;
            $DataTermino = $DataTermino. " ". $HoraTermino;
		}else{
            $DataInicio = $DataInicio. " 00:00:00";
            $DataTermino = $DataTermino. " 00:00:00";
		}
		
		if($EventoDiario == false){
			$EventoDiario = 0;
		}else{
			$EventoDiario = 1;
		}
		
		if($Titulo !== ""){
			$sql = "INSERT INTO evento (DataInicio, DataTermino, Titulo, Descricao, Local, Usuario_IDUsuario, EventoDiario) VALUES ('$DataInicio', '$DataTermino', '$Titulo', '$Descricao', '$Local', '$Usuario_IDUsuario', '$EventoDiario')";
			$con->query($sql);
			echo json_encode(true);
		}
		
	}
?>