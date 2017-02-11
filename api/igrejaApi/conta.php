<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 

	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$type         = $request->type;
		
		if($type == 'logar'){

            $email = $request->email;
            $senha = $request->senha;

			$sql = "SELECT * FROM usuario WHERE Email = '$email' AND Senha = '$senha'";
			$result = $con->query($sql);
            $numrow = $result->num_rows;
			$dados = $result->fetch_assoc();
                

            if($numrow == 1){

                if($dados['Tentativas'] < 4 && $dados['Banida']==0){

                    $dados['connected'] = true;

                    $sql = "UPDATE usuario SET Tentativas = 0 WHERE Email = '$email'";
                    $result = $con->query($sql);

                    echo json_encode($dados);

                }else{
                    echo json_encode("inativa");
                }



                } else {

                    $sql = "SELECT * FROM usuario WHERE Email = '$email'";
                    $result = $con->query($sql);
                    $numrow = $result->num_rows;

                    if($numrow == 1){

                        $dados = $result->fetch_assoc();
                        if($dados['Tentativas'] < 4 && $dados['Banida']==0){

                            $tentativas = $dados['Tentativas'] + 1;
                            $sql = "UPDATE usuario SET Tentativas = '$tentativas' WHERE Email = '$email'";
                            $result = $con->query($sql);

                            echo json_encode("tentativa");

                        }else{
                            echo json_encode("inativa");
                        }

                    }else{
                        echo json_encode("inexistente");
                    }
                }

		} else if ($type == 'cadastro'){

            $nome 	      = $request->Nome;
            $nascimento   = $request->Nascimento;
            $genero    	  = $request->Genero;
            $email   	  = $request->Email;
            $senha		  = $request->Senha;
            $foto         = 'http://dsoutlet.com.br/igrejaApi/imagens/anonimo.png';

            $sql= "INSERT INTO usuario (Nome, Nascimento, Sexo, URLFoto, Tipo, Email, Senha) VALUES ('$nome', '$nascimento', '$genero', '$foto', 'c', '$email', '$senha')";
            $con->query($sql);

            $sql = "SELECT * FROM usuario WHERE Email = '$email'";
            $result = $con->query($sql);
            $numrow = $result->num_rows;
            if($numrow == 1){
                echo json_encode(true);
            }else{
                echo json_encode(false);
            }
        }

    }
	
	$con->close();
	
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