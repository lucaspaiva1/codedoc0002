<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	
    if (isset($_GET['nome'])){
        if ($_GET["nome"] != ""){
            $nome  = $_GET['nome'];
            $nome = utf8_decode($nome);
            $sql = "SELECT * FROM regiao WHERE nome = '$nome'";
            $result = $con->query($sql);

            $num = $result->num_rows;

            if ($num !== 1 && $nome != ''){
                $sql = "INSERT INTO regiao (nome) VALUES ('$nome')";
                $con->query($sql);
                
                echo json_encode($vetor);
            } else {
                $dados = $result->fetch_assoc();
                $id = $dados['ID'];

                $sql = "SELECT usuario_IDUsuario FROM representaregiao WHERE regiao_ID = '$id'";
                $resul = $con->query($sql);

                while($row=$result->fetch_assoc()){
                    $vetor[] = $row['usuario_IDUsuario'];
                }

                echo json_encode($vetor);
            }
        }
    }

	
	
	$con->close();
?>