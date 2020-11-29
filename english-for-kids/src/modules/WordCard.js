import Card from './Card';
import create from './utils/create';

export default class WordCard extends Card {
  constructor(style, img, title, parent, categoryNumber, audioSrc) {
    super(style, img, title, parent, categoryNumber);
    //this.back = back;
    this.audioSrc = audioSrc;
  }

  init() {
    super.init();
    
    //this.button.innerText = 'Rotate'
    //this.backP = create('p', null, null, this.card);
    //this.backP.innerText = this.back;
  }

  addButton() {
    this.button = create('button', null, null, this.card);
  }

}