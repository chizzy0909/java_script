const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// ---------------1. Play & Pause ----------------------------- //

function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
}

function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'pause');
    } else {
        video.pause();
        showPlayIcon();
    }
}
// on video end, show play button
video.addEventListener('ended', showPlayIcon);

// --------------2. Progress Bar ------------------------------ //

// calculate diaplay time format
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    // console.log(minutes, seconds);
    return `${minutes}:${seconds}`
}


//updete progress bar as video plays
function updateProgress() {
    // console.log('currentTime', video.currentTime, 'duration', video.duration);
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    displayTime(video.duration);
    currentTime.textContent = `${displayTime(video.currentTime)} / `;
    duration.textContent = `${displayTime(video.duration)} `;
}

// Click to seek within the video
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;  // 0.xxx
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}


// --------------3. Volume Controls --------------------------- //

let lastVolume = 1;

// Volumn Bar
function changeVolumn(e) {
    let volume = e.offsetX / volumeRange.offsetWidth;
    // Rounding volume up or down
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    // Change icon depending on volume
    volumeIcon.className = '';
    if (volume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (volume < 0.7 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }
    lastVolume = volume;
}

// Mute / Unmute
function toggleMute() {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');

    } else {
        video.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        if (video.volume > 0.7) {
            volumeIcon.classList.add('fas', 'fa-volume-up');
        } else if (video.volume < 0.7 && video.volume > 0) {
            volumeIcon.classList.add('fas', 'fa-volume-down');
        }
        volumeIcon.setAttribute('title', 'Mute');
    }

}

// --------------4. Change Playback Speed -------------------- //

function changeSpeed() {
    video.playbackRate = speed.value;
    console.log(video.playbackRate, speed.value);  // 1(default) 1

}

// --------------5. Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// Toggle Fullscreen
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullscreen = !fullscreen;
}


// --------------6. Event Listeners---------------------------//
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('timeupdate', updateProgress);  //当当前播放位置改变时触发。
video.addEventListener('canplay', updateProgress);     // 当浏览器可以开始播放音频/视频时触发

progressRange.addEventListener('click', setProgress);

volumeRange.addEventListener('click', changeVolumn);
volumeIcon.addEventListener('click', toggleMute);

speed.addEventListener('change', changeSpeed);

fullscreenBtn.addEventListener('click', toggleFullscreen);
