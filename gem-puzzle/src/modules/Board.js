import create from './utils/create';
import StopWatch from './utils/Timer';
import Tile from './Tile';

let moveCounter = 0;
const tileSize = 100;
const boardSize = 3;
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
let numbers = [...Array(tilesAmount-1).keys()]
  .map(x => x+1)
  //.sort(() => Math.random() - 0.5);
// main end

// footer start 
const footer = create('footer');
const footerWrapper = create('div', 'footer__wrapper', null, footer);
const NewGame = create('button', 'footer__button', null, footerWrapper);
const LoadGame = create('button', 'footer__button', null, footerWrapper);
const SaveGame = create('button', 'footer__button', null, footerWrapper);
const BestScore = create('button', 'footer__button', null, footerWrapper);
const Settings = create('button', 'footer__button', null, footerWrapper);

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

    timer.innerText = 'Time: 00:00:00';
    counter.innerText = `Moves: ${moveCounter}`;
    pause.innerText = 'Pause';
    pause.disabled = true;
    NewGame.innerText = 'New Game';
    LoadGame.innerText = 'Load Game';
    SaveGame.innerText = 'Save Game';
    BestScore.innerText = 'Best Score';
    Settings.innerText = 'Settings';

    document.body.prepend(footer);
    document.body.prepend(main);
    document.body.prepend(header);
    return this;
  }

  generateTiles() {
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

  ActivateButtons() {
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
    NewGame.addEventListener('click', () => {
      if (confirm('Are you sure you want to start a new game?')) {
        numbers = [...Array(tilesAmount-1).keys()]
        .map(x => x+1)
        .sort(() => Math.random() - 0.5);
        gameBoard.innerHTML = '';
        this.emptyTile = new Tile(boardSize - 1, boardSize - 1, 0, null);
        this.tiles.length = 0;
        this.generateTiles();
      }
    })
    // Load Game button 
    LoadGame.addEventListener('click', () => {
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
    SaveGame.addEventListener('click', () => {
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
    })
    // Settings button 
    Settings.addEventListener('click', () => {

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
}