import cards from '../cards';
import Card from './Card';
import WordCard from './WordCard';
import create from './utils/create';

export default class CardsContainer {
  constructor() {
    this.cardElements = [];
    this.cardsContainer = create('div', 'cards__container');
  }

  init(category = null) {
    if (category === null) {
      this.generateCategoryCards();
    } else {
      this.generateCards(category);
    }
  }

  generateCategoryCards() {
    for (let i = 0; i < cards[0].length; i++) {
      let card = 
        new Card('category__card', 
        [cards[i + 1][0].image, cards[0][i]], 
        cards[0][i], 
        this.cardsContainer, i);
      card.init();
      this.cardElements.push(card);
    }
  }

  generateCards(category) {
    this.cardElements.length = 0;
    cards[category+1].forEach((elem) => {
      const cardDiv = create('div', 'card', null, this.cardsContainer);
      const cardFront =  
        new WordCard('word__card word__card-front', 
        [elem.image, elem.word], 
        elem.word, 
        cardDiv, 
        category, 
        elem.audioSrc);
      cardFront.init();
      cardFront.addButton();
      //this.cardElements.push(cardDiv);
      
      const cardBack = 
        new WordCard('word__card word__card-back', 
        [elem.image, elem.translation], 
        elem.translation, 
        cardDiv, 
        category, 
        elem.audioSrc);
      cardBack.init();
      this.cardElements.push({cardDiv, cardFront, cardBack});
    });
  }
}