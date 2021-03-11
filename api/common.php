<?php

function dbConnect($dbHostname, $dbName, $dbUsername, $dbPassword) {
  try {
    $con = new PDO("mysql:host=$dbHostname;dbname=$dbName", $dbUsername, $dbPassword);    
    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $con;
  } catch(PDOException $e) {
    die("dbConnect: Connection failed: " . $e->getMessage());
  }
}

function sendSuccess($data) {
  header('Content-Type: application/json');
  echo json_encode(array('status'=>true, 'data'=>$data), true);
  die();
}

function sendError($data) {
  header('Content-Type: application/json');
  echo json_encode(array('status'=>false, 'data'=>$data), true);
  die();
}

function sendXML($data) {
  header('Content-Type: application/xml');
  echo $data;
  die();
}
?>