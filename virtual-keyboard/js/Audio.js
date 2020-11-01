const path = 'assets/audio/';
const audio = [
  `${path}boom.wav`,
  `${path}clap.wav`,
  `${path}hihat.wav`,
  `${path}kick.wav`,
  `${path}openhat.wav`,
  `${path}ride.wav`,
  `${path}snare.wav`,
  `${path}tink.wav`,
  `${path}tom.wav`,
];

let audioFile;

export function getAudio(key, lang) {
  //if (!key || !lang) return;
  if (key.match(/Shift|Caps|Enter|Back/)) {
    switch (key) {
      case 'ShiftLeft' || 'ShiftRight' :
        audioFile = audio[1];
        break;
      case 'CapsLock': 
        audioFile = audio[2];
        break;
      case 'Enter':
        audioFile = audio[3];
        break;
      case 'Backspace':
        audioFile = audio[4];
        break;
    }
  } else {  
    if (lang === 'ru') {
      audioFile = audio[0];
    } else {
      audioFile = audio[7];
    }
  }

 
  return audioFile;
}