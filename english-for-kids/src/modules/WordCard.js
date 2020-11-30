import Card from './Card';
import create from './utils/create';

export default class WordCard extends Card {
  constructor(style, img, title, parent, categoryNumber, audioSrc) {
    super(style, img, title, parent, categoryNumber);
    this.audioSrc = audioSrc;
  }
  
  addButton() {
    this.button = create('button', null, null, this.card);
    this.buttonImg = create('img', null, null, this.button, ['src', 'assets/images/svg/flip.svg'], ['alt', 'flip'])
  }
}