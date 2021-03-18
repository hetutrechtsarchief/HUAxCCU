<?php
define('API', 'https://transkribus.eu/TrpServer/rest/');

class Transkribus {

  public $sessionId;

  function login($user, $pw) {

    if ($this->sessionId) { ///CHECKME: what if the sessionId is invalid?
      return true;
    }

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
      $this->sessionId = (string)$xml->sessionId;
      return true;
    } else {
      $this->sessionId = '';
      // var_dump($xml);
      return false;
    }
  }

  function getDocuments($coll_id) {
    return json_decode(file_get_contents(API."collections/$coll_id/list", false, $this->contextGET()));
  }
  
  function getImageNames($coll_id, $doc_id) {
    return explode("\n",file_get_contents(API."collections/$coll_id/$doc_id/imageNames", false, $this->contextGET()));
  }

  function getPageIds($coll_id, $doc_id) {
    //https://transkribus.eu/TrpServer/rest/collections/54631/575628/pageIds/?JSESSIONID=77614C2AE91D78634C50E3AA0D0FA45A
    return json_decode(file_get_contents(API."collections/$coll_id/$doc_id/pageIds", false, $this->contextGET()));
  }

  function getPages($coll_id, $doc_id) {
    return json_decode(file_get_contents(API."collections/$coll_id/$doc_id/pages", false, $this->contextGET()));
  }

  function getTranscriptIds($coll_id, $doc_id) {
    return json_decode(file_get_contents(API."collections/$coll_id/$doc_id/transcriptIds", false, $this->contextGET()));
  }

  function getPageXML($coll_id, $doc_id, $page) {
    return file_get_contents(API."collections/$coll_id/$doc_id/$page/text", false, $this->contextGET());
  }

  function getPageInfo($coll_id, $doc_id, $page) {
    $xml_string = file_get_contents(API."collections/$coll_id/$doc_id/$page", false, $this->contextGET());
    $xml = simplexml_load_string($xml_string);
    $json = json_encode($xml);
    return json_decode($json,TRUE);
  }

  function getPageCurrentTranscriptInfo($coll_id, $doc_id, $page) {
    return json_decode(file_get_contents(API."collections/$coll_id/$doc_id/$page/curr", false, $this->contextGET()));
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