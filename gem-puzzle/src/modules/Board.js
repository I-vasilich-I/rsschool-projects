import create from './utils/create';
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
const newGame = create('button', 'footer__button', null, footerWrapper);
const loadGame = create('button', 'footer__button', null, footerWrapper);
const saveGame = create('button', 'footer__button', null, footerWrapper);
const bestScore = create('button', 'footer__button', null, footerWrapper);
const settings = create('button', 'footer__button', null, footerWrapper);
const audio = create('audio', '', null, footerWrapper, ['src', 'shifting.wav']);
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
    newGame.innerText = 'New Game';
    loadGame.innerText = 'Load Game';
    saveGame.innerText = 'Save Game';
    bestScore.innerText = 'Best Score';
    settings.innerText = 'Settings';

    document.body.prepend(footer);
    document.body.prepend(main);
    document.body.prepend(header);
    return this;
  }

  generateTiles() {
    do {
      numbers = [...Array(tilesAmount-1).keys()]
      .map(x => x+1)
      .sort(() => Math.random() - 0.5);
    } while (!this.isGameSolveble());
    for (let i = 0; i < numbers.length; i++) {
      const left = i % boardSize;
      const top = (i - left) / boardSize;
      const tileElem = create('div', 'tile', `${numbers[i]}`, gameBoard);
      tileElem.style.left = `${left * tileSize}px`;
      tileElem.style.top = `${top * tileSize}px`;
      tileElem.style.width = `${tileSize-10}px`;
      tileElem.style.height = `${tileSize-10}px`;
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
    this.tiles.forEach(tile => {
      const left = tile.posicionX;
      const top = tile.posicionY;
      const tileElem = create('div', 'tile', `${tile.value}`, gameBoard);
      tileElem.style.left = `${left * tileSize}px`;
      tileElem.style.top = `${top * tileSize}px`;
      tileElem.style.width = `${tileSize-10}px`;
      tileElem.style.height = `${tileSize-10}px`;
      tile.elem = tileElem;
      gameBoard.appendChild(tile.elem);
      tileElem.addEventListener('click', () => {
        this.moveTile(tile);
      });
    })
  }

  activateButtons() {
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
    // New Game button
    newGame.addEventListener('click', () => {
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
    })
    // Load Game button 
    loadGame.addEventListener('click', () => {
      if (confirm('Are you sure you want to end this game and load saved game?')) {
        let temp = JSON.parse(localStorage.getItem(`SavedGame-${boardSize}`));
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
          alert('There are no saved games yet.');
        }
      }
      
    })
    // Save Game button
    saveGame.addEventListener('click', () => {
      this.pauseTime();
      let temp = JSON.parse(localStorage.getItem(`SavedGame-${boardSize}`));
        if (temp) {
          if(confirm('There is already saved game. Would you like to rewrite it?')) {
            localStorage.setItem(`SavedGame-${boardSize}`, JSON.stringify([this.tiles, this.emptyTile, this.stopWatch.getElapsedTime(), moveCounter]));
            alert(`Game ${boardSize}x${boardSize} saved`);
          }
        } else {
          localStorage.setItem(`SavedGame-${boardSize}`, JSON.stringify([this.tiles, this.emptyTile, this.stopWatch.getElapsedTime(), moveCounter]));
          alert(`Game ${boardSize}x${boardSize} saved`);
        } 
    });
    // Settings button 
    settings.addEventListener('click', () => {

    })
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
    audio.play();
    this.AreWeDone = this.isWin();
    
    this.onOffStopWatch();
  }

  winMessage() {
    setTimeout(() => {
      alert(`Hooray! You solved the puzzle in ${this.stopWatch.timeToText(this.stopWatch.getElapsedTime())} and ${moveCounter} moves`)
    }, 500);
    
  }

  isWin() {
    return this.tiles.every((elem) => {
      return elem.value === elem.posicionY * boardSize + elem.posicionX + 1;
    })
  }

  onOffStopWatch() {
    if (this.AreWeDone) {
      this.pauseTime();
      pause.disabled = true;
      this.winMessage();
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
    for (let i = 0; i<numbers.length; i++) {
      for (let j = i+1; j < numbers.length; j++) {
        if (numbers[j] < numbers[i]) {
          sum++;
        }
      }
    }
    // in the begining of the game, row of empty tile is always on the last row of the game board
    let e = boardSize; 
    sum+=e;
    if (sum % 2 != 0) {
      return false;
    }
    return true;
  }
}