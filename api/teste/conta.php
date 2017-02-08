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
                
            if($dados['Bloqueada']==0 && $dados['Banida']==0){
			
			    
                if($numrow == 1){
                    if ($dados['Sexo'] == 'm')
                        $dados['Sexo'] = "Masculino";
                    else if ($dados['Sexo'] == 'f')
                        $dados['Sexo'] = "Feminino";
                    if ($dados['Tipo'] == 'a')
                        $dados['Tipo'] = "Administrador";
                    else if ($dados['Tipo'] == 'c')
                        $dados['Tipo'] = "Comum";
                    
                    $vetor = array();
                        
                    $vetor['id'] = $dados['IDUsuario'];
                    $vetor['nome'] = $dados['Nome'];
                    $vetor['nascimento'] = $dados['Nascimento'];
                    $vetor['email'] = $dados['Email'];
                    $vetor['senha'] = $dados['Senha'];
                    $vetor['genero'] = $dados['Sexo'];
                    $vetor['foto'] = $dados['URLFoto'];
                    $vetor['permissao'] = $dados['Tipo'];
                    $vetor['facebook'] = $dados['Facebook'];
                    $vetor['connected'] = true;


                    $sql = "UPDATE usuario SET Tentativas = 0 WHERE Email = '$email'";
                    $result = $con->query($sql);
                        
                    echo json_encode($vetor);
                } else {

                    $sql = "SELECT * FROM usuario WHERE Email = '$email'";
                    $result = $con->query($sql);

                    $numrow = $result->num_rows;

                    if($numrow == 1){
                        $dados = $result->fetch_assoc();
                        $tentativas = $dados['Tentativas'] + 1;

                        if($tentativas==3){
                            $sql = "UPDATE usuario SET Tentativas = '$tentativas' , Bloqueada = 1 WHERE Email = '$email'";
                            $result = $con->query($sql);
                        }else{
                            $sql = "UPDATE usuario SET Tentativas = '$tentativas' WHERE Email = '$email'";
                            $result = $con->query($sql);
                        }
                        echo json_encode("tentativa");
                    }else{
                        echo json_encode("inexistente");
                    }
                }
			}else{
                echo json_encode("inativa");
            }	
		}else if($type == 'editar'){
            $usuario = $request->usuario;
			$id = $usuario->id;
            

            $sql = "SELECT * FROM usuario WHERE IDUsuario = '$id'";
            $result = $con->query($sql);
            $numrow = $result->num_rows;

            if($numrow == 1){
				$senha = $usuario->senhaatual;
                $email = $usuario->email;
                $nome = $usuario->nome;
                $repSenha = $usuario->repSenha;
                $genero = $usuario->genero;
                $foto = $usuario->foto;
                $nascimento = $usuario->nascimento;
				$linkAntigo = $request->linkAntigo;
				
				//Apaga a imagem antiga
				if(!empty($linkAntigo)){
					$nomeImagem = after_last('/', $linkAntigo);
					$diretorio = 'perfil/'.$nomeImagem;
					if(file_exists($diretorio)){		
						unlink($diretorio);
					}
				}
				
                if ($genero=='Masculino'){
                    $genero='m';
                }else {
                    $genero='f';
                }
				
				if ($senha == ""){
					$sql = "UPDATE usuario SET Nome = '$nome', Nascimento = '$nascimento', Email = '$email', Sexo = '$genero', URLFoto = '$foto' WHERE IDUsuario = '$id'";
				
				} else {
					$sql = "UPDATE usuario SET Nome = '$nome', Nascimento = '$nascimento', Email = '$email', Senha = '$repSenha', Sexo = '$genero', URLFoto = '$foto' WHERE IDUsuario = '$id'";
				}
				
                $con->query($sql);
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