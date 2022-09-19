const AudioCtx = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioCtx;

const volumeGain = ctx.createGain();
volumeGain.connect(ctx.destination);
volumeGain.gain.value = 0.1;

let attackTime = 0.3;
let sustainLevel = 0.8;
let releaseTime = 0.3;
let pitch = 240;

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');

const volumeControl = document.querySelector('#volume-control');
const attackControl = document.querySelector('#attack-control');
const releaseControl = document.querySelector('#release-control');
const pitchControl = document.querySelector('#pitch-control');

pitchControl.addEventListener('input', function() {
  pitch = this.value;
})
volumeControl.addEventListener('input', function() {
  console.log(this.value)
  volumeGain.gain.value = this.value;
});

attackControl.addEventListener('input', function() {
  console.log(this.value)
  attackTime = parseFloat(this.value);
});

releaseControl.addEventListener('input', function() {
  releaseTime = parseFloat(this.value);
});


startButton.addEventListener('click', () => {
  const oscillator = ctx.createOscillator();
  const noteGain = ctx.createGain();

  noteGain.gain.setValueAtTime(0, 0);
  noteGain.gain.linearRampToValueAtTime(sustainLevel, ctx.currentTime + attackTime);
  console.log(ctx.currentTime);
  noteGain.gain.setValueAtTime(sustainLevel, ctx.currentTime + 1 - releaseTime);
  noteGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(pitch, 0);
  oscillator.start(0);
  oscillator.stop(ctx.currentTime + 1);
  console.log(ctx.currentTime);
  oscillator.connect(noteGain);
  noteGain.connect(volumeGain);
});
