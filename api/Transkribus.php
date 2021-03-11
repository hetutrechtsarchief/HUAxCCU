<?php
define('API', 'https://transkribus.eu/TrpServer/rest/');

class Transkribus {

  public $sessionId;

  function login($user, $pw) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, API."auth/login");
    curl_setopt($ch, CURLOPT_POSTFIELDS, "user=$user&pw=$pw");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/x-www-form-urlencoded"));
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    curl_close($ch);

    if ($result[0]=='<') {
      $xml = new SimpleXMLElement($result);
      $this->sessionId = $xml->sessionId;
      // echo $this->sessionId;
      // die();
      return true;
    } else {
      $this->sessionId = '';
      return false;
    }
  }

  function getDocuments($coll_id) {
    return json_decode(file_get_contents(API."collections/$coll_id/list", false, $this->contextGET()));
  }
  
  function getImageNames($coll_id, $doc_id) {
    return json_decode(file_get_contents(API."collections/$coll_id/$doc_id/imageNames", false, $this->contextGET()));
  }

  function getPageXML($coll_id, $doc_id, $page) {
    return file_get_contents(API."collections/$coll_id/$doc_id/$page/text", false, $this->contextGET());
  }

  function postPageTranscript($coll_id, $doc_id, $page, $pageXML) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, API."collections/$coll_id/$doc_id/$page/text");
    curl_setopt($ch, CURLOPT_COOKIE, "JSESSIONID=".$this->sessionId);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($ch, CURLOPT_POST,           1 );
    curl_setopt($ch, CURLOPT_POSTFIELDS,     $pageXML ); 
    curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: text/plain')); 
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
  }

  function contextGET() {
    return stream_context_create([
      "http" => [ 
          "header" => "Cookie: JSESSIONID=".$this->sessionId."\r\n"
      ]
    ]);
  }

  function contextPOST() {
    return stream_context_create([
      "http" => [ 
          "method" => "POST",
          "header" => "Cookie: JSESSIONID=".$this->sessionId."\r\n"
      ]
    ]); 
  }
}


?>