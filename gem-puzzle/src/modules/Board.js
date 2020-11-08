import create from './utils/create';
import StopWatch from './utils/Timer';
import Tile from './Tile';

let moveCounter = 0;
const tileSize = 100;
const boardSize = 3;
const tilesAmount = boardSize * boardSize;
const header = create('header');
const headerWrapper = create('div', 'header__wrapper', null, header);
const informContainer = create('div', 'inform-container', null, headerWrapper);
const timer = create('time', 'timer', null, informContainer);
const counter = create('div', 'counter', null, informContainer);
const pause = create('button', '', null, informContainer);
const nav = create('nav', '', null, headerWrapper);
const main = create('main');
const gameBoard = create('div', 'game-board', null, main);
const numbers = [...Array(tilesAmount-1).keys()]
  .map(x => x+1)
  //.sort(() => Math.random() - 0.5);

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
    timer.innerText = 'Time: 00:00:00';
    counter.innerText = `Moves: ${moveCounter}`;
    pause.innerText = 'Pause';
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
    pause.addEventListener('click', () => {
      if (this.isTimerOn) {
        this.elapsedTime = this.stopWatch.stop();
        this.isTimerOn = 0;
        pause.innerText = 'Resume';
        
      } else {
        this.isTimerOn++;
        if (this.isTimerOn === 1 && !this.AreWeDone) {
          this.stopWatch.start(timer);
          pause.innerText = 'Pause';
        }
      }
    });
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
    this.AreWeDone = this.tiles.every((elem) => {
      return elem.value === elem.posicionY * boardSize + elem.posicionX + 1;
    })
    if (this.AreWeDone) {
      console.log(this.tiles, this.AreWeDone)
      this.elapsedTime = this.stopWatch.stop();
      this.isTimerOn = 0;
      pause.innerText = 'Resume';
      pause.disabled = true;
    }
    if (this.isTimerOn === 1) {
      this.stopWatch.start(timer);
      pause.innerText = 'Pause';
      pause.disabled = false;
    }
  }
}