<?php
$deleteFile = "../../" . $_POST["name"];

if (file_exists($deleteFile)) {
  unlink($deleteFile);
} else {
  header("HTTP/1.0 400 Bad Request");
}