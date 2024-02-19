const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const duration = document.getElementById('duration');
const currentDuration = document.getElementById('current');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressAudio = document.getElementById('progressAudio');
const progressContainer = document.getElementById('progressContainer');
const audioVolume = document.getElementById('audio-volume');
const audioBar = document.getElementById('audio-bar');
const volumeBtn = document.getElementById('volume-btn');

const greetingText = document.getElementById('greeting');
const greeting2 = document.getElementById('greeting2');
const yesNo = document.getElementById('yes-no');

// Song titles
const songs = [
    {
        title:'hey',
        artist:'boom',
        audioFile: 'hey.mp3',
        coverFile: 'hey.jpg'
    },
    {
        title:'summer',
        artist:'voila',
        audioFile: 'summer.mp3',
        coverFile: 'summer.jpg'
    },
    {
        title:'ukulele',
        artist:'haha',
        audioFile: 'ukulele.mp3',
        coverFile: 'ukulele.jpg'

    }
]

let songIndex = 0;
let isPlaying = false;
let isMuted = false;
let currentVolume;

loadSong(songs[songIndex]);
//playSong();

//Greeting

greetingText.classList.add("fade-in");

setTimeout(function(){
  greetingText.classList.remove("fade-in");
  greetingText.classList.add("fade-out");
}, 2000);

setTimeout(function(){
  greetingText.style.display = "none";
  greeting2.style.display = "block";
  greeting2.classList.add("fade-in");
}, 2900);

setTimeout(function(){
  yesNo.style.display = "block";
  yesNo.classList.add("fade-in");
  yesNo.style.opacity = "1";
}, 3600);



function loadSong(song) {
    title.innerText = song["title"];
    artist.innerText = song["artist"];
    duration.innerText = formatSeconds(audio.duration);
    audio.src = `music/${song["audioFile"]}`;
    cover.src = `images/${song["coverFile"]}`;
  }

function playSong() {
    isPlaying = true;
    playBtn.classList.remove('fa-play');
    playBtn.classList.add('fa-pause');
  
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.remove('fa-pause');
    playBtn.classList.add('fa-play');
  
    audio.pause();
}

function formatSeconds(seconds) {
    // Calculate minutes and remaining seconds
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);

    // Ensure minutes and seconds are displayed with leading zeros if needed
    var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    var formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    // Return the formatted time string
    return formattedMinutes + ':' + formattedSeconds;
}

// Previous song
function prevSong() {
    songIndex--;
  
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
  
    loadSong(songs[songIndex]);
  
    playSong();
  }
  
  // Next song
  function nextSong() {
    songIndex++;
  
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
  
    loadSong(songs[songIndex]);
  
    playSong();
  }
 
//Play or pause song
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
      } else {
        playSong();
      }
});

volumeBtn.addEventListener('click', () => {
  if (isMuted) {
      audio.volume = currentVolume;
      volumeBtn.classList.remove('fa-volume-mute');
      volumeBtn.classList.add('fa-volume-down');
      isMuted = false;
    } else {
      audio.volume = 0;
      volumeBtn.classList.remove('fa-volume-down');
      volumeBtn.classList.add('fa-volume-mute');
      isMuted = true;
    }
});

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    currentDuration.innerText = formatSeconds(currentTime);
    const progressPercent = (currentTime / duration) * 100;
    progressAudio.style.width = `${progressPercent}%`;
  }

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }

function changeVolume(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;

    currentVolume = clickX / width;
    audioBar.style.width = `${currentVolume*100}%`;

    if (!isMuted){
      audio.volume = currentVolume;
    }
  }

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

audioVolume.addEventListener('click', changeVolume);