document.addEventListener("DOMContentLoaded", function() {
    // Функция для загрузки списка видео из videos.json
    function loadVideos() {
        fetch('videos.json')
            .then(response => response.json())
            .then(videos => {
                var videoGrid = document.getElementById("videoGrid");

                videos.forEach(function(video) {
                    var videoItem = document.createElement("div");
                    videoItem.classList.add("video-item");

                    var videoLink = document.createElement("a");
                    videoLink.href = "video.html?video=" + video.file;

                    var videoThumbnail = document.createElement("img");
                    videoThumbnail.src = 'thumbnails/' + video.thumbnail;
                    videoThumbnail.alt = video.title;

                    var videoTitle = document.createElement("h3");
                    videoTitle.textContent = video.title;

                    videoLink.appendChild(videoThumbnail);
                    videoLink.appendChild(videoTitle);
                    videoItem.appendChild(videoLink);
                    videoGrid.appendChild(videoItem);
                });
            });
    }

    // Загрузка списка видео на главной странице
    if (window.location.pathname.endsWith("/piskabobra-videohost") || window.location.pathname.endsWith("/piskabobra-videohost/")) {
        loadVideos();
    }

    // Если мы на странице video.html, загружаем видео из URL
    if (window.location.pathname.endsWith("video.html")) {
        var urlParams = new URLSearchParams(window.location.search);
        var videoFile = urlParams.get('video');
        var video = document.getElementById("myVideo");

        if (videoFile) {
            video.src = 'videos/' + videoFile;
        }
    }

    // Обработка формы загрузки видео
    var uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(event) {
            event.preventDefault();

            var videoFile = document.getElementById('videoFile').files[0];
            var thumbnailFile = document.getElementById('thumbnailFile').files[0];
            var videoTitle = document.getElementById('videoTitle').value;

            var videoData = {
                title: videoTitle,
                file: videoFile.name,
                thumbnail: thumbnailFile.name
            };

            // Загрузка видео и миниатюры в локальное хранилище
            var reader = new FileReader();
            reader.onload = function() {
                localStorage.setItem(videoFile.name, reader.result);
                var thumbReader = new FileReader();
                thumbReader.onload = function() {
                    localStorage.setItem(thumbnailFile.name, thumbReader.result);

                    // Сохраняем данные о видео в JSON-файл (имитация базы данных)
                    fetch('videos.json')
                        .then(response => response.json())
                        .then(videoList => {
                            videoList.push(videoData);
                            fetch('videos.json', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(videoList)
                            }).then(() => {
                                alert('Видео загружено');
                                window.location.href = '/piskabobra-videohost';
                            });
                        });
                };
                thumbReader.readAsDataURL(thumbnailFile);
            };
            reader.readAsDataURL(videoFile);
        });
    }
});
