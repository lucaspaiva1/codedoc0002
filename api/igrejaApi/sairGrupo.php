<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php

	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");

	if (isset($postdata)){
		$request = json_decode($postdata);

		$userID  = $request->IDUsuario;
		$groupID = $request->IDGrupo;

    $sql = "SELECT * FROM membroGrupo WHERE IDUsuario = '$userID' AND IDGrupo = '$groupID'";
    $result = $con->query($sql);

    $num = $result->num_rows;

    if ($num !== 1){
      echo json_encode(false);
    } else {

      $sql = "DELETE FROM membroGrupo WHERE IDUsuario = '$userID' AND IDGrupo = '$groupID'";
      $con->query($sql);
      echo json_encode(true);
    }

	}
?>
