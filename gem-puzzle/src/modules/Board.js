import create from './utils/create';
import Tile from './Tile';

const tileSize = 100;
const boardSize = 3;
const tilesAmount = boardSize * boardSize;
const main = create('main');
const gameBoard = create('div', 'game-board', null, main);
gameBoard.style.width = `${tileSize * boardSize}px`;
gameBoard.style.height = `${tileSize * boardSize}px`;

const numbers = [...Array(tilesAmount-1).keys()]
  .map(x => x+1)
  .sort(() => Math.random() - 0.5);

export default class Board {
  constructor() {
    this.tiles = [];
    this.emptyTile = new Tile(boardSize - 1, boardSize - 1, 0, null);
  }

  init() {
    document.body.prepend(main);
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
      })
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

    tileElem.style.left = `${this.emptyTile.posicionX * tileSize}px`;
    tileElem.style.top = `${this.emptyTile.posicionY * tileSize}px`;

    tile.posicionX = this.emptyTile.posicionX;
    tile.posicionY = this.emptyTile.posicionY;

    this.emptyTile.posicionX = tileLeft;
    this.emptyTile.posicionY = tileTop;
    const AreWeDone = this.tiles.every((elem) => {
      return elem.value === elem.posicionY * boardSize + elem.posicionX + 1;
    })
    if (AreWeDone) {
      console.log(this.tiles, AreWeDone)
    }
  }
}
