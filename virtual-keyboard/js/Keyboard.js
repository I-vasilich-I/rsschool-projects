import * as storage from  './storage.js';
import * as audio from './Audio.js';
import create from './utils/create.js';
import language from './layouts/index.js';
import Key from './Key.js';


const main = create('main', '', 
[create('h1', 'title', 'RSS Virtual Keyboard'), 
  create('h3', 'subtitle', 'Windows keyboard that has been made following Live coding instruction'),
  create('p', 'hint', 'Use left <kbd>Ctrl</kbd> + <kbd>Alt</kbd> or <kbd>RU/EN</kbd> to switch languages. Last language saves in localStorage')]);

window.speechRecognition = window.speechRecognition || webkitSpeechRecognition;
const recognition = new window.speechRecognition;

export default class keyboard {
  constructor(rowsOrder) {
    this.rowsOrder = rowsOrder;
    this.keysPressed = {};
    this.isCaps = false;
    this.isSound = false;
    this.isSpeech = false;
    this.audioElems = {};
  }

  init(langCode) {
    this.keyBase = language[langCode];
    this.output = create('textarea', 'output', null, main, 
      ['placeholder', 'Start to type something... '], 
      ['rows', 5],
      ['cols', 50], 
      ['spellcheck', false], 
      ['autocorrect', 'off']);
    this.container = create('div', 'keyboard', null, main, ['language', langCode]);
    document.body.prepend(main);
    return this;
  }

  generateLayout() {
    this.keyButtons = []; 
    this.rowsOrder.forEach((row, i) => {
      const rowElement = create('div', 'keyboard__row', null, this.container, ['row', i+1]);
      rowElement.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
      row.forEach((code) => {
        const keyObj = this.keyBase.find((key) => key.code === code);
        if (keyObj) {
          const keyButton = new Key(keyObj);
          if (code.match(/Lang/)) keyButton.letter.innerHTML = this.container.dataset.language.toUpperCase();
          this.keyButtons.push(keyButton);
          rowElement.appendChild(keyButton.div);
          if (keyButton.code.match(/Shift|Caps|Enter|Backspace/)) {
            const audioElem = create('audio', '', null, main, ['code', keyButton.code], ['src', audio.getAudio(keyButton.code )]);
            this.audioElems[audioElem.dataset.code] = audioElem;
            main.appendChild(audioElem);
          } 
        }
      });
    });

    let audioElemRu = create('audio', '', null, main, ['code', 'ru'], ['src', audio.getAudio('', 'ru' )]);
    this.audioElems[audioElemRu.dataset.code] = audioElemRu;
    main.appendChild(audioElemRu);
    let audioElemEn = create('audio', '', null, main, ['code', 'en'], ['src', audio.getAudio('', 'en' )]);
    this.audioElems[audioElemEn.dataset.code] = audioElemEn;
    main.appendChild(audioElemEn);




    document.addEventListener('keydown', this.handleEvent);
    document.addEventListener('keyup', this.handleEvent);
    this.container.onmousedown = this.preHandleEvent;
    this.container.onmouseup = this.preHandleEvent;
  }

  preHandleEvent = (e) => {
    e.stopPropagation();
    const keyDiv = e.target.closest('.keyboard__key');
    if (!keyDiv) return;
    const { dataset: { code } } = keyDiv;
    keyDiv.addEventListener('mouseleave', this.resetButtonState);
    this.handleEvent({ code, type: e.type});
  }

  resetButtonState = ({ target: { dataset: { code } } }) => {
    if (code.match('Shift')) {
      this.shiftKey = false;
      this.switchUpperCase(false);
      this.keysPressed[code].div.classList.remove('active');
    }
    if (code.match(/Control/)) this.ctrKey = false;
    if (code.match(/Alt/)) this.altKey = false;
    this.resetPressedButtons(code);
    this.output.focus();
  }

  resetPressedButtons = (targetCode) => {
    if (!this.keysPressed[targetCode]) return;
    if (!this.isCaps && !this.isSound && !this.isSpeech) this.keysPressed[targetCode].div.classList.remove('active');
    this.keysPressed[targetCode].div.removeEventListener('mouseleave', this.resetButtonState);
    delete this.keysPressed[targetCode];
  }

  handleEvent = (e) => {
    if (e.stopPropagation) e.stopPropagation();
    const { code, type } = e;
    const keyObj = this.keyButtons.find((key) => key.code === code);
    if (!keyObj) return;
    this.output.focus();

    if (type.match(/keydown|mousedown/)) {
      if (type.match(/key/)) e.preventDefault();
     
      if (code.match(/Shift/)) {
        this.shiftKey = true;
        this.switchUpperCase(true);
      }

      keyObj.div.classList.add('active');

      // Sound efects
      if (code.match(/Sound/)) {
        if (this.isSound) {
          this.isSound = false;
          keyObj.div.classList.remove('active');
        } else {
          this.isSound = true;
        }
      }
      if (this.isSound) {
        if (this.audioElems[code]) {
          this.audioElems[code].currentTime = 0;
          this.audioElems[code].play();
        }
        if (this.audioElems[this.container.dataset.language] && !this.audioElems[code]) {
          this.audioElems[this.container.dataset.language].currentTime = 0;
          this.audioElems[this.container.dataset.language].play();
        }
      }

      // Voice recognition 
      if (code.match(/Speech/)) {
        if (this.isSpeech) {
          this.isSpeech = false;
          keyObj.div.classList.remove('active');
          recognition.stop();
        } else {
          this.isSpeech = true;
          this.speechRecognition();
          //recognition.start();
        }
      }


      if (code.match(/Caps/) && !this.isCaps) {
        this.isCaps = true;
        this.switchUpperCase(true);
      } else if (code.match(/Caps/) && this.isCaps) {
        this.isCaps = false; 
        this.switchUpperCase(false);
        keyObj.div.classList.remove('active');
      }

      // switch language
      if (code.match(/Control/)) this.ctrlKey = true;
      if (code.match(/Alt/)) this.altKey = true;

      if (code.match(/Control/) && this.altKey) this.switchLanguage(); 
      if (code.match(/Alt/) && this.ctrlKey) this.switchLanguage(); 

      if (code.match(/Lang/)) {
        this.switchLanguage();
        keyObj.div.lastChild.innerHTML = this.container.dataset.language.toUpperCase();
      }



      if (!this.isCaps) {
        this.printToOutput(keyObj, this.shiftKey ? keyObj.shift : keyObj.small);
      } else if (this.isCaps) {
        if (this.shiftKey) {
          this.printToOutput(keyObj, keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
        } else {
          this.printToOutput(keyObj, !keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
        }
      }
      this.keysPressed[keyObj.code] = keyObj;

      //release button
    } else if (type.match(/keyup|mouseup/)) {
      
      if (code.match(/Control/)) this.ctrlKey = false;
      if (code.match(/Alt/)) this.altKey = false;
      if (code.match(/Shift/)) {
        this.shiftKey = false;
        this.switchUpperCase(false);
      }

      if (!code.match(/Caps/) && !code.match(/Sound/) && !code.match(/Speech/))  keyObj.div.classList.remove('active');
    }
  }

  switchLanguage = () => {
    const langAbbr = Object.keys(language);
    let langIdx = langAbbr.indexOf(this.container.dataset.language);
    this.keyBase = langIdx + 1 < langAbbr.length ? language[langAbbr[langIdx+=1]] 
      : language[langAbbr[langIdx -= langIdx]];

    this.container.dataset.language = langAbbr[langIdx];
    storage.set('kbLang', langAbbr[langIdx]);

    this.keyButtons.forEach((button) => {
      const keyObj = this.keyBase.find((key) => key.code === button.code);
      if (!keyObj) return;
      button.shift = keyObj.shift;
      button.small = keyObj.small;
      if (keyObj.shift && keyObj.shift.match(/[^a-zA-zа-яА-ЯёЁ0-9]/g)) {
        button.sub.innerHTML = keyObj.shift;
      } else {
        button.sub.innerHTML = '';
      }
      button.letter.innerHTML = keyObj.small;
    });

    if (this.isCaps) this.switchUpperCase(true);
  }

  switchUpperCase(isTrue) {
    if (isTrue) {
      this.keyButtons.forEach((button) => {
        if (button.code.match(/Lang/)) return;
        if (button.sub) {
          if (this.shiftKey) {
            button.sub.classList.add('sub-active');
            button.letter.classList.add('sub-inactive');
          }
        }
  
        if(!button.isFnKey && this.isCaps && !this.shiftKey && !button.sub.innerHTML) {
          button.letter.innerHTML = button.shift;
        } else if (!button.isFnKey && this.isCaps && this.shiftKey) {
          button.letter.innerHTML = button.small;
        } else if (!button.isFnKey && !button.sub.innerHTML) {
          button.letter.innerHTML = button.shift;
        }
      });
    } else {
      this.keyButtons.forEach((button) => {
        if (button.code.match(/Lang/)) return;
        if(button.sub.innerHTML && !button.isFnKey) {
          button.sub.classList.remove('sub-active');
          button.letter.classList.remove('sub-inactive');

          if (!this.isCaps) {
            button.letter.innerHTML = button.small;
          } else if (!this.isCaps) {
            button.letter.innerHTML = button.shift;
          }
        } else if (!button.isFnKey) {
          if (this.isCaps) {
            button.letter.innerHTML = button.shift;
          } else {
            button.letter.innerHTML = button.small;
          }
        }
      })
    }
    
  }

  speechRecognition() {
    if (!this.isSpeech) return;
    recognition.interimResults = true;
    recognition.lang = this.container.dataset.language;

    recognition.addEventListener('result', e => {
      let transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
        if (e.results[0].isFinal) {
          this.printToOutput(null, transcript, true);
          transcript = '';
        }
    });


  
    recognition.addEventListener('end', () => {
      if (this.isSpeech) {
        recognition.start();
      } else {
        recognition.stop();
      }
    });
    if (this.isSpeech) {
      recognition.start();
    }
    
  }

  printToOutput(keyObj, symbol, speech = false) {
    let cursorPos = this.output.selectionStart;
    const left = this.output.value.slice(0, cursorPos);
    const right = this.output.value.slice(cursorPos);

    const fnButtonHandler = {
      Tab: () => {
      this.output.value = `${left}\t${right}`;
      cursorPos++;
      },
      ArrowLeft: () => {
        cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0;
      }, 
      ArrowRight: () => {
        cursorPos++;
      }, 
      ArrowUp: () => {
        const positionFromLeft = this.output.value.slice(0, cursorPos).match(/(\n).*$(?!\1)/g) || [[1]];
        cursorPos -= positionFromLeft[0].length;
      },
      ArrowDown: () => {
        const positionFromLeft = this.output.value.slice(cursorPos).match(/(\n).*$(?!\1)/g) || [[1]];
        cursorPos += positionFromLeft[0].length;
      },
      Enter: () => {
        this.output.value = `${left}\n${right}`;
        cursorPos++;
      },
      Delete: () => {
        this.output.value = `${left}${right.slice(1)}`;
      },
      Backspace: () => {
        this.output.value = `${left.slice(0, -1)}${right}`;
        cursorPos--;
      },
      Space: () => {
        this.output.value = `${left} ${right}`;
        cursorPos++;
      },
    }

    if (!speech) {
      if (fnButtonHandler[keyObj.code]) fnButtonHandler[keyObj.code]();
      else if (!keyObj.isFnKey) {
        cursorPos++;
        this.output.value = `${left}${symbol || ''}${right}`;
      }
    } else {
      this.output.value += `${symbol || ''} `;
      cursorPos=this.output.value.length;

    }
    
    this.output.setSelectionRange(cursorPos, cursorPos);
  }
}