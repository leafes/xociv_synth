const AudioCtx = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioCtx;

const masterVolume = ctx.createGain();
masterVolume.connect(ctx.destination);

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const startButton1 = document.querySelector('#start1');
const stopButton1 = document.querySelector('#stop1');
masterVolume.gain.value = .1;

startButton.addEventListener('click', () => {
  const oscillator = ctx.createOscillator();
  oscillator.frequency.setValueAtTime(445, 0);
  oscillator.connect(masterVolume);
  oscillator.start(0);
  oscillator.type = "sin-wave";
  stopButton.addEventListener('click', () => {
    oscillator.stop();
  })
});

startButton1.addEventListener('click', () => {
  const oscillator = ctx.createOscillator();
  oscillator.frequency.setValueAtTime(50, 0);
  oscillator.connect(masterVolume);
  oscillator.start(0);
  oscillator.type = "triangle";
  stopButton1.addEventListener('click', () => {
    oscillator.stop();
  })
});

