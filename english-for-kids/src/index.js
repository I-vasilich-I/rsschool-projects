import CardsContainer from './modules/CardsContainer';
import cards from './cards';
import * as helpers from './modules/utils/helpers';

let menuListArray;
let randomIntArray;
let errors = 0;
//let statistic = [];
const body = document.body;
const burger = document.getElementById('burger');
const burgerLine = document.querySelector('.burger__line');
const menuList = document.querySelector('.menu__list');
const switchCheckbox = document.getElementById('switch-checkbox');
const main = document.querySelector('main');
const scoreDiv = helpers.create('div', 'main__score', null, main);
const footer = document.querySelector('footer');
const container = new CardsContainer();
container.init();
main.appendChild(container.cardsContainer);
const playButton = helpers.create('button', 'play__button', null, main);
playButton.clicked = false;
playButton.img = helpers.create('img', null, null, playButton, ['src', 'assets/images/svg/play.svg'], ['alt', 'play']);

container.cardCategories.forEach((elem) => {
  elem.card.addEventListener('click', () => {
    generateWordCards(elem.categoryNumber)
  });
})

// Switch mode
switchCheckbox.addEventListener('click', () => {
  if (switchCheckbox.checked === true) {
    
  } else {
    
  }
  body.classList.toggle('body-play');
  footer.classList.toggle('footer-play');
  burger.classList.toggle('burger-play');
  burgerLine.classList.toggle('burger__line-play');
  togglePlayButton();
  if (!container.mainPage) {
    helpers.toggleScorePanel(scoreDiv, -1);
  }
  container.cardElements.forEach((elem) => {
    elem.cardFront.card.classList.toggle('word__card-play');
  });
  container.cardCategories.forEach((elem) => {
    elem.card.classList.toggle('category__card-play');
  });
})

// Menu
burger.addEventListener('click', toggleMenu);

// Activate links
menuListArray = generateMenuList();
menuListArray.forEach((elem) => {
  elem.domElement.addEventListener('click', () => {
    if(!elem.main) {
      generateWordCards(elem.categoryNumber);
    } else {
      helpers.toggleScorePanel(scoreDiv, false);
      container.mainPage = true;
      togglePlayButton();
      container.cardsContainer.innerHTML = '';
      container.cardCategories.forEach((elem) => {
        container.cardsContainer.appendChild(elem.card);
      })
    }
    toggleMenu();
    if (!switchCheckbox.checked && !elem.main) {
      helpers.toggleScorePanel(scoreDiv, true);
    }
    
  })
});

// Play button
playButton.addEventListener('click', () => {
  if(!playButton.clicked) {
    playButton.img.src = 'assets/images/svg/replay.svg';
    playButton.clicked = true;
    randomIntArray = helpers.getRandomIntArray(container.cardElements.length);
    helpers.nextWord(container, randomIntArray, main, playButton);
  } else {
    if (helpers.wordToPlayIndex || helpers.wordToPlayIndex === 0) {
      helpers.playAudio(container.cardElements[helpers.wordToPlayIndex].cardFront.audioSrc);
    }
  }
})

function generateWordCards(categoryNumber) {
  container.mainPage = false;
  togglePlayButton();
  if (!switchCheckbox.checked) {
    helpers.toggleScorePanel(scoreDiv, -1);
  }
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
    if (e.target===elem.cardFront.button 
        || e.target === elem.cardFront.buttonImg 
        || elem.cardDiv.classList.contains('flipped')) return;
    if (elem.disabled) return;
    if (switchCheckbox.checked) {
      helpers.playAudio(elem.cardFront.audioSrc);
    } else {
      if (!playButton.clicked) return; 
      if (container.cardElements.indexOf(elem) === helpers.wordToPlayIndex) {
        elem.cardFront.card.classList.add('disabled');
        elem.disabled = true;
        helpers.playAudio('./assets/audio/correct2.mp3');
        //elem.correct = elem.correct + 1 || 1;
        helpers.addStar(true, scoreDiv);
        helpers.nextWord(container, randomIntArray, main, playButton);
      } else {
        helpers.addStar(false, scoreDiv);
        helpers.playAudio('./assets/audio/error2.mp3');
        container.errors = container.errors + 1 || 1;
        //elem.wrong = elem.wrong + 1 || 1;
      }
    }
  }

  elem.cardDiv.onmouseleave = () => {
    elem.cardDiv.classList.remove('flipped');
  }
}

function generateMenuList() {
  const mainPage = {
    domElement: helpers.create('a', 'menu__item', null, menuList, ['href', '#/']),
    main: true,
  }
  mainPage.domElement.innerText = 'Main Page';
  let menuListArray = [mainPage];
  for(let i = 0; i < cards[0].length; i++) {
    const category = {
      domElement: helpers.create('a', 'menu__item', null, menuList, ['href', '#/category']),
      main: false,
      categoryNumber: i,
    };
    category.domElement.innerText = cards[0][i];
    menuListArray.push(category);
  }
  return menuListArray;
}

function toggleMenu() {
  let blackout = document.querySelector('.blackout');
  if (blackout) {
    body.removeChild(blackout);
    body.classList.toggle('stop-scrolling');
  } else {
    blackout = helpers.create('div', 'blackout');
    body.prepend(blackout);
    body.classList.toggle('stop-scrolling');
    blackout.addEventListener('click', () => {
      toggleMenu();
    })
  }
  if (switchCheckbox.checked) {
    menuList.classList.remove('menu__list-play');
  } else {
    burger.classList.toggle('burger-play');
    burgerLine.classList.toggle('burger__line-play');
    menuList.classList.add('menu__list-play');
  }
  burger.classList.toggle('burger-menu');
  burgerLine.classList.toggle('burger__line-menu');
  menuList.classList.toggle('menu__list-menu');
 
}

function togglePlayButton() {
  if (!container.mainPage && !switchCheckbox.checked) {
    playButton.classList.add('play__button-play');
    playButton.img.src = 'assets/images/svg/play.svg';
    playButton.clicked = false;
  } else {
    playButton.classList.remove('play__button-play');
  }
}