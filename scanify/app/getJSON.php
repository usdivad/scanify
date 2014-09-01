<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header('Access-Control-Allow-Methods: POST');

    $url = $_POST['url'];
    //$json = file_get_contents($url);
    //header('Content-Type: application/json');
    echo $url;
    //echo $json;
?>