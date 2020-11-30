import CardsContainer from './modules/CardsContainer';

const body = document.body;
const menu__list = document.querySelector('menu__list');
const switchCheckbox = document.getElementById('switch-checkbox');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const audio = new Audio();

let container = new CardsContainer();
container.init();
main.appendChild(container.cardsContainer);

container.cardElements.forEach((elem) => {
  elem.card.addEventListener('click', () => {
    generateWordCards(elem.categoryNumber)
  });
})

function generateWordCards(categoryNumber) {
  container.cardsContainer.innerHTML = '';
  container.init(categoryNumber);
  container.cardElements.forEach((elem) => {
    elem.cardDiv.onmouseenter = eventHandler(elem);
  });
}

function eventHandler(elem) {
  elem.cardFront.button.onclick = () => {
    elem.cardDiv.classList.add('flipped');
  }

  elem.cardDiv.onclick = (e) => {
    if (e.target===elem.cardFront.button || e.target === elem.cardFront.buttonImg) return
    audio.src = elem.cardFront.audioSrc;
    audio.load();
    audio.play();
  }

  elem.cardDiv.onmouseleave = () => {
    elem.cardDiv.classList.remove('flipped');
  }
}

switchCheckbox.addEventListener('click', () => {
  if (switchCheckbox.checked === true) {
    

  } else {
    
  }
  body.classList.toggle('body-play');
  footer.classList.toggle('footer-play');
  container.cardElements.forEach((elem) => {
    elem.cardFront.card.classList.toggle('word__card-play');
    //elem.cardBack.card.classList.toggle('word__card-play');
  })
})