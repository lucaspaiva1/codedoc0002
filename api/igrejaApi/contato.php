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
		$row1->Face = "https://www.facebook.com/paulomarcos.sampaio";
		$vetor[] = $row1;

		$row2->Nome = "Maila Aguiar";
		$row2->Email = "mailaaguiar2@gmail.com";
		$row2->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$row2->Face = "https://www.facebook.com/maila.aguiar";
		$vetor[] = $row2;
		
	



		echo json_encode($vetor);
    }
?>
