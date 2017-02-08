<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php
	$vetor   = array();
    $the_request = &$_GET;

    if( isset($_GET["usersAll"])){
        $sql = "SELECT IDUsuario as id, Nome as nome, Email as email, Tipo as permissao , URLFoto as foto, Sexo as genero, Nascimento as nascimento FROM usuario ORDER BY Nome";
		$result = $con->query($sql);
        while($row=$result->fetch_assoc()){
			$vetor[] = $row;
		}
		echo json_encode($vetor);
    }
?>