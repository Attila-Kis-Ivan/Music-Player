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
      name: 'tdb-1',
      displayName: 'Electric Chill Machine',
      artist: 'TDB-Design',
    },
    {
      name: 'tdb-2',
      displayName: 'Seven Nation Army (Remix)',
      artist: 'TDB-Design',
    },
    {
      name: 'tdb-3',
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

// On load
loadSong(songs[1]);