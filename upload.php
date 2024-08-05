<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $target_dir = "my-simple-site/videos/";
    
    // Создаем папку, если ее нет
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    // Обработка загрузки видео
    $video_file = $target_dir . basename($_FILES["video"]["name"]);
    if (move_uploaded_file($_FILES["video"]["tmp_name"], $video_file)) {
        echo "Видео успешно загружено.<br>";
    } else {
        echo "Ошибка загрузки видео.<br>";
    }
    
    // Обработка загрузки изображения
    $icon_file = $target_dir . basename($_FILES["icon"]["name"]);
    if (move_uploaded_file($_FILES["icon"]["tmp_name"], $icon_file)) {
        echo "Изображение успешно загружено.<br>";
    } else {
        echo "Ошибка загрузки изображения.<br>";
    }
    
    // Обработка названия видео
    $videotitle = $_POST['videotitle'];
    $title_file = $target_dir . "videotitle.txt";
    if (file_put_contents($title_file, $videotitle)) {
        echo "Название видео успешно сохранено.<br>";
    } else {
        echo "Ошибка сохранения названия видео.<br>";
    }
    
    // Перенаправление на главную страницу
    header("Location: /my-simple-site/index.html");
    exit();
} else {
    echo "Неверный метод запроса.";
}
?>
