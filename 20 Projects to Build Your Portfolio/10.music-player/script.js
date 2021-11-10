const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Music
const song = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
    }

]

// Check if playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}
// Current Song
let songIndex = 0;

// Previous Song
function preSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = song.length - 1;
    }
    // console.log(songIndex);
    loadSong(song[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > song.length - 1) {
        songIndex = 0;
    }
    // console.log(songIndex);
    loadSong(song[songIndex]);
    playSong();
}

// On load -Select First Song
loadSong(song[songIndex]);

// Updae Progress Bar & time
function updaeProgressBar(e) {
    if (isPlaying) {
        // console.log(e);
        const { duration, currentTime } = e.srcElement;
        // console.log(duration, currentTime);
        // Update the progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calsuate display for duration
        const durationMinutess = Math.floor(duration / 60);
        // console.log(durationMinutess);  // 2
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // console.log(durationSeconds);  // 06
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutess}:${durationSeconds}`;
        }

        // Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    // console.log(e);
    const width = this.clientWidth;
    // console.log(width);  //360
    const clickX = e.offsetX;
    // console.log(clickX);
    const { duration } = music;  // duration就是这个音乐总长的秒数
    // console.log(clickX / width);   // 0.9972222222222222
    // console.log((clickX / width) * duration);  // 126.08463930555556
    music.currentTime = (clickX / width) * duration;


}

// Event Listeners
prevBtn.addEventListener('click', preSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updaeProgressBar);
progressContainer.addEventListener('click', setProgressBar);


