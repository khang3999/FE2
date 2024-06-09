<?php
require_once '../../config/database.php';
spl_autoload_register(function ($className)
{
   require_once "../models/$className.php";
});

$input = json_decode(file_get_contents('php://input'), true);
$key = $input['key'];

$photoModel = new Photo();
$photos = $photoModel->getPhotosByKeyword($key);
echo json_encode($photos);