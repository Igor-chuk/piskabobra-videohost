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
            alert('Видео загружено (в этой демо-версии функция не реализована).');
        });
    }
});
