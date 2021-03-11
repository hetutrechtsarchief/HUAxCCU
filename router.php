<?php

$url = $_SERVER['REQUEST_URI'];

$params     = explode("/", $url);

// $json = json_decode($url, true);

print_r($params);

?>