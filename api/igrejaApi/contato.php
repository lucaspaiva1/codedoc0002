<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php
	$vetor   = array();
    $the_request = &$_GET;

    if( isset($_GET["gestaoAll"])){

		$row1->Nome = "Paulo Marcos";
		$row1->Email = "oluapsocram_vita@hotmail.com";
		$row1->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$row1->Face = "https://www.facebook.com/cleybson.cardoso";
		$vetor[] = $row1;

		$row1->Nome = "Paulo Marcos";
		$row1->Email = "oluapsocram_vita@hotmail.com";
		$row1->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$row1->Face = "https://www.facebook.com/cleybson.cardoso";
		$vetor[] = $row1;




		echo json_encode($vetor);
    }
?>