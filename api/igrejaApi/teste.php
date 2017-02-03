<?php 
$linkAntigo = 'http://www.dsoutlet.com.br/igrejaApi/perfil/1486092243164.jpg';
//Apaga a imagem antiga
				if(!empty($linkAntigo)){
					$nomeImagem = after_last('/', $linkAntigo);
					$diretorio = 'perfil/'.$nomeImagem;
					if(file_exists($diretorio)){		
						unlink($diretorio);
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