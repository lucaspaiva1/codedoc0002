<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php
	$vetor   = array();
    $the_request = &$_GET;

    if( isset($_GET["usersAll"])){
        $sql = "SELECT IDUsuario, Nome, Email, Tipo, URLFoto, Sexo, Nascimento, Banida FROM usuario ORDER BY Nome";
		$result = $con->query($sql);
        while($row=$result->fetch_assoc()){
			$vetor[] = $row;
		}
		echo json_encode($vetor);
    }
?>