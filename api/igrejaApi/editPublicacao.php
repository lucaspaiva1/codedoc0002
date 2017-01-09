<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$IDPublicacao	  = $request->IDPublicacao;
		$tempoPermanencia = $request->TempoPermanencia;
		$comentario   	  = $request->Comentario;
		$linkImagem    	  = $request->LinkImagem;
		$titulo    		  = $request->Titulo;
		$texto			  = $request->Texto;

		if($comentario == true){
			$comentario = 's';
		}else{
			$comentario = 'n';
		}
		
		
		$sql = "SELECT * FROM publicacao WHERE IDPublicacao = '$IDPublicacao'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;		
		
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			$sql = "UPDATE publicacao SET TempoPermanencia = '$tempoPermanencia', Comentario = '$comentario', LinkImagem = '$linkImagem', Titulo = '$titulo', Texto = '$texto' WHERE IDPublicacao = '$IDPublicacao'";
			$con->query($sql);
			echo json_encode(true);
		}
	}
?>