document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("myVideo");
    var playPauseBtn = document.getElementById("playPauseBtn");
    var muteBtn = document.getElementById("muteBtn");
    var fullscreenBtn = document.getElementById("fullscreenBtn");

    if (playPauseBtn) {
        playPauseBtn.addEventListener("click", function() {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = "Pause";
            } else {
                video.pause();
                playPauseBtn.textContent = "Play";
            }
        });
    }

    if (muteBtn) {
        muteBtn.addEventListener("click", function() {
            if (video.muted) {
                video.muted = false;
                muteBtn.textContent = "Mute";
            } else {
                video.muted = true;
                muteBtn.textContent = "Unmute";
            }
        });
    }

    if (fullscreenBtn) {
        fullscreenBtn.addEventListener("click", function() {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.mozRequestFullScreen) {
                video.mozRequestFullScreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });
    }

    // Если мы на странице video.html, загружаем видео из URL
    if (window.location.pathname.endsWith("video.html")) {
        var urlParams = new URLSearchParams(window.location.search);
        var videoFile = urlParams.get('video');
        if (videoFile) {
            video.src = 'videos/' + videoFile;
        }
    }

    // Обработка формы загрузки видео (только клиентская часть)
    var uploadForm = document.getElementById('uploadForm');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Здесь должна быть обработка загрузки видео на сервер
            alert('Видео загружено (в этой демо-версии функция не реализована).');
            window.location.href = '/piskabobra-videohost';
        });
    }

    // Загрузка списка видео на главной странице
    if (window.location.pathname.endsWith("/piskabobra-videohost") || window.location.pathname.endsWith("/piskabobra-videohost/")) {
        var videoGrid = document.getElementById("videoGrid");
        var videos = [
            {title: "Video Title 1", file: "video1.mp4", thumbnail: "thumbnails/video1.jpg"},
            {title: "Video Title 2", file: "video2.mp4", thumbnail: "thumbnails/video2.jpg"}
            // Добавьте больше видео здесь
        ];

        videos.forEach(function(video) {
            var videoItem = document.createElement("div");
            videoItem.classList.add("video-item");

            var videoLink = document.createElement("a");
            videoLink.href = "video.html?video=" + video.file;

            var videoThumbnail = document.createElement("img");
            videoThumbnail.src = video.thumbnail;
            videoThumbnail.alt = video.title;

            var videoTitle = document.createElement("h3");
            videoTitle.textContent = video.title;

            videoLink.appendChild(videoThumbnail);
            videoLink.appendChild(videoTitle);
            videoItem.appendChild(videoLink);
            videoGrid.appendChild(videoItem);
        });
    }
});
