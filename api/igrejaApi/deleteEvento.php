<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$id = $request->id;
		
		$sql = "SELECT * FROM evento WHERE IDEvento = '$id'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
		
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			$sql = "DELETE FROM evento WHERE IDEvento = '$id'";
			$con->query($sql);
			echo json_encode(true);
		}
	}
?>