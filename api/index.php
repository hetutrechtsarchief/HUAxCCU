<?php
session_start();
// ini_set('display_errors', 'On');
include_once("common.php");
include_once("Transkribus.php");

$db = dbConnect(getenv('MYSQL_HOST'), getenv('MYSQL_DB'), getenv('MYSQL_USER'), getenv('MYSQL_PASS'));

$trk = new Transkribus();

$success = $trk->login(getenv('TRANSKRIBUS_USER'), getenv('TRANSKRIBUS_PASS'));

if (!$success) sendError("login failed");


$method = $_SERVER["REQUEST_METHOD"];

if ($method=="GET") {
  $action = $_GET["action"];

  if ($action=="getDocuments") { // /api/index.php?action=getDocuments&coll_id=54631  of bijv 87815
    $coll_id = $_GET["coll_id"];
    sendSuccess($trk->getDocuments($coll_id));
  }
  if ($action=="getImageNames") {
    $coll_id = $_GET["coll_id"];
    $doc_id = $_GET["doc_id"];
    sendSuccess($trk->getImageNames($coll_id, $doc_id));
  }
  else if ($action=="getPageXML") { 
    //voorbeeld: /api/index.php?action=getPageXML&coll_id=54631&doc_id=575628&page=5
    //voorbeeld: /api/index.php?action=getPageXML&coll_id=87815&doc_id=469657&page=1
    $coll_id = $_GET["coll_id"];
    $doc_id = $_GET["doc_id"];
    $page = $_GET["page"];
    sendXML($trk->getPageXML($coll_id, $doc_id, $page));
  }

  //==== postPageTranscript ====
  /*
    $pageXML = $trk->getPageXML(54631,575628,5);
    $pageXML = str_replace('Johan', 'Piet', $pageXML);
    sendSuccess($trk->postPageTranscript(54631,575628,5, $pageXML));
  */

}



?>