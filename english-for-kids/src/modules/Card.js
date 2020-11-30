import create from './utils/create.js';

export default class Card {
  constructor(className, img, front, parent, categoryNumber) {
    this.className = className;
    this.img = img;
    this.front = front;
    this.parent = parent;
    this.categoryNumber = categoryNumber;
  }

  init() {
    this.card = create('div', this.className, null, this.parent);
    this.img = create('img', null, null, this.card, ['src', this.img[0]], ['alt', this.img[1]], ['draggable','false']);
    this.frontP = create('p', null, null, this.card);
    this.frontP.innerText = this.front;
  }

}