<?php
	include 'mySQL.php';
	require 'mySQL.php';
  require 'push.php';
?>

<?php
  $sql = "SELECT * FROM evento";
  $result = $con->query($sql);

  $today = Date('Y-m-d');

  while($row=$result->fetch_assoc()){
    $data = $row['DataInicio'];
    list($d,$h) = split(' ', $data);

    if ($today == $d){
      $titulo = $row['Titulo'];
      $msg = "O evento $titulo é hoje!";
      enviarPushToAll($msg);
    }

  }


	$con->close();
?>
