<?php

$tempFile = "../../temp_file_987697hjg77.html";

if (file_exists($tempFile)) {
  unlink($tempFile);
} else {
  header("HTTP/1.0 400 Bad Request");
}