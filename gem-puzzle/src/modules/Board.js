import create from './utils/create';
import Tile from './Tile';

const tileSize = 100;
const main = create('main');
const gameBoard = create('div', 'game-board', null, main);

export default class Board {
  constructor() {
    this.tiles = [];
  }

  init() {
    document.body.prepend(main);
    return this;
  }

  generateTiles() {
    for (let i = 0; i < 15; i++) {
      const left = i % 4;
      const top = (i - left) / 4;
      const tileElem = create('div', 'tile', `${i + 1}`, gameBoard);
      tileElem.style.left = `${left * tileSize}px`;
      tileElem.style.top = `${top * tileSize}px`;
      const tile = new Tile(left, top, i + 1, tileElem);
      this.tiles.push(tile);
      gameBoard.appendChild(tileElem);
    }
    console.log(this.tiles);
  }
}
