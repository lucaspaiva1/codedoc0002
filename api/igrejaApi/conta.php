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
            $id = $request->id;
            $senha = $request->senhaatual;

            $sql = "SELECT * FROM usuario WHERE IDUsuario = '$id'";
            $result = $con->query($sql);
            $numrow = $result->num_rows;

            if($numrow == 1){
                $email = $request->email;
                $nome = $request->nome;
                $repSenha = $request->repSenha;
                $genero = $request->genero;
                $foto = $request->foto;
                $nascimento = $request->nascimento;
				
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
?>