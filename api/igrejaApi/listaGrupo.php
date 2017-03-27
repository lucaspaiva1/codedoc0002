<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php
	$vetor   = array();
	$the_request = &$_GET;

	if (isset($_GET["id"])){
		if ($_GET["id"] == ""){
			$sql = "SELECT * FROM grupo";
			$result = $con->query($sql);

			while ($row=$result->fetch_assoc()){
				$vetor[] = $row;
			}
			echo json_encode($vetor);
		}else{
			$groupID = $_GET["id"];
			$userID = $_GET["user"];

			$sql = "SELECT usuario_IDUsuario from representagrupo where grupo_ID = '$groupID'";
			$result = $con->query($sql);

			while ($row=$result->fetch_assoc()){
				$vetor[] = $row['usuario_IDUsuario'];
			}

			$membros = array();
			$dentro = false;

			$sql = "SELECT * FROM membroGrupo WHERE IDGrupo = '$groupID'";
			$result = $con->query($sql);

			while ($row=$result->fetch_assoc()){
				$membros[] = $row['IDUsuario'];

				if ($row['IDUsuario'] == $userID){
					$dentro = true;
				}
			}

			$temp = array();

			$temp[0] = $vetor;
			$temp[1] = $membros;
			$temp[2] = $dentro;

			echo json_encode($temp);
		}
	}

	$con->close();
?>
