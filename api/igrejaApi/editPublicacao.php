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
		
		$IDPublicacao	  = $request->IDPublicacao;
		$tempoPermanencia = $request->TempoPermanencia;
		$comentario   	  = $request->Comentario;
		$linkImagem    	  = $request->LinkImagem;
		$titulo    		  = $request->Titulo;
		$texto			  = $request->Texto;
		
		$arquivo = 'postImages/'.time().'.jpeg'; //nome do arquivo
		$url = 'http://www.dsoutlet.com.br/igrejaApi/'.$arquivo; //diretório
		base64_to_jpeg($linkImagem, $arquivo);

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
			$sql = "UPDATE publicacao SET TempoPermanencia = '$tempoPermanencia', Comentario = '$comentario', LinkImagem = '$url', Titulo = '$titulo', Texto = '$texto' WHERE IDPublicacao = '$IDPublicacao'";
			$con->query($sql);
			echo json_encode(true);
		}
	}
	
	$con->close();	
?>