/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
//import { rules } from 'eslint-config-prettier';
import create from './utils/create';
import sortResults from './utils/sort';
import StopWatch from './utils/Timer';
import Tile from './Tile';

let moveCounter = 0;
const tileSize = 100;
const boardSize = 4;
const tilesAmount = boardSize * boardSize;
// header start
const header = create('header');
const headerWrapper = create('div', 'header__wrapper', null, header);
const informContainer = create('div', 'inform-container', null, headerWrapper);
const timer = create('time', 'timer', null, informContainer);
const counter = create('div', 'counter', null, informContainer);
const pause = create('button', '', null, informContainer);
// header end

// main start
const main = create('main');
const gameBoard = create('div', 'game-board', null, main);
let numbers;
// main end

// footer start
const footer = create('footer');
const footerWrapper = create('div', 'footer__wrapper', null, footer);
const menu = create('button', 'footer__button', null, footerWrapper);
const checkboxdiv = create('div', 'checkbox', null, footerWrapper);
const checkbox = create('input', '', null, checkboxdiv, ['type', 'checkbox'], ['id', 'soundEffects']);
checkbox.checked = true;
create('lable', '', null, checkboxdiv).innerText = 'Sound effects'
const audio = create('audio', '', null, footerWrapper, ['src', 'shifting.wav']);
const winSound = create('audio', '', null, footerWrapper, ['src', 'Ta_Da.wav']);

// footer end
export default class Board {
  constructor() {
    this.isTimerOn = 0;
    this.elapsedTime = 0;
    this.tiles = [];
    this.emptyTile = new Tile(boardSize - 1, boardSize - 1, 0, null);
    this.stopWatch = new StopWatch(this.elapsedTime);
  }

  init() {
    gameBoard.style.width = `${tileSize * boardSize}px`;
    gameBoard.style.height = `${tileSize * boardSize}px`;
    headerWrapper.style.width = `${tileSize * boardSize + 10}px`;
    footerWrapper.style.width = `${tileSize * boardSize + 10}px`;
    timer.innerText = 'Time: 00:00';
    counter.innerText = `Moves: ${moveCounter}`;
    pause.innerText = 'Pause';
    pause.disabled = true;
    menu.innerText = 'Menu';
    document.body.prepend(footer);
    document.body.prepend(main);
    document.body.prepend(header);
    return this;
  }

  generateTiles() {
    do {
      numbers = [...Array(tilesAmount - 1).keys()]
        .map((x) => x + 1)
        .sort(() => Math.random() - 0.5);
    } while (!this.isGameSolveble());

    for (let i = 0; i < numbers.length; i++) {
      const left = i % boardSize;
      const top = (i - left) / boardSize;
      const tileElem = create('div', 'tile', `${numbers[i]}`, gameBoard);
      tileElem.style.left = `${left * tileSize}px`;
      tileElem.style.top = `${top * tileSize}px`;
      tileElem.style.width = `${tileSize - 10}px`;
      tileElem.style.height = `${tileSize - 10}px`;
      const tile = new Tile(left, top, numbers[i], tileElem);
      this.tiles.push(tile);
      gameBoard.appendChild(tile.elem);
      tileElem.addEventListener('click', () => {
        this.moveTile(tile);
      });
    }

    return this;
  }

  generateLoadedTiles() {
    this.tiles.forEach((tile) => {
      const left = tile.posicionX;
      const top = tile.posicionY;
      const tileElem = create('div', 'tile', `${tile.value}`, gameBoard);
      tileElem.style.left = `${left * tileSize}px`;
      tileElem.style.top = `${top * tileSize}px`;
      tileElem.style.width = `${tileSize - 10}px`;
      tileElem.style.height = `${tileSize - 10}px`;
      tile.elem = tileElem;
      gameBoard.appendChild(tile.elem);
      tileElem.addEventListener('click', () => {
        this.moveTile(tile);
      });
    });
  }

  activateButtons(popup = false) {
    if (!popup) {
      // Pause button
      pause.addEventListener('click', () => {
        if (this.isTimerOn) {
          this.pauseTime();
        } else {
          this.isTimerOn++;
          if (this.isTimerOn === 1 && !this.AreWeDone) {
            this.resumeTime();
          }
        }
      });
      // menu button
      menu.addEventListener('click', () => {
        this.generatePopup();
      });
    } else {
      // New Game button
      this.newGame.addEventListener('click', () => {
        if (confirm('Are you sure you want to start a new game?')) {
          this.stopWatch.stop();
          pause.disabled = true;
          this.isTimerOn = 0;
          this.elapsedTime = 0;
          moveCounter = 0;
          timer.innerText = 'Time: 00:00';
          counter.innerText = `Moves: ${moveCounter}`;
          this.stopWatch = new StopWatch(this.elapsedTime);
          gameBoard.innerHTML = '';
          this.emptyTile = new Tile(boardSize - 1, boardSize - 1, 0, null);
          this.tiles.length = 0;
          this.generateTiles();
        }
        document.body.removeChild(this.popup);
      });
      // Load Game button
      this.loadGame.addEventListener('click', () => {
        if (confirm('Are you sure you want to end this game and load saved game?')) {
          const temp = JSON.parse(localStorage.getItem(`SavedGame-${boardSize}`));
          if (temp) {
            this.pauseTime();
            let elapsedTime;
            [this.tiles, this.emptyTile, elapsedTime, moveCounter] = temp;
            gameBoard.innerHTML = '';
            this.generateLoadedTiles();
            this.stopWatch = new StopWatch(elapsedTime);
            this.stopWatch.setElapsedTime(timer, elapsedTime);
            counter.innerText = `Moves: ${moveCounter}`;
          } else {
            alert(`There are no saved ${boardSize}x${boardSize} games yet.`);
          }
        }
        document.body.removeChild(this.popup);
      });
      // Save Game button
      this.saveGame.addEventListener('click', () => {
        this.pauseTime();
        const temp = JSON.parse(localStorage.getItem(`SavedGame-${boardSize}`));
        if (temp) {
          if (confirm('There is already saved game. Would you like to rewrite it?')) {
            localStorage.setItem(
              `SavedGame-${boardSize}`,
              JSON.stringify([
                this.tiles,
                this.emptyTile,
                this.stopWatch.getElapsedTime(),
                moveCounter,
              ])
            );
            alert(`Game ${boardSize}x${boardSize} saved`);
          }
        } else {
          localStorage.setItem(
            `SavedGame-${boardSize}`,
            JSON.stringify([this.tiles, this.emptyTile, this.stopWatch.getElapsedTime(), moveCounter])
          );
          alert(`Game ${boardSize}x${boardSize} saved`);
        }
        document.body.removeChild(this.popup);
      });
    }
    
    
    
  }

  moveTile(tile) {
    const tileElem = tile.elem;
    const tileLeft = tile.posicionX;
    const tileTop = tile.posicionY;
    const difLeft = Math.abs(tileLeft - this.emptyTile.posicionX);
    const difTop = Math.abs(tileTop - this.emptyTile.posicionY);
    if (difLeft + difTop > 1) {
      return;
    }
    this.isTimerOn++;
    moveCounter++;
    counter.innerText = `Moves: ${moveCounter}`;
    tileElem.style.left = `${this.emptyTile.posicionX * tileSize}px`;
    tileElem.style.top = `${this.emptyTile.posicionY * tileSize}px`;
    tile.posicionX = this.emptyTile.posicionX;
    tile.posicionY = this.emptyTile.posicionY;
    this.emptyTile.posicionX = tileLeft;
    this.emptyTile.posicionY = tileTop;
    audio.currentTime = 0;
    if (checkbox.checked) audio.play();
    this.AreWeDone = this.isWin();
    this.onOffStopWatch();
  }

  winMessage() {
    if (checkbox.checked) winSound.play();
    setTimeout(() => {
      alert(
        `Hooray! You solved the puzzle in ${this.stopWatch.timeToText(
          this.stopWatch.getElapsedTime()
        )} and ${moveCounter} moves`
      );
    }, 500);
  }

  isWin() {
    return this.tiles.every((elem) => {
      return elem.value === elem.posicionY * boardSize + elem.posicionX + 1;
    });
  }

  onOffStopWatch() {
    if (this.AreWeDone) {
      this.pauseTime();
      pause.disabled = true;
      this.winMessage();
      this.saveBestScore();
    }
    if (this.isTimerOn === 1) {
      this.resumeTime();
    }
  }

  pauseTime() {
    this.stopWatch.stop();
    this.isTimerOn = 0;
    pause.innerText = 'Resume';
  }

  resumeTime() {
    this.stopWatch.start(timer);
    pause.innerText = 'Pause';
    pause.disabled = false;
  }

  isGameSolveble() {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[j] < numbers[i]) {
          sum++;
        }
      }
    }
    // in the begining of the game, row of empty tile is always on the last row of the game board
    const e = boardSize;
    if (e % 2) e = 0;
    sum += e;
    if (sum % 2 !== 0) {
      return false;
    }
    return true;
  }

  generatePopup() {
    this.popup = create('div', 'popup blackout', null);
    this.popup.addEventListener('click', (e) => {
      console.log(e)
    });
    const popupContainer = create('div', 'popup__container', null, this.popup);
    this.newGame = create('button', 'footer__button', null, popupContainer);
    this.newGame.innerText = 'New Game';
    this.loadGame = create('button', 'footer__button', null, popupContainer);
    this.loadGame.innerText = 'Load Game';
    this.saveGame = create('button', 'footer__button', null, popupContainer);
    this.saveGame.innerText = 'Save Game';
    this.select = create('select', '', null, popupContainer);
    create('option', '', null, this.select, ['value', ""]).innerText = 'Size';
    for (let i=3; i< 9; i++) {
      create('option', '', null, this.select, ['value', `size-${i}`]).innerText = `${i}x${i}`;
    } 
    create('p', 'score__title', null, popupContainer).innerText = 'Best score';
    const popupScore = create('div', 'popup__score', null, popupContainer);
    const score = JSON.parse(localStorage.getItem(`score-${boardSize}`));
    let resultsAmount = 0;
    score.forEach((elem) => {
      if (resultsAmount == 10) return
      const { date, time, moves } = elem; 
      create('div', '', null, popupScore).innerText = date;
      create('div', '', null, popupScore).innerText = `${boardSize}x${boardSize}`;
      create('div', '', null, popupScore).innerText = this.stopWatch.timeToText(time);
      create('div', '', null, popupScore).innerText = moves;
      resultsAmount++;
    });
    document.body.prepend(this.popup);
    this.activateButtons(true);
  }

  saveBestScore() {
    const result = {
      date: new Intl.DateTimeFormat('en-US').format(new Date()),
      time: this.stopWatch.getElapsedTime(),
      moves: moveCounter,
    };
    let scoreResalts = [];
    scoreResalts = JSON.parse(localStorage.getItem(`score-${boardSize}`));
    if (scoreResalts) {
      scoreResalts.push(result);
    } else {
      scoreResalts = [];
      scoreResalts.push(result);
    }
    scoreResalts = sortResults(scoreResalts);
    localStorage.setItem(`score-${boardSize}`, JSON.stringify(scoreResalts));
  }
}

