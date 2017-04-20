<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

//funcao para salvar e apagar imagem
include 'salvaImagem.php';
include 'apagaImagem.php';

// veja: https://developers.facebook.com/docs/php/gettingstarted/
require_once __DIR__ . '/sdk/src/Facebook/autoload.php';
require_once __DIR__ . '/sdk/src/Facebook/Facebook.php';
require_once __DIR__ . '/sdk/src/Facebook/FacebookRequest.php';
require_once __DIR__ . '/sdk/src/Facebook/FacebookApp.php';

use Facebook\FacebookRequest;

$the_request = &$_POST;

$postdata = file_get_contents("php://input");

if (isset($postdata)) {

    $request = json_decode($postdata);
    $token = $request->token;
    $id = $request->id;
    $publicacao = $request->publicacao;

    //salvando imagem no servidor
    $nome = 'postImages/' . time() . 'page.jpeg'; //nome da foto
    $foto = $publicacao->LinkImagem; //base64 recebido do front-end
    $url = 'http://www.dsoutlet.com.br/igrejaApi/' . $nome; //url da foto

    base64_to_jpeg($foto, $nome);

    $fb = new Facebook\Facebook([
        'app_id' => '255509854899402',
        'app_secret' => 'd390eaebdc7e8b2078714e4f0fd65616',
        'default_graph_version' => 'v2.8',
    ]);

    $data = [
        'message' => $publicacao->Texto,
        'source' => $fb->fileToUpload($url),
    ];

    try {
        // Returns a `Facebook\FacebookResponse` object //page id: 1340714515951972
        $response = $fb->post('/1340714515951972/photos', $data, $token);
    } catch (Facebook\Exceptions\FacebookResponseException $e) {
        echo json_encode('Graph returned an error: ' . $e->getMessage());
        exit;
    } catch (Facebook\Exceptions\FacebookSDKException $e) {
        echo json_encode('$token Facebook SDK returned an error: ' . $e->getMessage());
        exit;
    }

    $graphNode = $response->getGraphNode();

    echo json_encode('Photo ID: ' . $graphNode['id']);

    //funcao para apagar a imagem
    apagarImagem($url);
}

?>