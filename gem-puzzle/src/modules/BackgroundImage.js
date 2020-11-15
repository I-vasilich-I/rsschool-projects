let img;


export default class BackgroundImage {
  constructor(boardSize, that, tileSize) {
    this.that = that;
    this.tileSize = tileSize;
    this.boardSize = boardSize;
    this.tilesAmount = boardSize*boardSize-1;
  } 
 
  init() {
    img = new Image();
    img.src = `./box/${Math.floor(Math.random() * Math.floor(150))}.jpg`;
    img.onload = () => {this.splitImg()};
    return this;
  }

  splitImg() {
    console.log('hi')
    img.width = this.tileSize * (this.boardSize);
    img.height = img.width;
    let w = img.width / this.boardSize;
    let h = img.height / this.boardSize;
    let x = 0, y = 0;
    for (let i = 0; i < this.tilesAmount; i++) {
      this.that.tiles.forEach((tile) => {
        if(tile.value == i+1) {
          x = (i % (this.boardSize));
          y = ((i - x)/ this.boardSize);
          tile.elem.style.backgroundImage = `url(${img.src})`;
          tile.elem.style.backgroundPosition = `-${x*w}px -${y*h}px`;
          tile.elem.style.backgroundSize = `${img.height}px`;
        }
      });
    }
  }
}