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
        $id         = $request->id;

        $sql = "SELECT * FROM usuario WHERE WHERE IDUsuario = '$id'";
        $result = $con->query($sql);
        $dados = $result->fetch_assoc();

		if($type == 'banir'){
            $vetor = array();
            if($dados['Banida'] == 0){
                $sql = "UPDATE usuario SET Banida = 1 WHERE IDUsuario = '$id'";
                $result = $con->query($sql);
                $vetor[] = '1';
            } else{
                $sql = "UPDATE usuario SET Banida = 0 WHERE IDUsuario = '$id'";
                $result = $con->query($sql);
                $vetor[] = '1';

            }
            $vetor[] =true;

            echo json_encode(true);
        } else if($type == 'alterar'){
            $vetor = array();
            if($dados['Tipo'] == 'c'){
                $sql = "UPDATE usuario SET Tipo = 'a' WHERE IDUsuario = '$id'";
                $result = $con->query($sql);
                $vetor[] = 'a';
            } else{
                $sql = "UPDATE usuario SET Tipo = 'c' WHERE IDUsuario = '$id'";
                $result = $con->query($sql);
                $vetor[] = 'c';
            }
            $vetor[] =true;

            echo json_encode(true);
        }
    }
?>