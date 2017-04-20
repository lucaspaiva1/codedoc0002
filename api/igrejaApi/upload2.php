<?php
	include 'salvaImagem.php';
?>

<?php
	
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Content-Type: application/json; charset=UTF-8");
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		
		$request = json_decode($postdata);
		
		$nome = 'postImages/'.$request->nome; //se receber do front
		//$nome = 'imagens/'.time().'.jpeg'; //criando no back
		$foto = $request->foto;
		$url = 'http://www.dsoutlet.com.br/igrejaApi/'.$nome;
		
		//$data = 'data:image/png;base64,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X542Z97/f2Y2HTUcCtHgaro+yxw/t34A6ggpgP+0fdk8r8ti9lQeHx7KdDotD49PZbZYlpdtfvz3z13Df4E5AlwSIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQElIAAAAhIQUAABASUgAAACEhBQAAEBJSAAAAISEFAAAQ+h9OaCdW3kXmdwAAAABJRU5ErkJggg==';
		
		base64_to_jpeg($foto, $nome);
				
		echo json_encode($url);
	}
?>