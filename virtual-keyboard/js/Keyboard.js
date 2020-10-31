import * as storage from  './storage.js';
import create from './utils/create.js';
import language from './layouts/index.js';
import Key from './Key.js';

const main = create('main', '', 
[create('h1', 'title', 'RSS Virtual Keyboard'), 
  create('h3', 'subtitle', 'Windows keyboard that has been made following Live coding instruction'),
  create('p', 'hint', 'Use left <kbd>Ctrl</kbd> + <kbd>Alt</kbd> or <kbd>RU/EN</kbd> to switch languages. Last language saves in localStorage')]);

export default class keyboard {
  constructor(rowsOrder) {
    this.rowsOrder = rowsOrder;
    this.keysPressed = {};
    this.isCaps = false;
  }

  init(langCode) {
    this.keyBase = language[langCode];
    this.output = create('textarea', 'output', null, main, 
      ['placeholder', 'Start type something... '], 
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
          this.keyButtons.push(keyButton);
          rowElement.appendChild(keyButton.div);
        }
      });
    });

    document.addEventListener('keydown', this.handleEvent);
    document.addEventListener('keyup', this.handleEvent);
    document.addEventListener('mousedown', this.handleEvent);
    document.addEventListener('mouseup', this.handleEvent);
  }

  handleEvent = (e) => {
    if (e.stopPropagation) e.stopPropagation();
    const { code, type } = e;
    const keyObj = this.keyButtons.find((key) => key.code === code);
    if (!keyObj) return;
    this.output.focus();

    if (type.match(/keydown|mousedown/)) {
      if (type.match(/key/)) e.preventDefault();
     
      if (code.match(/Shift/)) this.shiftKey = true;

      keyObj.div.classList.add('active');

      // switch language
      if (code.match(/Control/)) this.ctrlKey = true;
      if (code.match(/Alt/)) this.altKey = true;

      if (code.match(/Control/) && this.altKey) this.switchLanguage(); 
      if (code.match(/Alt/) && this.ctrlKey) this.switchLanguage(); 



      if (!this.isCaps) {
        this.printToOutput(keyObj, this.shiftKey ? keyObj.shift : keyObj.small);
      } else if (this.isCaps) {
        if (this.shiftKey) {
          this.printToOutput(keyObj, keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
        } else {
          this.printToOutput(keyObj, !keyObj.sub.innerHTML ? keyObj.shift : keyObj.small);
        }
      }
      //release button
    } else if (type.match(/keyup|mouseup/)) {
      keyObj.div.classList.remove('active');

      if (code.match(/Control/)) this.ctrlKey = false;
      if (code.match(/Alt/)) this.altKey = false;
      if (code.match(/Shift/)) this.shiftKey = false;
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
    })
  }

  printToOutput(keyObj, symbol) {
    console.log(symbol);
  }
}