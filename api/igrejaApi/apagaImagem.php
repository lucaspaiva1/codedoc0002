<?php
	function apagarImagem($link){
	//Apaga a imagem antiga
		if(!empty($link)){
			$nomeImagem = after_last('/', $link);
			$diretorio = 'uploads/'.$nomeImagem;
			if(file_exists($diretorio)){		
				unlink($diretorio);
				//echo 'apagou';
			}else{
				//echo 'nao existe';
			}
		}else{
			//echo 'sem diretorio';
		}
	};
	
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