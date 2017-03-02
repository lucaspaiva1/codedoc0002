<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php
	$vetor   = array();
    $the_request = &$_GET;

    if( isset($_GET["administradoresAll"])){

		$row1->Nome = "Dom José Ruy";
		$row1->Oficio = "Bispo diocesano";
		$row1->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$vetor[] = $row1;

		$row2->Nome = "Diác. Paulo Marcos";
		$row2->Oficio = "Assessor Diocesano";
		$row2->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$vetor[] = $row2;

		$row3->Nome = "Pe. Leandro Silva";
		$row3->Oficio = "Conselheiro";
		$row3->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$vetor[] = $row3;

		$row4->Nome = "Deise Bastos";
		$row4->Oficio = "Tesoureira";
		$row4->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$vetor[] = $row4;

		$row5->Nome = "Tainan Queiroz";
		$row5->Oficio = "1ª Secretário";
		$row5->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$vetor[] = $row5;

		$row6->Nome = "Lucielle Marinho";
		$row6->Oficio = "2ª Secretária";
		$row6->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$vetor[] = $row6;

		$row7->Nome = "Maila Aguiá";
		$row7->Oficio = "Coordenadora de Mídia";
		$row7->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$vetor[] = $row7;

		$row8->Nome = "Marinara";
		$row8->Oficio = "Coordenadora de Mídia";
		$row8->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$vetor[] = $row8;

		$row9->Nome = "Selma de Oliveira";
		$row9->Oficio = "Responsável pela Formação";
		$row9->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$vetor[] = $row9;

		$row10->Nome = "Maila Aguiá";
		$row10->Oficio = "Coordenadora dos Representantes das Foranias";
		$row10->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$vetor[] = $row10;

		$row11->Nome = "Henrrique Barreto";
		$row11->Oficio = "Coordenador dos Movimentos Juvenis";
		$row11->Foto = "http://www.dsoutlet.com.br/igrejaApi/imagens/anonimo.png";
		$vetor[] = $row11;

		echo json_encode($vetor);
    }
?>