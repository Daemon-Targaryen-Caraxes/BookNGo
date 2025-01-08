<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

$data = [
    'message' => 'Hello from PHP',
    'status' => 'success',
];

echo json_encode($data);
?>
