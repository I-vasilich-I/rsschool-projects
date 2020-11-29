import CardsContainer from './modules/CardsContainer';

const body = document.body;
const menu__list = document.querySelector('menu__list');
const switchCheckbox = document.getElementById('switch-checkbox');
const main = document.querySelector('main');
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
    elem.cardDiv.classList.add('fliped');
  }

  elem.cardDiv.onclick = (e) => {
    if (e.target===elem.cardFront.button) return
    audio.src = elem.cardFront.audioSrc;
    audio.load();
    audio.play();
  }

  elem.cardDiv.onmouseleave = () => {
    elem.cardDiv.classList.remove('fliped');
  }
}
