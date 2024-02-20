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
const chooseText = document.getElementById('chooseText');
const yesNo = document.getElementById('yes-no');
const boxes = document.getElementById('boxes');
const main = document.getElementById('main');
const video = document.getElementById('videoStress');

const breathing = document.getElementById('breathing');
const bodyScan = document.getElementById('bodyScan');
const guidedImagery = document.getElementById('guidedImagery');

// Song titles
const songs = [
    {
        title:'Try it On',
        artist:'Interpol',
        audioFile: 'tryiton.mp3',
        coverFile: 'tryiton.jpg'
    },
    {
        title:'Stolen Dance',
        artist:'Milky Chance',
        audioFile: 'stolendance.mp3',
        coverFile: 'stolendance.jpg'
    },
    {
        title:'Mice on Venus',
        artist:'C418 Minecraft',
        audioFile: 'miceonvenus.mp3',
        coverFile: 'miceonvenus.jpg'

    }
]

let songIndex = 0;
let isPlaying = false;
let isMuted = false;
let currentVolume = 0.5;

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

function Stressed() {
  greeting2.classList.remove("fade-in");
  greeting2.classList.add("fade-out");
  yesNo.classList.remove("fade-in");
  yesNo.classList.add("fade-out");

  setTimeout(function() {
    greeting2.style.display = "none";
    yesNo.style.display = "none";
    chooseText.style.display = "flex";
    chooseText.classList.add("fade-in");

    main.style.display = "flex";
    main.style.flexDirection = "column";
    boxes.style.display = "flex";
    boxes.classList.add("fade-in");
  }, 850);
}

function No() {
  //window.location.assign("https://www.youtube.com/watch?v=16v2eojZ_l8");
  yesNo.style.display = "none";
  greeting2.style.display = "none";
  video.style.display = "flex";

}

function Breathing() {
  chooseText.classList.remove("fade-in");
  chooseText.classList.add("fade-out");
  boxes.classList.remove("fade-in");
  boxes.classList.add("fade-out");

  setTimeout(function() {
    chooseText.style.display = "none";
    boxes.style.display = "none";

    chooseText.innerText = "Find a comfortable sitting position";
    chooseText.classList.remove("fade-out");
    chooseText.classList.add("fade-in");
    chooseText.style.display = "flex";
  }, 850);

  setTimeout(function (){
    chooseText.classList.add("fade-out");
  }, 2850);

  setTimeout(function() {
    chooseText.display = "none";
    chooseText.innerText = "Take a deep breath in";

    chooseText.classList.remove("fade-out");
    chooseText.classList.add("fade-in");
    chooseText.style.display = "flex";
  }, 3700)
}

function BodyScan() {
  chooseText.classList.remove("fade-in");
  chooseText.classList.add("fade-out");
  boxes.classList.remove("fade-in");
  boxes.classList.add("fade-out");

  setTimeout(function() {
    chooseText.style.display = "none";
    boxes.style.display = "none";
  }, 900);
}

function GuidedImagery() {
  chooseText.classList.remove("fade-in");
  chooseText.classList.add("fade-out");
  boxes.classList.remove("fade-in");
  boxes.classList.add("fade-out");

  setTimeout(function() {
    chooseText.style.display = "none";
    boxes.style.display = "none";
  }, 900);
}

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
      audio.volume = parseFloat(currentVolume);
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

breathing.addEventListener('click', Breathing);
bodyScan.addEventListener('click', BodyScan);
guidedImagery.addEventListener('click', GuidedImagery);