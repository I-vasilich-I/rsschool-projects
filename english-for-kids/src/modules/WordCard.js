import Card from './Card';
import * as helpers from './utils/helpers';

export default class WordCard extends Card {
  constructor(style, img, title, parent, categoryNumber, audioSrc) {
    super(style, img, title, parent, categoryNumber);
    this.audioSrc = audioSrc;
  }

  addButton() {
    this.button = helpers.create('button', null, null, this.card);
    this.buttonImg = helpers.create(
      'img',
      null,
      null,
      this.button,
      ['src', 'assets/images/svg/flip.svg'],
      ['alt', 'flip']
    );
  }
}
