const video = document.getElementById('video');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const progressBar = document.getElementById('progress-bar');
const time = document.getElementById('time');
const backwardButton = document.getElementById('backward-button');
const forwardButton = document.getElementById('forward-button');
const activeSpeedButton = document.getElementById('active-speed-button');
const activeVolumeButton = document.getElementById('active-volume-button');
const volumeBarContainer = document.getElementById('volume-bar-container');
const volumeBar = document.getElementById('volume-bar');
const speedsBar = document.getElementById('speeds-bar');
const speed1xButton = document.getElementById('speed-1x');
const speed1_5xButton = document.getElementById('speed-1.5x');
const speed2xButton = document.getElementById('speed-2x');
const fullscreenButton = document.getElementById('fullscreen-button');

const changeTimeDisplay = (e) => {
    // change data-display attribute of time element to current time of video
    if (time.dataset.display === 'duration') {
        time.dataset.display = 'remaining';
    }
    else {
        time.dataset.display = 'duration';
    }
}

const formatTime = (time) => {
    let formattedTimeHour = Math.floor(time / 3600);
    let formattedTimeMinute = Math.floor((time % 3600) / 60);
    let formattedTimeSecond = Math.floor(time % 60);


    if (formattedTimeHour < 10) {
        formattedTimeHour = '0' + formattedTimeHour
    }
    if (formattedTimeMinute < 10) {
        formattedTimeMinute = '0' + formattedTimeMinute;
    }
    if (formattedTimeSecond < 10) {
        formattedTimeSecond = '0' + formattedTimeSecond;
    }

    return `${formattedTimeHour}:${formattedTimeMinute}:${formattedTimeSecond}`;
}


const updateProgress = () => {
    let percent = Math.round((video.currentTime / video.duration * 90));
    progressBar.setAttribute('max', video.duration);
    progressBar.value = video.currentTime;
}

const updateTime = () => {
    let currentTime = video.currentTime;
    let duration = video.duration;
    let remainingTime = duration - currentTime;

    if (time.dataset.display === 'duration') {
        time.textContent = formatTime(currentTime) + ' / ' + formatTime(duration);
    }
    else {
        time.textContent = formatTime(currentTime) + ' / ' + formatTime(remainingTime);
    }
    updateProgress();
}

// add time update event listener
video.onloadedmetadata = () => {
    updateTime();
    video.addEventListener('timeupdate', updateTime);
}


const togglePlay = () => {
    if (video.paused) {
        video.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'flex';
    } else {
        video.pause();
        playButton.style.display = 'flex';
        pauseButton.style.display = 'none';
    }
}


const backward = () => {
    video.currentTime -= 5;
}

const forward = () => {
    video.currentTime += 5;
}

const toggleSpeedBar = () => {
    if (speedsBar.style.display === 'flex') {
        speedsBar.style.display = 'none';
    }
    else {
        speedsBar.style.display = 'flex';
    }
}


const toggleVolumeBar = () => {
    if (volumeBarContainer.style.display === 'flex') {
        volumeBarContainer.style.display = 'none';
    }
    else {
        volumeBarContainer.style.display = 'flex';
    }
}


const changeSpeed = (newSpeed) => {
    video.playbackRate = newSpeed;
    activeSpeedButton.textContent = newSpeed + 'x';
    speedsBar.style.display = 'none';
}

const changeVolume = (newVolume) => {
    video.volume = newVolume;
}


const toggleFullscreen = () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
    else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
    else if (video.mozRequestFullscreen) {
        video.mozRequestFullscreen();
    }

    if (document.fullscreenElement) {
        fullscreenButton.style.display = 'none';
    }
    else {
        fullscreenButton.style.display = 'flex';
    }
}



playButton.addEventListener('click', togglePlay)
pauseButton.addEventListener('click', togglePlay)
time.addEventListener('click', changeTimeDisplay)
backwardButton.addEventListener('click', backward)
forwardButton.addEventListener('click', forward)
activeSpeedButton.addEventListener('click', toggleSpeedBar)
speed1xButton.addEventListener('click', () => { changeSpeed(1) })
speed1_5xButton.addEventListener('click', () => { changeSpeed(1.5) })
speed2xButton.addEventListener('click', () => { changeSpeed(2) })
fullscreenButton.addEventListener('click', toggleFullscreen)
activeVolumeButton.addEventListener('click', toggleVolumeBar)
volumeBar.addEventListener('input', () => { changeVolume(volumeBar.value) })
progressBar.addEventListener('input', () => {
    video.currentTime = progressBar.value;
}
)