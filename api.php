<?php
header('Content-Type: application/json');

const HOST = 'localhost';
const DB = 'prepa_vue';
const USER = 'root';
const PASSWORD = 'root';

$db = new PDO('mysql:host=localhost;dbname=pictagram;charset=utf8', 'root', 'root');
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

if (isset($_GET['tag']) && $_GET['tag']) {
  $query = $db->prepare('SELECT * FROM posts WHERE tags LIKE :tag OR title LIKE :tag');
  $query->bindValue('tag', '%' . $_GET['tag'] . '%', PDO::PARAM_STR);
  $query->execute();
} else {
  $query = $db->query('SELECT * FROM posts');
}

$posts = $query->fetchAll();

echo json_encode($posts);
