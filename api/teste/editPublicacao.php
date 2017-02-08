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
		$linkAntigo		  = $request->linkAntigo;
		
		//Apaga a imagem antiga
		if(!empty($linkAntigo)){
			$nomeImagem = after_last('/', $linkAntigo);
			$diretorio = 'uploads/'.$nomeImagem;
			if(file_exists($diretorio)){		
				unlink($diretorio);
			}
		}

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
	
	$con->close();
	
	//funcoes para separar string
	function after_last ($this, $inthat)
    {
        if (!is_bool(strrevpos($inthat, $this)))
        return substr($inthat, strrevpos($inthat, $this)+strlen($this));
    };
	
	function strrevpos($instr, $needle)
	{
		$rev_pos = strpos (strrev($instr), strrev($needle));
		if ($rev_pos===false) return false;
		else return strlen($instr) - $rev_pos - strlen($needle);
	};
	
?>