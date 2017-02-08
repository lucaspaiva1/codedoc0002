<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$id = $request->id;
		
		$sql = "SELECT * FROM publicacao WHERE IDPublicacao = '$id'";
		$result = $con->query($sql);
		$row=$result->fetch_assoc();
		
		$linkImagem = $row['LinkImagem'];
				
		$numrow = $result->num_rows;
		
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			$sql = "DELETE FROM publicacao WHERE IDPublicacao = '$id'";
			$con->query($sql);
			
			//Apaga a imagem antiga
			if(!empty($linkImagem)){
				$nomeImagem = after_last('/', $linkImagem);
				$diretorio = 'uploads/'.$nomeImagem;
				if(file_exists($diretorio)){		
					unlink($diretorio);
				}
			}
			echo json_encode(true);
		}
	}
	
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