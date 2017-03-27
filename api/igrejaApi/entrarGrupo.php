<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php

	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");

	if (isset($postdata)){
		$request = json_decode($postdata);

		$userID  = $request->id;
		$groupID = $request->IDGrupo;

    $sql = "SELECT * FROM grupo WHERE ID = '$groupID'";
    $result = $con->query($sql);

    $num = $result->num_rows;

    if ($num !== 1){
      echo json_encode(false);
    } else {
      $sql = "INSERT INTO membroGrupo (IDUsuario, IDGrupo) VALUES ('$userID', '$groupID')";
      $con->query($sql);
      echo json_encode(true);
    }

	}
?>
