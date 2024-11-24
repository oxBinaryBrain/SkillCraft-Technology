// DOM Elements
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

// Stopwatch Variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

// Format Time
function formatTime(ms) {
  const milliseconds = ms % 1000;
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

// Update Display
function updateDisplay() {
  const currentTime = Date.now() - startTime + elapsedTime;
  timeDisplay.textContent = formatTime(currentTime);
}

// Start Timer
startBtn.addEventListener('click', () => {
  startTime = Date.now();
  timerInterval = setInterval(updateDisplay, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
});

// Pause Timer
pauseBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsedTime += Date.now() - startTime;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
});

// Reset Timer
resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00.000';
  lapsList.innerHTML = '';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
});

// Add Lap
lapBtn.addEventListener('click', () => {
  const lapTime = timeDisplay.textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapsList.appendChild(lapItem);
});
