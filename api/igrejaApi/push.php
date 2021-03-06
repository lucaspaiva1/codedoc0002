<?php

  function sendMessageToAll($msg){
    $content = array("en" => $msg);
    $fields = array('app_id' => 'ed50823a-df07-46a0-95c9-534351e78b0f',
                    'included_segments' => array('All'),
                    'headings' => array("en" => "Setor Juventude"),
                    'data' => array("foo" => "bar"),
                    'large_icon' => "http://www.dsoutlet.com.br/igrejaApi/imagens/logo.jpeg",
                    'contents' => $content,
                    'android_group' => 'setor',
                    'android_group_message' => array("en" => "Você tem $[notif_count] novas notificações"));


    $fields = json_encode($fields);
    // print("\nJSON sent:\n");
    // print($fields);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8', 'Authorization: Basic Y2RkNmU0ZDAtYmFiOC00NzRkLWE1NmUtNTZkNTFkMGJjZTg0'));

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, TRUE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    $response = curl_exec($ch);

    curl_close($ch);

    return $response;
  }

  function enviarPushToAll($msg){
    $response = sendMessageToAll($msg);
    $return["allresponses"] = $response;
    $return = json_encode($return);
    // print ("\n\nJSON received:\n");
    // print($return);
    // print("\n");
  }

?>
