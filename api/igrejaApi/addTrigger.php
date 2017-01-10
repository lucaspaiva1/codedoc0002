<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php

	$sql = "CREATE DEFINER=igrejaadm@localhost TRIGGER publicacao_BEFORE_DELETE BEFORE DELETE ON publicacao FOR EACH ROW 
	BEGIN
	delete from comentario where comentario.Publicacao_IDPublicacao = OLD.IDPublicacao; 
	END";
	
	$con->query($sql);

?>