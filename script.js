"use strict";

const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


// Music
const songs = [
    {
      name: 'TDB-1',
      displayName: 'Electric Chill Machine',
      artist: 'TDB-Design',
    },
    {
      name: 'TDB-2',
      displayName: 'Seven Nation Army (Remix)',
      artist: 'TDB-Design',
    },
    {
      name: 'TDB-3',
      displayName: 'Goodnight, Disco Queen',
      artist: 'TDB-Design',
    },
    {
      name: 'metric-1',
      displayName: 'Front Row (Remix)',
      artist: 'Metric/TDB-Design',
    },
  ];
  
  // Check if Playing
  let isPlaying = false;
  
  // Play
  function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
  }
  
  // Pause
  function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
  }

  // play or pause event listener
  playBtn.addEventListener('click' , () => ( isPlaying ? pauseSong() : playSong()));

//   Update Dome
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update progressbar
function updateProgressBar(e) {
  if (isPlaying) {
    const {duration, currentTime} = e.srcElement;
    // Update progress bar
    const progressPrecent = (currentTime / duration) *100;
    progress.style.width = `${progressPrecent}%`;
    //alculate duration time
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if(durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //Deley switching duration elemet to avoid nan
    if(durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //alculate current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if(currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

//
function setProgressBar(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const {duration} = music;
  music.currentTime = (clickX / width)* duration;
}


// Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);