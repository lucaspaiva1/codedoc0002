<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 

	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		
		$id = json_decode($postdata);

        $sql = "SELECT * FROM usuario WHERE IDUsuario = '$id'";
        $result = $con->query($sql);
        $numrow = $result->num_rows;
        $dados = $result->fetch_assoc();
        echo json_encode($dados);
		
    }
	$con->close();
?>