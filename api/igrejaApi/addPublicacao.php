<?php
	include 'mySQL.php';
	require 'mySQL.php';
	include 'salvaImagem.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$tempoPermanencia = $request->TempoPermanencia;
		$comentario   	  = $request->Comentario;
		$linkImagem    	  = $request->LinkImagem;
		$titulo    		  = $request->Titulo;
		$texto			  = $request->Texto;
		$usuarioID		  = $request->Usuario_IDUsuario;
		
		$arquivo = 'postImages/'.time().'.jpeg'; //nome do arquivo
		$url = 'http://www.dsoutlet.com.br/igrejaApi/'.$arquivo; //diretório
		base64_to_jpeg($linkImagem, $arquivo);
		
		if($comentario == true){
			$comentario = 's';
		}else{
			$comentario = 'n';
		}

		date_default_timezone_set('America/Bahia');
		$dataPublicacao = date('Y-m-d H:i:s');
		
		
		$sql = "INSERT INTO publicacao (DataPublicacao, TempoPermanencia, Comentario, LinkImagem, Titulo, Texto, Usuario_IDUsuario) VALUES ('$dataPublicacao', '$tempoPermanencia', '$comentario', '$url', '$titulo', '$texto', '$usuarioID')";
		$con->query($sql);
					
			
		$sql = "SELECT * FROM publicacao WHERE DataPublicacao = '$dataPublicacao'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
		
		if($numrow !== 1){
			echo json_encode($linkImagem);
		}else{
			//apagando no banco de dados
			$sql = "delete from publicacao where TempoPermanencia <= CURRENT_DATE;";
			$result = $con->query($sql);
			
			echo json_encode(true);
		}
				
	}
	
	$con->close();
?>